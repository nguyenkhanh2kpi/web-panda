package com.java08.quanlituyendung.dto.Resume;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkExpDTO {
    private Long id;
    private String companyName;
    private String startWorkingTime;
    private String endWorkingTime;
    private String position;
    private String jobDetail;
    private String technology;
}
