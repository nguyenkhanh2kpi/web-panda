package com.java08.quanlituyendung.converter;


import com.java08.quanlituyendung.dto.InterviewPayload.InterviewDetailResponseDTO;
import com.java08.quanlituyendung.entity.CVEntity;
import com.java08.quanlituyendung.entity.InterviewDetailEntity;
import com.java08.quanlituyendung.entity.UserAccountEntity;
import com.java08.quanlituyendung.helper.InterviewHelper;
import com.java08.quanlituyendung.repository.UserAccountRepository;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class InterviewDetailConverter {

    @Autowired
    UserAccountRepository userAccountRepository;

    @Autowired
    InterviewConverter interviewConverter;

    @Autowired
    InterviewHelper interviewHelper;


    public InterviewDetailResponseDTO detailToResponse(InterviewDetailEntity interviewDetail) {
        Optional<UserAccountEntity> candidate = userAccountRepository.findById(interviewDetail.getCandidateId());
        UserAccountEntity candidateEntity = candidate.orElse(null);
        CVEntity cvEntity = candidateEntity != null
                ? interviewHelper.findCvByRoomAndCandidate(candidateEntity.getId(), interviewDetail.getInterview())
                .orElse(null)
                : null;
        return InterviewDetailResponseDTO.builder()
                .id(interviewDetail.getId())
                .roomId(interviewDetail.getInterview().getId())
                .candidate(interviewConverter.InterviewDetailToCandidateItem(interviewDetail))
                .cv(cvEntity)
                .description(interviewDetail.getDescription())
                .averageScores(interviewDetail.getAverageScore())
                .comment(interviewDetail.getComment())
                .englishQuestion(interviewDetail.getEnglishQuestions())
                .softSkillQuestion(interviewDetail.getSoftSkillQuestions())
                .technicalQuestion(interviewDetail.getTechnicalQuestions())
                .interviewer(interviewDetail.getInterviewer() != null ? interviewDetail.getInterviewer()
                        : interviewDetail.getInterviewerEmail())
                .build();
    }

    public JSONObject toJsonForUser(InterviewDetailEntity entity){
        JSONObject obj = new JSONObject();
        obj.put("dateInterview",entity.getDate());
        obj.put("averageScore",entity.getAverageScore());
        obj.put("position",entity.getInterview().getJobPostingEntity().getPosition());
        return obj;
    }

}



