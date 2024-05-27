package com.java08.quanlituyendung.dto.InterviewPayload;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InterviewerToInterviewDTO {
        private String interviewerEmail;
        private String roomId;
}
