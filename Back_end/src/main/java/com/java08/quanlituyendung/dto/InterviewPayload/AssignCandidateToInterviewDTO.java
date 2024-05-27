package com.java08.quanlituyendung.dto.InterviewPayload;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssignCandidateToInterviewDTO {
    Long candidateId;
    Long interviewId;
    String date;
    String time;
    String description;
}
