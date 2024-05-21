package com.java08.quanlituyendung.service.impl;

import com.java08.quanlituyendung.auth.AuthenticationService;
import com.java08.quanlituyendung.converter.*;
import com.java08.quanlituyendung.dto.*;
import com.java08.quanlituyendung.entity.*;
import com.java08.quanlituyendung.jwt.JwtService;
import com.java08.quanlituyendung.repository.*;
import com.java08.quanlituyendung.service.IUserService;
import com.java08.quanlituyendung.utils.Constant;

import lombok.RequiredArgsConstructor;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements IUserService {
    private final PasswordEncoder passwordEncoder;
    @Autowired
    UserAccountRepository userAccountRepository;
    @Autowired
    UserInfoRepository userInfoRepository;
    @Autowired
    UserAccountConverter userAccountConverter;
    @Autowired
    AuthenticationService authenticationService;
    @Autowired
    JwtService jwtService;
    @Autowired
    CvRepository cvRepository;
    @Autowired
    JobPostingConverter jobPostingConverter;
    @Autowired
    UserInfoConverter userInfoConverter;
    @Autowired
    CVTemporaryRepository cvTemporaryRepository;
    @Autowired
    CVTemporaryConverter cvTemporaryConverter;
    @Autowired
    BlackListRepository blackListRepository;
    @Autowired
    InterviewDetailRepository interviewDetailRepository;
    @Autowired
    InterviewRepository interviewRepository;
    @Autowired
    InterviewDetailConverter interviewDetailConverter;

    @Override
    public ResponseEntity<ResponseObject> updateProfile(ProfileUpdateRequestDTO request,
                                                        Authentication authentication) {
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails userDetails) {
            String userEmail = userDetails.getUsername();
            Optional<UserAccountEntity> userAccount = userAccountRepository.findByEmail(userEmail);

            if (userAccount.isPresent()) {
                var userAccount1 = userAccount.get();
                UserInfoEntity userInfo = userAccountConverter.toEntity(request, userAccount1);
                userInfoRepository.save(userInfo);
                return ResponseEntity.status(HttpStatus.OK).body(
                        ResponseObject.builder()
                                .status(HttpStatus.OK.toString())
                                .message((String) Constant.UPDATE_PROFILE_SUCCESS)
                                .data(userAccountConverter.toDto(userInfo))
                                .build());
            } else
                return ResponseEntity.status(HttpStatus.OK).body(
                        ResponseObject.builder()
                                .status(HttpStatus.NOT_FOUND.toString())
                                .message(Constant.ACCOUNT_NOT_FOUND)
                                .data("").build());
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                ResponseObject.builder()
                        .status(HttpStatus.FORBIDDEN.toString())
                        .message("Xác thực thất bại")
                        .data("").build());
    }

    @Override
    public ResponseEntity<ResponseObject> changePassword(ChangePasswordDTO request, Authentication authentication) {
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.UNAUTHORIZED.toString())
                            .message("Wrong confirm password!")
                            .build());
        } else {
            if (authentication != null
                    && authentication.getPrincipal() instanceof UserDetails userDetails) {
                String userEmail = userDetails.getUsername();
                Optional<UserAccountEntity> userOptional = userAccountRepository.findByEmail(userEmail);
                if (userOptional.isPresent()) {
                    UserAccountEntity user = userOptional.get();
                    if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
                        userAccountRepository.save(user);
                        return ResponseEntity.status(HttpStatus.OK).body(
                                ResponseObject.builder()
                                        .status(HttpStatus.OK.toString())
                                        .message("Update password successfully!")
                                        .build());
                    } else {
                        return ResponseEntity.status(HttpStatus.OK).body(
                                ResponseObject.builder()
                                        .status(HttpStatus.UNAUTHORIZED
                                                .toString())
                                        .message("Wrong Password!")
                                        .build());
                    }
                }
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.UNAUTHORIZED.toString())
                            .message("False authentication!")
                            .build());
        }
    }

    @Override
    public ResponseEntity<ResponseObject> createTemporaryCV(CVTemporaryRequestDTO request,
                                                            Authentication authentication) throws ParseException {

        if (authentication != null && authentication.getPrincipal() instanceof UserDetails userDetails) {
            String userEmail = userDetails.getUsername();
            Optional<UserAccountEntity> userAccount = userAccountRepository.findByEmail(userEmail);
            if (userAccount.isPresent()) {
                var userAccount1 = userAccount.get();
                Optional<CVTemporaryEntity> cvTemporaryEntity = cvTemporaryRepository
                        .findByUserAccount(userAccount1);
                if (cvTemporaryEntity.isPresent()) {
                    cvTemporaryEntity.get().setCv(request.getCv().toString());
                    cvTemporaryRepository.save(cvTemporaryEntity.get());
                    CVTemporaryResponseDTO response = cvTemporaryConverter
                            .toDto(cvTemporaryEntity.get());
                    return ResponseEntity.status(HttpStatus.OK).body(
                            ResponseObject.builder()
                                    .status(HttpStatus.OK.toString())
                                    .message("Success update temporary CV")
                                    .data(response)
                                    .build());
                } else {
                    CVTemporaryEntity newTempCV = new CVTemporaryEntity();
                    newTempCV.setCv(request.getCv().toString());
                    newTempCV.setUserAccount(userAccount1);
                    cvTemporaryRepository.save(newTempCV);
                    CVTemporaryResponseDTO response = cvTemporaryConverter.toDto(newTempCV);
                    return ResponseEntity.status(HttpStatus.OK).body(
                            ResponseObject.builder()
                                    .status(HttpStatus.OK.toString())
                                    .message("Success create temporary CV")
                                    .data(response)
                                    .build());
                }

            }

            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.NOT_FOUND.toString())
                            .message("Không tồn tại user")
                            .data("").build());

        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                ResponseObject.builder()
                        .status(HttpStatus.UNAUTHORIZED.toString())
                        .message("Fail authenthicate.")
                        .data("").build());
    }

    @Override
    public ResponseEntity<ResponseObject> getTemporaryCV(Authentication authentication) throws ParseException {

        if (authentication != null && authentication.getPrincipal() instanceof UserDetails userDetails) {
            String userEmail = userDetails.getUsername();
            Optional<UserAccountEntity> userAccount = userAccountRepository.findByEmail(userEmail);
            if (userAccount.isPresent()) {
                var userAccount1 = userAccount.get();
                Optional<CVTemporaryEntity> cvTemporaryEntity = cvTemporaryRepository
                        .findByUserAccount(userAccount1);
                if (cvTemporaryEntity.isPresent()) {
                    CVTemporaryResponseDTO response = cvTemporaryConverter
                            .toDto(cvTemporaryEntity.get());
                    return ResponseEntity.status(HttpStatus.OK).body(
                            ResponseObject.builder()
                                    .status(HttpStatus.OK.toString())
                                    .message("Found temporary CV")
                                    .data(response)
                                    .build());
                } else {
                    return ResponseEntity.status(HttpStatus.OK).body(
                            ResponseObject.builder()
                                    .status(HttpStatus.NOT_FOUND.toString())
                                    .message("User don't have temporary CV.")
                                    .data(null)
                                    .build());
                }

            }

            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.FORBIDDEN.toString())
                            .message("Fail authenthicate.")
                            .data("").build());

        }
        return ResponseEntity.status(HttpStatus.OK).body(
                ResponseObject.builder()
                        .status(HttpStatus.UNAUTHORIZED.toString())
                        .message("Xác thực thất bại")
                        .data("").build());
    }

    @Override
    public ResponseEntity<ResponseObject> getProfile(Authentication authentication) throws ParseException {
        DateTimeFormatter inputFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails userDetails) {
            String userEmail = userDetails.getUsername();
            Optional<UserAccountEntity> userAccount = userAccountRepository.findByEmail(userEmail);
            long userId = Math.toIntExact(userAccount.get().getId());
            Optional<UserInfoEntity> userInfo = userInfoRepository.findById(userId);
            List<CVEntity> listCV = cvRepository.findAllByUserAccountEntityId(userInfo.get().getId());
            List<JSONObject> listJobPosting = new ArrayList<>();
            for (CVEntity cv : listCV) {
                JobPostingEntity jobPostingEntity = cv.getJobPostingEntity();
                JSONObject objJobPosting = jobPostingConverter.toJsonForProfile(jobPostingEntity);
                objJobPosting.put("dateApply", cv.getDateApply());
                List<InterviewDetailEntity> listInterviewDetailEntity = interviewDetailRepository
                        .findByCandidateId(userInfo.get().getId());
                if (listInterviewDetailEntity.size() != 0) {
                    for (InterviewDetailEntity interviewDetailEntity : listInterviewDetailEntity) {
                        if (interviewDetailEntity.getInterview().getJobPostingEntity().getId()
                                .equals(jobPostingEntity.getId())) {
                            System.out.print("  link: "+interviewDetailEntity.getInterview().getLinkmeet());
                            objJobPosting.put("linkMeet",
                                    interviewDetailEntity.getInterview().getLinkmeet());
                            LocalDate dateInterview = LocalDate.parse(interviewDetailEntity.getDate(), outputFormatter);
                            objJobPosting.put("dateInterview", dateInterview.format(outputFormatter));
                            objJobPosting.put("timeInterview", interviewDetailEntity.getTime());
                            List<UserAccountEntity> interviewers = interviewDetailEntity
                                    .getInterview().getInterviewers();
                            List<JSONObject> listInterviewer = new ArrayList<>();
                            for (UserAccountEntity interviewer : interviewers) {
                                JSONObject objInterview = new JSONObject();
                                objInterview.put("fullname",
                                        interviewer.getUserInfo().getFullName());
                                listInterviewer.add(objInterview);
                            }
                            objJobPosting.put("listInterviewer", listInterviewer);
                            break;
                        } else {

                            objJobPosting.put("linkMeet",
                                    null);
                            objJobPosting.put("dateInterview", null);
                            objJobPosting.put("timeInterview", null);
                            objJobPosting.put("listInterviewer", null);
                        }
                    }
                } else {
                    objJobPosting.put("linkMeet",
                            null);
                    objJobPosting.put("dateInterview", null);
                    objJobPosting.put("timeInterview", null);
                    objJobPosting.put("listInterviewer", null);
                }
                listJobPosting.add(objJobPosting);
            }
            if (userAccount.isPresent()) {
                JSONObject objUserInfo = userInfoConverter.toJson(userInfo.get());
                objUserInfo.put("email", userAccount.get().getEmail());
                objUserInfo.put("cv_pdf", userInfo.get().getCv_pdf());
                objUserInfo.put("listJobPosting", listJobPosting);

                return ResponseEntity.status(HttpStatus.OK).body(
                        ResponseObject.builder()
                                .status(HttpStatus.OK.toString())
                                .message(Constant.SUCCESS)
                                .data(objUserInfo).build());
            } else
                return ResponseEntity.status(HttpStatus.OK).body(
                        ResponseObject.builder()
                                .status(HttpStatus.NOT_FOUND.toString())
                                .message("Không lấy được userInfo")
                                .data("").build());
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                ResponseObject.builder()
                        .status(HttpStatus.UNAUTHORIZED.toString())
                        .message("Xác thực thất bại")
                        .data("").build());

    }

    @Override
    public void createUserInfo(UserAccountEntity userAccountEntity) {
        userInfoRepository.save(UserInfoEntity.builder()
                .userAccountInfo(userAccountEntity)
                .build());
    }

    @Override
    public ResponseEntity<ResponseObject> getAllUserInfo() {
        List<UserInfoDataDTO> dtoList = new ArrayList<>();
        List<UserInfoEntity> entityList = userInfoRepository.findAll();
        for (UserInfoEntity userInfoEntity : entityList) {
            UserInfoDataDTO dto = userInfoConverter.toDto(userInfoEntity);
            UserAccountEntity userAccountEntity = userAccountRepository.findOneById(userInfoEntity.getId());
            if (userAccountEntity.getStatus() == Status.BLACKLIST) {
                List<BlacklistEntity> listBlacklistEntity = blackListRepository
                        .findBlacklistEntityByUserAccountEntity(userAccountEntity);
                if (listBlacklistEntity.size() != 0 || listBlacklistEntity != null) {
                    dto.setDateBlacklist(listBlacklistEntity.get(listBlacklistEntity.size() - 1)
                            .getDateBlacklist().toString());
                }
            }
            dto.setAccountStatus(userAccountEntity.getState().toString());
            dto.setDateRegister(userAccountEntity.getCreationTime().toString());
            dto.setEmail(userAccountEntity.getEmail());
            dto.setPermission(userAccountEntity.getRole().toString());
            dto.setStatus(userAccountEntity.getStatus().toString());
            dto.setUsername(userAccountEntity.getUsername());
            List<CVEntity> listCV = cvRepository.findAllByUserAccountEntityId(userInfoEntity.getId());
            List<JSONObject> listJobPosting = new ArrayList<>();
            for (CVEntity cv : listCV) {
                JobPostingEntity jobPostingEntity = cv.getJobPostingEntity();
                JSONObject objJobPosting = jobPostingConverter.toJsonForUser(jobPostingEntity);
                listJobPosting.add(objJobPosting);
            }
            dto.setListJobPosting(listJobPosting);
            List<InterviewDetailEntity> listInterviewDetail = interviewDetailRepository
                    .findByCandidateId(userInfoEntity.getId());
            List<JSONObject> listInterviewJsonObject = new ArrayList<>();
            for (InterviewDetailEntity interview : listInterviewDetail) {
                JSONObject objInterview = interviewDetailConverter.toJsonForUser(interview);
                listInterviewJsonObject.add(objInterview);
            }
            dto.setListInterview(listInterviewJsonObject);
            dtoList.add(dto);
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                ResponseObject.builder()
                        .status(HttpStatus.OK.toString())
                        .message(Constant.SUCCESS)
                        .data(dtoList)
                        .build());
    }

    @Override
    public ResponseEntity<ResponseObject> getDetailUserInfo(long id) {
        UserInfoEntity userInfoEntity = userInfoRepository.findOneById(id);
        if (userInfoEntity != null) {
            UserInfoDataDTO dto = userInfoConverter.toDto(userInfoEntity);
            UserAccountEntity userAccountEntity = userAccountRepository.findOneById(userInfoEntity.getId());
            if (userAccountEntity.getStatus() == Status.BLACKLIST) {
                List<BlacklistEntity> listBlacklistEntity = blackListRepository
                        .findBlacklistEntityByUserAccountEntity(userAccountEntity);
                if (listBlacklistEntity.size() != 0 || listBlacklistEntity != null) {
                    dto.setDateBlacklist(listBlacklistEntity.get(listBlacklistEntity.size() - 1)
                            .getDateBlacklist().toString());
                }
            }
            dto.setAccountStatus(userAccountEntity.getState().toString());
            dto.setDateRegister(userAccountEntity.getCreationTime().toString());
            dto.setEmail(userAccountEntity.getEmail());
            dto.setPermission(userAccountEntity.getRole().toString());
            dto.setStatus(userAccountEntity.getStatus().toString());
            dto.setUsername(userAccountEntity.getUsername());
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.OK.toString())
                            .message(Constant.SUCCESS)
                            .data(dto)
                            .build());
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                ResponseObject.builder()
                        .status(HttpStatus.NOT_FOUND.toString())
                        .message("User not found !")
                        .data(null)
                        .build());
    }

    @Override
    public ResponseEntity<ResponseObject> updateUserInfo(UserInfoRequestDTO dto, long id) {
        UserInfoEntity oldUserInfoEntity = userInfoRepository.findOneById(id);
        userInfoRepository.save(userInfoConverter.toEntity(dto, oldUserInfoEntity));
        if (dto.getEmail() != null) {
            UserAccountEntity entity = userAccountRepository.findOneById(id);
            entity.setEmail(dto.getEmail());
            userAccountRepository.save(entity);
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                ResponseObject.builder()
                        .status(HttpStatus.OK.toString())
                        .message(Constant.SUCCESS)
                        .data(dto)
                        .build());
    }

    @Override
    public ResponseEntity<ResponseObject> acceptCandidate(long id) {
        UserAccountEntity userAccountEntity = userAccountRepository.findOneById(id);
        userAccountEntity.setStatus(Status.ACCEPT);
        userAccountRepository.save(userAccountEntity);
        return ResponseEntity.status(HttpStatus.OK).body(
                ResponseObject.builder()
                        .status(HttpStatus.OK.toString())
                        .message("Accepted candidate")
                        .build());
    }

    @Override
    public ResponseEntity<ResponseObject> banAccount(long id) {
        UserAccountEntity userAccountEntity = userAccountRepository.findOneById(id);
        String message;
        if (userAccountEntity.getState() == UserAccountEntity.State.BANNED) {
            userAccountEntity.setState(UserAccountEntity.State.ACTIVE);
            message = "Removed ban account success!";
        } else {
            userAccountEntity.setState(UserAccountEntity.State.BANNED);
            message = "Banned account success!";
        }

        userAccountRepository.save(userAccountEntity);
        return ResponseEntity.status(HttpStatus.OK).body(
                ResponseObject.builder()
                        .status(HttpStatus.OK.toString())
                        .message(message)
                        .build());
    }
}
