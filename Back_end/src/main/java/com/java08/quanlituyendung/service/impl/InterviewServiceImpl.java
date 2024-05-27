package com.java08.quanlituyendung.service.impl;

import com.google.api.services.calendar.model.Event;
import com.java08.quanlituyendung.auth.UserAccountRetriever;
import com.java08.quanlituyendung.calendar.CalendarGoogleService;
import com.java08.quanlituyendung.converter.InterviewConverter;
import com.java08.quanlituyendung.converter.UserAccountConverter;
import com.java08.quanlituyendung.dto.CalendarAddRequestDTO;
import com.java08.quanlituyendung.dto.InterviewCreateDTO;
import com.java08.quanlituyendung.dto.InterviewPayload.*;
import com.java08.quanlituyendung.dto.InterviewerDTO.CreateAccountInterviewerDTO;
import com.java08.quanlituyendung.dto.InterviewerDTO.ResponseCreateAcountInterviewDTO;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.dto.ResponseObjectT;
import com.java08.quanlituyendung.entity.*;
import com.java08.quanlituyendung.helper.InterviewHelper;
import com.java08.quanlituyendung.repository.*;
import com.java08.quanlituyendung.service.IInterviewService;
import com.java08.quanlituyendung.utils.Constant;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InterviewServiceImpl implements IInterviewService {
    private InterviewRepository interviewRepository;
    private InterviewConverter interviewConverter;
    private UserAccountRepository userAccountRepository;
    private JobPostingRepository jobPostingRepository;
    private InterviewHelper interviewHelper;
    private InterviewDetailRepository interviewDetailRepository;
    private CalendarGoogleService calendarGoogleService;
    private UserAccountRetriever userAccountRetriever;

    private PasswordEncoder passwordEncoder;
    private UserAccountConverter userAccountConverter;

    private UserInfoRepository userInfoRepository;

    @Autowired
    public InterviewServiceImpl(InterviewRepository interviewRepository,
                                InterviewConverter interviewConverter,
                                UserAccountRepository userAccountRepository,
                                JobPostingRepository jobPostingRepository,
                                InterviewHelper interviewHelper,
                                InterviewDetailRepository interviewDetailRepository,
                                CalendarGoogleService calendarGoogleService,
                                UserAccountRetriever userAccountRetriever,
                                UserAccountConverter userAccountConverter,
                                PasswordEncoder passwordEncoder,
                                UserInfoRepository userInfoRepository) {
        this.interviewRepository = interviewRepository;
        this.interviewConverter = interviewConverter;
        this.userAccountRepository = userAccountRepository;
        this.jobPostingRepository = jobPostingRepository;
        this.interviewHelper = interviewHelper;
        this.interviewDetailRepository = interviewDetailRepository;
        this.calendarGoogleService = calendarGoogleService;
        this.userAccountRetriever = userAccountRetriever;
        this.userAccountConverter = userAccountConverter;
        this.passwordEncoder = passwordEncoder;
        this.userInfoRepository = userInfoRepository;
    }

    @Override
    public ResponseEntity<ResponseObjectT<List<RoomResponseDTO>>> getAllT(Authentication authentication) {
        UserAccountEntity userAccountEntity = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        if (userAccountEntity.getRole().equals(Role.ADMIN)) {
            List<RoomResponseDTO> data = interviewRepository.findAll()
                    .stream()
                    .map(interviewConverter::toDto)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(
                    new ResponseObjectT<>(HttpStatus.OK.toString(), Constant.SUCCESS, data)
            );
        }
        if (userAccountEntity.getRole().equals(Role.RECRUITER)) {
            List<RoomResponseDTO> data = interviewRepository.findAll()
                    .stream()
                    .filter(interview -> interview.getUserAccountEntity().getId().equals(userAccountEntity.getId()))
                    .map(interviewConverter::toDto)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(
                    new ResponseObjectT<>(HttpStatus.OK.toString(), Constant.SUCCESS, data)
            );
        }
        if (userAccountEntity.getRole().equals(Role.INTERVIEWER)) {
            List<RoomResponseDTO> data = interviewRepository.findAll()
                    .stream()
                    .filter(interview -> interview.getInterviewers().contains(userAccountEntity))
                    .map(interviewConverter::toDto)
                    .collect(Collectors.toList());
            return ResponseEntity.ok(
                    new ResponseObjectT<>(HttpStatus.OK.toString(), Constant.SUCCESS, data)
            );
        }
        return ResponseEntity.ok(
                new ResponseObjectT<>(HttpStatus.FORBIDDEN.toString(), Constant.YOU_DONT_HAVE_PERMISION, null));
    }


    @Override
    public ResponseEntity<ResponseObjectT<RoomResponseDTO>> getById(Long interviewId) {
        var data = interviewRepository.findById(interviewId);
        if (data.isPresent()) {
            return ResponseEntity.ok(
                    new ResponseObjectT<>(HttpStatus.OK.toString(), Constant.SUCCESS, interviewConverter.toDto(data.get()))
            );
        }
        return ResponseEntity.ok(
                new ResponseObjectT<>(HttpStatus.FORBIDDEN.toString(), Constant.YOU_DONT_HAVE_PERMISION, null));
    }

    @Override
    public ResponseEntity<ResponseObject> getMyInterviewer(Authentication authentication) {
        var me = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        var list = userAccountRepository.findAll().stream()
                .filter(userAccountEntity -> {
                    if (userAccountEntity.getRole().equals(Role.INTERVIEWER) && userAccountEntity.getReccerId()==me.getId()) {
                        return true;
                    }
                    return false;
                })
                .map(userAccountConverter::AccountToCustomeResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.OK.toString())
                .data(list)
                .message(Constant.SUCCESS).build());
    }


    // tao tai khoan interview
    @Override
    public ResponseEntity<ResponseObject> createInterviewer(CreateAccountInterviewerDTO request, Authentication authentication) {
        UserAccountEntity userAccountEntity = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);

        if (userAccountRepository.existsByEmail(request.getEmail())) {
            return ResponseEntity.ok(ResponseObject.builder().status("BAD_REQUEST").message("email is exist").build());
        }


        UserAccountEntity interviewer = UserAccountEntity.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .reccerId(userAccountEntity.getId())
                .role(Role.INTERVIEWER)
                .state(UserAccountEntity.State.ACTIVE)
                .authenticationProvider(AuthenticationProvider.LOCAL)
                .creationTime(new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime())
                .status(Status.INPROCESS)
                .build();
        userAccountRepository.save(interviewer);
        UserInfoEntity userInfo = UserInfoEntity.builder().userAccountInfo(interviewer).build();
        userInfoRepository.save(userInfo);
        return ResponseEntity.ok(ResponseObject
                .builder()
                .status("OK")
                .data(ResponseCreateAcountInterviewDTO.builder()
                        .email(request.getEmail())
                        .password(request.getPassword())
                        .reccer(userAccountEntity.getUsername())
                        .build())
                .message("Success")
                .build());
    }


    @Override
    public ResponseEntity<ResponseObjectT<List<RoomResponseDTO>>> getByJobPostId(Long jobPostId, Authentication authentication) {
        UserAccountEntity userAccountEntity = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        Role role = userAccountEntity.getRole();
        List<RoomResponseDTO> data;
        if (role == Role.ADMIN || role == Role.RECRUITER) {
            data = interviewRepository.findByJobPostingEntityId(jobPostId)
                    .stream()
                    .map(interviewConverter::toDto)
                    .collect(Collectors.toList());
        } else {
            data = interviewRepository.findByJobPostingEntityId(jobPostId)
                    .stream()
                    .filter(interview -> interview.getInterviewers().contains(userAccountEntity))
                    .map(interviewConverter::toDto)
                    .collect(Collectors.toList());
        }
        return ResponseEntity.ok(
                new ResponseObjectT<>(HttpStatus.OK.toString(), Constant.SUCCESS, data));
    }

    @Override
    public ResponseEntity<ResponseObject> getAllInterviewer() {
        var list = userAccountRepository.findAll().stream()
                .filter(userAccountEntity -> userAccountEntity
                        .getRole().equals(Role.INTERVIEWER))
                .map(userAccountConverter::AccountToCustomeResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.OK.toString())
                .data(list)
                .message(Constant.SUCCESS).build());
    }

    @Override
    public ResponseEntity<ResponseObject> getAllCandidateByJd(Long jobPostId) {
        Optional<JobPostingEntity> jd = jobPostingRepository.findById(jobPostId);
        if (jd.isPresent()) {
            var listCV = jd.get().getCvEntities();
            List<CandidateItemDTO> listCandidate = listCV.stream()
                    .map(c -> interviewConverter.UserAccountToCandidateItem(c.getUserAccountEntity(), jobPostId, c))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.OK.toString())
                    .data(listCandidate)
                    .message("Success!")
                    .build());
        } else {
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.NOT_ACCEPTABLE.toString())
                    .message("Cannot find JobPostId!")
                    .build());
        }
    }


    /// tao interview|| tao room
    @Override
    public ResponseEntity<ResponseObject> addInterview(InterviewCreateDTO interview, Authentication authentication) {
        Optional<JobPostingEntity> jobPostingEntity = jobPostingRepository.findById(Long.parseLong(interview.getJobPostId()));
        if (jobPostingEntity.isPresent()) {
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.OK.toString())
                    .message(Constant.SUCCESS)
                    .data(interviewConverter
                            .toDto(interviewRepository
                                    .save(interviewConverter
                                            .toEntity(interview, authentication, jobPostingEntity.get()))))
                    .build());
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.NOT_FOUND.toString())
                .message(Constant.CAN_NOT_FIND_THIS_JOB)
                .build());
    }


    // them 1 nguoi phong van
    @Override
    public ResponseEntity<ResponseObject> addOneInterviewer(InterviewerToInterviewDTO request) {
        Optional<UserAccountEntity> interviewerOpt = userAccountRepository.findByEmail(request.getInterviewerEmail());
        Optional<InterviewEntity> roomOpt = interviewRepository.findById(Long.parseLong(request.getRoomId()));
        if (interviewerOpt.isEmpty() || roomOpt.isEmpty()) {
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.OK.toString())
                    .message("Can't find INTERVIEWER or ROOM")
                    .build());
        }
        UserAccountEntity interviewer = interviewerOpt.get();
        InterviewEntity room = roomOpt.get();

        if (interviewer.getRole() != Role.INTERVIEWER || room.getInterviewers().contains(interviewer)) {
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.NOT_ACCEPTABLE.toString())
                    .message("This is not an interviewer or this interviewer is added")
                    .data(interviewConverter.toDto(room))
                    .build());
        }
        room.getInterviewers().add(interviewer);
        interviewRepository.save(room);
        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.OK.toString())
                .message("Add success!")
                .data(interviewConverter.toDto(room))
                .build());
    }

    // đăng kí candidate voi room phong van
    @Override
    public ResponseEntity<ResponseObject> assignCandidateToInterview(AssignCandidateToInterviewDTO interviewDetailDTO) {
        Optional<UserAccountEntity> candidate = userAccountRepository.findById(interviewDetailDTO.getCandidateId());
        Optional<InterviewEntity> interview = interviewRepository.findById(interviewDetailDTO.getInterviewId());
        if (candidate.isPresent() && interview.isPresent()) {
            if (interviewHelper.isCandidateJoinJobRooms(candidate.get(), interview.get())) {
                return ResponseEntity.ok(ResponseObject.builder()
                        .status(HttpStatus.NOT_IMPLEMENTED.toString())
                        .message("Ứng viên đã tồn tại trong phòng ")
                        .build());
            } else {
                interviewDetailRepository.save(interviewHelper
                        .buildFirstTimeInterviewDetail(candidate.get(),
                                interview.get(),
                                interviewDetailDTO
                        ));
                return ResponseEntity.ok(ResponseObject.builder()
                        .status(HttpStatus.OK.toString())
                        .message("Đăng kí thành công")
                        .data(interviewConverter.toDto(interview.get()))
                        .build());
            }
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.NOT_FOUND.toString())
                .message("Không thể tìm thấy ứng viên hoặc phòng")
                .build());
    }

    @Override
    public ResponseEntity<ResponseObject> sendCalendarInvitation(SendInvitationDTO request) throws GeneralSecurityException, IOException {
        Optional<InterviewEntity> interview = interviewRepository.findById(request.getRoomId());
        if (interview.isEmpty()) {
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.NOT_IMPLEMENTED.toString())
                    .message("NOT SUCCESS")
                    .build());
        } else {
            var interview1 = interview.get();
            List<String> attendees = interviewHelper.getEmailAttendeeByRoom(request.getRoomId());
            CalendarAddRequestDTO req = CalendarAddRequestDTO.builder()
                    .summary(interview.get().getRoomName())
                    .description(interview.get().getDescription())
                    .startTime(request.getStartTime())
                    .endTime(request.getEndTime())
                    .attendees(attendees)
                    .token(request.getToken())
                    .build();
            Event event = calendarGoogleService.createEvent(req);
            interview1.setLinkmeet(event.getHangoutLink());
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.OK.toString())
                    .message("SUCCESS")
                    .data(interviewConverter.toDto(interviewRepository.save(interview1))).build());
        }
    }

    @Override
    public ResponseEntity<ResponseObject> updateInterview(UpdateInterviewPayload request) {
        Optional<InterviewEntity> interview = interviewRepository.findById(request.getRoomId());
        if (interview.isEmpty()) {
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.NOT_FOUND.toString())
                    .message("CAN'T FIND THIS ROOM").build());
        }
        var interview1 = interview.get();
        if (request.getRoomName() != null) {
            interview1.setRoomName(request.getRoomName());
        }
        if (request.getSkill() != null) {
            interview1.setSkill(request.getSkill());
        }
        if (request.getDescription() != null) {
            interview1.setDescription(request.getDescription());
        }
        if (request.getStartDate() != null) {
            interview1.setStartDate(request.getStartDate());
        }
        if (request.getEndDate() != null) {
            interview1.setEndDate(request.getEndDate());
        }
        if (request.getStatus() != null) {
            interview1.setStatus(request.getStatus());
        }
        if (request.getLinkMeet() != null) {
            interview1.setLinkmeet(request.getLinkMeet());
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.OK.toString())
                .message("SUCCESS!!")
                .data(interviewConverter.toDto(interviewRepository.save(interview1)))
                .build());
    }

    @Override
    public ResponseEntity<ResponseObject> deleteInterview(Long roomId) {
        Optional<InterviewEntity> interview = interviewRepository.findById(roomId);
        if (interview.isEmpty()) {
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.NOT_FOUND.toString())
                    .message(Constant.CAN_NOT_FIND_THIS_ROOM).build());
        }
        var interview1 = interview.get();
        interview1.setStatus("Disable");
        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.OK.toString())
                .message("SUCCESS!!")
                .data(interviewConverter.toDto(interviewRepository.save(interview1)))
                .build());
    }


}

