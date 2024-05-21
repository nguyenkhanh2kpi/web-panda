package com.java08.quanlituyendung.dto.InterviewPayload;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MarkCandidatePayload {
    private Long interviewDetailId;
    private String comment;
    private Float averageMark;
    private String englishQuestion;
    private String technicalQuestion;
    private String softSkillQuestion;
}
