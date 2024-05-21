package com.java08.quanlituyendung.converter;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.java08.quanlituyendung.auth.UserAccountRetriever;
import com.java08.quanlituyendung.dto.InterviewPayload.CandidateItemDTO;
import com.java08.quanlituyendung.dto.InterviewPayload.CandidateRoomItemDTO;
import com.java08.quanlituyendung.dto.InterviewPayload.RoomResponseDTO;
import com.java08.quanlituyendung.dto.UserAccountPayload.UserAccountCustomResponseDTO;
import com.java08.quanlituyendung.entity.*;
import com.java08.quanlituyendung.helper.InterviewHelper;
import com.java08.quanlituyendung.repository.CvRepository;
import com.java08.quanlituyendung.repository.InterviewDetailRepository;
import com.java08.quanlituyendung.repository.JobPostingRepository;
import com.java08.quanlituyendung.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import com.java08.quanlituyendung.dto.InterviewCreateDTO;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class InterviewConverter {
    @Autowired
    UserAccountConverter userAccountConverter;

    @Autowired
    InterviewDetailRepository interviewDetailRepository;

    @Autowired
    UserAccountRepository userAccountRepository;

    @Autowired
    CvRepository cvRepository;

    @Autowired
    InterviewHelper interviewHelper;

    @Autowired
    JobPostingRepository jobPostingRepository;

    @Autowired
    UserAccountRetriever userAccountRetriever;

    public RoomResponseDTO toDto(InterviewEntity interview) {
        RoomResponseDTO responseDTO = new RoomResponseDTO();
        responseDTO.setJobPostId(interview.getJobPostingEntity().getId());
        responseDTO.setJobName(interview.getJobPostingEntity().getName());
        responseDTO.setId(interview.getId());
        responseDTO.setRoomName(interview.getRoomName());
        responseDTO.setRoomSkill(interview.getSkill());
        responseDTO.setRoomDescription(interview.getDescription());
        responseDTO.setStartDate(interview.getStartDate());
        responseDTO.setEndDate(interview.getEndDate());
        responseDTO.setStatus(interview.getStatus());
        responseDTO.setLink(interview.getLinkmeet());
        List<UserAccountCustomResponseDTO> lists = new ArrayList<>();
        for (var i:interview.getInterviewers() ){
            lists.add(userAccountConverter.AccountToCustomeResponse(i));
        }
        responseDTO.setListInterviewer(lists);
        List<CandidateRoomItemDTO> listCandidate = interviewDetailRepository.findAll().stream()
                        .filter(interviewDetail -> interviewDetail.getInterview().equals(interview))
                                .map(this::InterviewDetailToCandidateItem)
                                        .collect(Collectors.toList());
        responseDTO.setListCandidate(listCandidate);
        return responseDTO;
    }

    public InterviewEntity toEntity(InterviewCreateDTO dto, Authentication authentication, JobPostingEntity jobPostingEntity) {
        var user = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        InterviewEntity interview = new InterviewEntity();
        interview.setJobPostingEntity(jobPostingEntity);
        interview.setRoomName(dto.getRoomName());
        interview.setSkill(dto.getRoomSkill());
        interview.setDescription(dto.getRoomDescription());
        interview.setStartDate(dto.getStartDate());
        interview.setEndDate(dto.getEndDate());
        interview.setStatus("Created");
        interview.setLinkmeet(dto.getLinkmeet());
        interview.setInterviewDetailEntities(new ArrayList<>());
        interview.setUserAccountEntity(user);
        return interview;
    }

    public CandidateRoomItemDTO InterviewDetailToCandidateItem(InterviewDetailEntity interviewDetail) {
        Optional<UserAccountEntity> userAccountEntity = userAccountRepository.findById(interviewDetail.getCandidateId());
        CandidateRoomItemDTO itemDTO = new CandidateRoomItemDTO();
        itemDTO.setItemId(interviewDetail.getId());
        itemDTO.setCandidateId(interviewDetail.getCandidateId());
        itemDTO.setStatus(interviewDetail.getStatus());
        itemDTO.setName(userAccountEntity.get().getUserInfo().getFullName());
        itemDTO.setEmail(userAccountEntity.get().getEmail());
        itemDTO.setDate(interviewDetail.getDate());
        itemDTO.setTime(interviewDetail.getTime());
        itemDTO.setAvatar(userAccountEntity.get().getUserInfo().getAvatar());
        itemDTO.setSkill(userAccountEntity.get().getUserInfo().getSkill());
        itemDTO.setExperience(userAccountEntity.get().getUserInfo().getExperience());
        return  itemDTO;
    }

    public CandidateItemDTO UserAccountToCandidateItem(UserAccountEntity userAccountEntity, Long jobPostId, CVEntity c) {
        CandidateItemDTO candidateItemDTO = new CandidateItemDTO();
        JobPostingEntity jobPosting =jobPostingRepository.findOneById(jobPostId);
        candidateItemDTO.setUserId(userAccountEntity.getId());
        candidateItemDTO.setFullName(userAccountEntity.getUserInfo().getFullName());
        candidateItemDTO.setExperience(userAccountEntity.getUserInfo().getExperience());
        candidateItemDTO.setSkill(userAccountEntity.getUserInfo().getSkill());
        candidateItemDTO.setAvatar(userAccountEntity.getUserInfo().getAvatar());
        candidateItemDTO.setEmail(userAccountEntity.getEmail());
        candidateItemDTO.setApplyDate(c.getDateApply());
        candidateItemDTO.setCvId(c.getId());
        candidateItemDTO.setCv(c.getUrl());
        candidateItemDTO.setCvStatus(c.getState().toString());
        candidateItemDTO.setPhone(c.getUserAccountEntity().getUserInfo().getPhone());
        candidateItemDTO.setView(c.isView());
        candidateItemDTO.setLabels(c.getLabels());
        boolean hasInterviewDetail = false;
        for (InterviewEntity interview : jobPosting.getInterviewEntity()) {
            for (InterviewDetailEntity interviewDetail : interview.getInterviewDetailEntities()) {
                if (interviewDetail.getCandidateId().equals(userAccountEntity.getId())) {
                    candidateItemDTO.setInterviewStatus(interviewDetail.getStatus());
                    hasInterviewDetail = true;
                    break;
                }
            }
            if (hasInterviewDetail) {
                break;
            }
        }
        if (!hasInterviewDetail) {
            candidateItemDTO.setInterviewStatus("Chưa đăng kí");
        }
        return candidateItemDTO;
    }


}
