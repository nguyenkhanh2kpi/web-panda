package com.java08.quanlituyendung.dto.InterviewPayload;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CandidateItemDTO {
    private Long userId;
    private String fullName;
    private String email;
    private String skill;
    private String experience;
    private String avatar;
    private String interviewStatus;
    private Long cvId;
    private String cv;
    private String applyDate;
    private String cvStatus;
    private String labels;


    private Boolean view;
    private String phone;


}
