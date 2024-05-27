package com.java08.quanlituyendung.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InterviewCreateDTO extends AbstractDTO {
    private String jobPostId;
    private String roomName;
    private String roomSkill;
    private String roomDescription;
    private String startDate;
    private String endDate;
    private String linkmeet;
}
