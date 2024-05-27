package com.java08.quanlituyendung.helper;

import com.java08.quanlituyendung.dto.InterviewPayload.AssignCandidateToInterviewDTO;
import com.java08.quanlituyendung.entity.*;
import com.java08.quanlituyendung.repository.CvRepository;
import com.java08.quanlituyendung.repository.InterviewRepository;
import com.java08.quanlituyendung.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Component
public class InterviewHelper {

    @Autowired
    CvRepository cvRepository;

    @Autowired
    UserAccountRepository userAccountRepository;

    @Autowired
    InterviewRepository interviewRepository;



    public boolean isCandidateJoinInterview(UserAccountEntity candidate, InterviewEntity interview) {
         return interview.getInterviewDetailEntities().stream()
                 .map(InterviewDetailEntity::getCandidateId)
                 .toList()
                 .contains(candidate.getId());
    }

    public boolean isCandidateJoinJobRooms(UserAccountEntity candidate, InterviewEntity interview) {
        JobPostingEntity jd = interview.getJobPostingEntity();
        List<InterviewEntity> interviewEntityList = jd.getInterviewEntity();
        for(var i:interviewEntityList) {
            if(isCandidateJoinInterview(candidate,i))
                return true;
        }
        return false;
    }

    public InterviewDetailEntity buildFirstTimeInterviewDetail(UserAccountEntity candidate, InterviewEntity interview, AssignCandidateToInterviewDTO dto) {
        return InterviewDetailEntity.builder()
                .candidateId(candidate.getId())
                .interview(interview)
                .date(dto.getDate())
                .time(dto.getTime())
                .description(dto.getDescription())
                .averageScore((float) 0)
                .status("Chưa phỏng vấn")
                .comment("")
                .technicalQuestions("")
                .englishQuestions("")
                .softSkillQuestions("")
                .build();
    }


    public Optional<CVEntity> findCvByRoomAndCandidate(Long candidateId, InterviewEntity interview) {
        var candidate = userAccountRepository.findById(candidateId);
        if (candidate.isEmpty() || interview == null) {
            return Optional.empty();
        }
        return cvRepository.findAll().stream()
                .filter(cvEntity -> cvEntity.getUserAccountEntity().equals(candidate.get())
                        && cvEntity.getJobPostingEntity().equals(interview.getJobPostingEntity())
                ).findFirst();
    }


    public List<String> getEmailAttendeeByRoom(Long roomId) {
        List<String> attendees = new ArrayList<>();
        Optional<InterviewEntity> interview =interviewRepository.findById(roomId);
        if(interview.isPresent()) {
            var interview1= interview.get();
            var listInterviewer = interview1.getInterviewers();
            for(var i:listInterviewer) {
                attendees.add(i.getEmail());
            }
            var interviewDetails = interview1.getInterviewDetailEntities();
            for(var j:interviewDetails) {
                Optional<UserAccountEntity> user = userAccountRepository.findById(j.getCandidateId());
                user.ifPresent(userAccountEntity -> attendees.add(userAccountEntity.getEmail()));
            }
        }
        return attendees;
    }
}
