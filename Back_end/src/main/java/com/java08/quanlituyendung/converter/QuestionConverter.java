package com.java08.quanlituyendung.converter;

import com.java08.quanlituyendung.dto.QuestionPayload.QuestionResponseDTO;
import com.java08.quanlituyendung.entity.PositionEntity;
import com.java08.quanlituyendung.entity.QuestionEntity;
import com.java08.quanlituyendung.entity.SkillEntity;
import com.java08.quanlituyendung.entity.UserInfoEntity;
import com.java08.quanlituyendung.repository.UserInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
public class QuestionConverter {
    @Autowired
    UserInfoRepository userInfoRepository;
    public QuestionEntity toEntity(QuestionResponseDTO questionDTO) {
        QuestionEntity questionEntity = new QuestionEntity();
        questionEntity.setQuestion(questionDTO.getQuestion());
        return questionEntity;
    }

    public QuestionResponseDTO toDTO(QuestionEntity questionEntity) {
        List<Long> positionIds = new ArrayList<>();
        List<Long> skillIds = new ArrayList<>();
        for(PositionEntity p: questionEntity.getPositions()){
            positionIds.add(p.getId());

        }
        for(SkillEntity s: questionEntity.getSkills()){
            skillIds.add(s.getId());
        }

        Optional<UserInfoEntity> userInfoEntityOptional = userInfoRepository.findUserInfoEntitiesByEmail(questionEntity.getCreatedBy());
        String name = questionEntity.getCreatedBy();
        if(userInfoEntityOptional.get().getFullName()!=null && !userInfoEntityOptional.get().getFullName().equals("")){
            name = userInfoEntityOptional.get().getFullName();
        }
        return QuestionResponseDTO.builder()
                .id(questionEntity.getId())
                .question(questionEntity.getQuestion())
                .answer(questionEntity.getAnswer())
                .creatorName(name)
                .skillIds(skillIds)
                .fieldEnum(questionEntity.getField())
                .positionIds(positionIds)
                .build();
    }
    public List<QuestionResponseDTO> toListQuestionDTO(List<QuestionEntity> questionEntityList){
        List<QuestionResponseDTO> questionDTOList = new ArrayList<>();
        for(QuestionEntity q : questionEntityList){
            questionDTOList.add(toDTO(q));
        }
        return questionDTOList;
    }

    public QuestionEntity toEntity(QuestionResponseDTO questionDTO, QuestionEntity questionEntity){
        questionEntity.setQuestion(questionDTO.getQuestion());
        return questionEntity;
    }
}

