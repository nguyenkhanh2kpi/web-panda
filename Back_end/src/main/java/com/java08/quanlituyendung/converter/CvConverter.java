package com.java08.quanlituyendung.converter;

import com.java08.quanlituyendung.dto.CvDTO;
import com.java08.quanlituyendung.entity.CVEntity;
import org.springframework.stereotype.Component;

@Component
public class CvConverter {
    public CvDTO toDTO(CVEntity entity) {
        return CvDTO.builder()
                .id(entity.getId())
                .url(entity.getUrl())
                .state(entity.getState())
                .jobPostingEntity(entity.getJobPostingEntity())
                .userAccountEntity(entity.getUserAccountEntity())
                .build();
    }
}
