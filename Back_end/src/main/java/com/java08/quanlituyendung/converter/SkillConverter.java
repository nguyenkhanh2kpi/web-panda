package com.java08.quanlituyendung.converter;

import com.java08.quanlituyendung.dto.QuestionPayload.SkillResponseDTO;
import com.java08.quanlituyendung.entity.SkillEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class SkillConverter {

    @Autowired
    FieldConverter fieldConverter;
    public SkillResponseDTO toDTO(SkillEntity skillsEntity){
        return SkillResponseDTO.builder()
                .id(skillsEntity.getId())
                .skillName(skillsEntity.getSkillName())
                .isDelete(skillsEntity.getIsDeleted())
                .build();
    }

    public List<SkillResponseDTO> toSkillsDTOList(List<SkillEntity> skillsEntityList){
        List<SkillResponseDTO> skillsDTOList = new ArrayList<>();
        for(SkillEntity f : skillsEntityList){
            skillsDTOList.add(toDTO(f));
        }
        return skillsDTOList;
    }


    public SkillResponseDTO toSkillDto(SkillEntity skillEntity) {
        SkillResponseDTO responseDTO = new SkillResponseDTO();
        responseDTO = toDTO(skillEntity);
        return  responseDTO;
    }
}

