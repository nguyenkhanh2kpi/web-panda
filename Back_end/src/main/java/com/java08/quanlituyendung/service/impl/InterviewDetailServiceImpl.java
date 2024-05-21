package com.java08.quanlituyendung.service.impl;

import com.java08.quanlituyendung.auth.UserAccountRetriever;
import com.java08.quanlituyendung.converter.InterviewDetailConverter;
import com.java08.quanlituyendung.dto.InterviewPayload.InterviewDetailResponseDTO;
import com.java08.quanlituyendung.dto.InterviewPayload.MarkCandidatePayload;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.entity.InterviewDetailEntity;
import com.java08.quanlituyendung.entity.UserAccountEntity;
import com.java08.quanlituyendung.repository.InterviewDetailRepository;
import com.java08.quanlituyendung.repository.InterviewRepository;
import com.java08.quanlituyendung.service.IInterviewDetailService;
import com.java08.quanlituyendung.utils.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class InterviewDetailServiceImpl implements IInterviewDetailService {

    @Autowired
    InterviewDetailRepository interviewDetailRepository;

    @Autowired
    InterviewRepository interviewRepository;

    @Autowired
    InterviewDetailConverter interviewDetailConverter;

    @Autowired
    UserAccountRetriever userAccountRetriever;

    @Override
    public ResponseEntity<ResponseObject> getAll() {
        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.OK.toString())
                .message("SUCCESS !")
                .data(interviewDetailRepository.findAll()
                        .stream()
                        .map(interviewDetailConverter::detailToResponse)
                        .collect(Collectors.toList()))
                .build());
    }

    @Override
    public ResponseEntity<ResponseObject> getOne(Long roomDetailId) {
        Optional<InterviewDetailEntity> detail = interviewDetailRepository.findById(roomDetailId);
        return detail.map(interviewDetail -> ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.OK.toString())
                .message("SUCCESS !")
                .data(interviewDetailConverter.detailToResponse(interviewDetail))
                .build())).orElseGet(() -> ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.NOT_FOUND.toString())
                .message(Constant.FAIL)
                .build()));
    }

    @Override
    public ResponseEntity<ResponseObject> changeStatus(Long detailId, String status, Authentication authentication) {
        var user = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        var detail = interviewDetailRepository.findById(detailId);
        if(user !=null && detail.isPresent()) {
            var d=  detail.get();
            d.setStatus(status);
            interviewDetailRepository.save(d);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.OK.toString())
                    .message("SUCCESS !")
                    .build());
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.NOT_FOUND.toString())
                .message("Can't find interview detail")
                .build());
    }

    @Override
    public ResponseEntity<ResponseObject> getInterviewDetailByRoomId(Long roomId) {
        List<InterviewDetailResponseDTO> list =  interviewDetailRepository.findAll()
                .stream()
                .filter(interviewDetail -> interviewDetail.getInterview().getId().equals(roomId))
                .map(interviewDetailConverter::detailToResponse)
                .toList();
        return ResponseEntity.ok(ResponseObject.builder()
                        .status(HttpStatus.OK.toString())
                        .message("SUCCESS !")
                        .data(list)
                        .build());

    }

    @Override
    public ResponseEntity<ResponseObject> markCandidate(MarkCandidatePayload request, Authentication authentication) {
        UserAccountEntity interviewer = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        Optional<InterviewDetailEntity> interviewDetailEntity = interviewDetailRepository.findById(request.getInterviewDetailId());
        if(interviewDetailEntity.isPresent()){
            var detail = interviewDetailEntity.get();
            if(!detail.getInterview().getInterviewers().contains(interviewer)) {
                return ResponseEntity.ok(ResponseObject.builder()
                                .status(HttpStatus.NOT_ACCEPTABLE.toString())
                        .message("Just interviewer who assigned can do this method!!")
                        .build());
            }
            detail.setAverageScore(request.getAverageMark());
            detail.setComment(request.getComment());
            detail.setEnglishQuestions(request.getEnglishQuestion());
            detail.setTechnicalQuestions(request.getTechnicalQuestion());
            detail.setSoftSkillQuestions(request.getSoftSkillQuestion());
            detail.setStatus("Đã chấm");
            detail.setInterviewer(interviewer.getUserInfo().getFullName());
            detail.setInterviewerEmail(interviewer.getEmail());
            return ResponseEntity.ok(ResponseObject.builder()
                            .status(HttpStatus.OK.toString())
                    .message("SUCCESS!!")
                    .data(interviewDetailConverter.detailToResponse(interviewDetailRepository.save(detail)))
                    .build());
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.NOT_FOUND.toString())
                .message("Can't find interview detail")
                .build());
    }


}
