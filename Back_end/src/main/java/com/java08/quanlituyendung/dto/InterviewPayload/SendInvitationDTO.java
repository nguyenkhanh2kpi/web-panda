package com.java08.quanlituyendung.dto.InterviewPayload;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SendInvitationDTO {
    private Long roomId;
    private String startTime;
    private String endTime;
    private String token;
    // them
}
