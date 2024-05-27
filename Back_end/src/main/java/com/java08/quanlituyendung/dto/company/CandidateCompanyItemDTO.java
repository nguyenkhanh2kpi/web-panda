package com.java08.quanlituyendung.dto.company;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CandidateCompanyItemDTO {
    private Long detailId;
    private Long candidateId;
    private String name;
    private String email;
    private String jobApplied;
    private String status;
    private String avatar;
    private String cv;
    private String score;
}
