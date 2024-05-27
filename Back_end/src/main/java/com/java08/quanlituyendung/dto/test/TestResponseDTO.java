package com.java08.quanlituyendung.dto.test;


import com.java08.quanlituyendung.entity.JobPostingEntity;
import com.java08.quanlituyendung.entity.Test.MulQuestionEntity;
import com.java08.quanlituyendung.entity.Test.TestRecordEntity;
import com.java08.quanlituyendung.entity.UserAccountEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TestResponseDTO {
    private Long id;
    private Long jdId;
//    private Integer time;
    private String summary;
    private String startTime;
    private String endTime;

    private String job;
    private List<MulQuestionResponseDTO> questions;

    // ds tham gia
    private List<String> attendees;
    // da lam bai chua
    private boolean isRecord;
}
