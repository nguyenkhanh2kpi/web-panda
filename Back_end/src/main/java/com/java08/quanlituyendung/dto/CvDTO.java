package com.java08.quanlituyendung.dto;

import com.java08.quanlituyendung.entity.CVEntity;
import com.java08.quanlituyendung.entity.JobPostingEntity;
import com.java08.quanlituyendung.entity.UserAccountEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CvDTO {
    private Long id;
    private String url;
    private Long idJobPosting;
    private CVEntity.State state;
    private UserAccountEntity userAccountEntity;
    private JobPostingEntity jobPostingEntity;
}
