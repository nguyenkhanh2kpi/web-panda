package com.java08.quanlituyendung.dto.InterviewPayload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateInterviewPayload {
    private Long roomId;
    private String roomName;
    private String skill;
    private String description;
    private String startDate;
    private String endDate;
    private String status;
    private String linkMeet;
}
