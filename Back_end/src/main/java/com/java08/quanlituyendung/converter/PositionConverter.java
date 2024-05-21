package com.java08.quanlituyendung.converter;

import com.java08.quanlituyendung.dto.QuestionPayload.PositionDTOResponse;
import com.java08.quanlituyendung.dto.QuestionPayload.PositionDTORequest;
import com.java08.quanlituyendung.entity.PositionEntity;
import com.java08.quanlituyendung.repository.JobPostingRepository;
import com.java08.quanlituyendung.repository.PositionRepository;
import com.java08.quanlituyendung.repository.QuestionRepository;
import com.java08.quanlituyendung.repository.SkillRepository;

import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PositionConverter {
    @Autowired
    SkillConverter skillConverter;

    @Autowired
    private final PositionRepository positionRepository;

    @Autowired
    private final QuestionRepository questionRepository;

    @Autowired
    private final SkillRepository skillRepository;

    @Autowired
    private final JobPostingRepository jobPostingRepository;

    public PositionEntity toEntityReq(PositionDTORequest requestDTO) {
        PositionEntity entity = new PositionEntity();
        entity.setPositionName(requestDTO.getName());
        return entity;
    }

    public PositionDTORequest toDTOReq(PositionEntity positionEntity) {
        return PositionDTORequest.builder()
                .name(positionEntity.getPositionName())
                .build();
    }

    public PositionDTOResponse toDTO(PositionEntity positionEntity) {
        return PositionDTOResponse.builder()
                .id(positionEntity.getId())
                .positionName(positionEntity.getPositionName())
                .build();
    }

    public List<PositionDTOResponse> toListPositionDTO(List<PositionEntity> positionEntityList) {
        List<PositionDTOResponse> positionDTOList = new ArrayList<>();
        for (PositionEntity p : positionEntityList) {
            positionDTOList.add(toDTO(p));
        }
        return positionDTOList;
    }

    public PositionDTOResponse toPositionDTO(PositionEntity positionEntity) {
        PositionDTOResponse positionDTO = new PositionDTOResponse();
        positionDTO = toDTO(positionEntity);
        return positionDTO;
    }

}
