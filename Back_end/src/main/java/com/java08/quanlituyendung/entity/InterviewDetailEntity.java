package com.java08.quanlituyendung.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@Entity
@NoArgsConstructor
@Table(name = "InterviewDetail")
@Builder
public class InterviewDetailEntity extends BaseEntity {
    private Long candidateId;

    // room
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interview_id")
    @JsonIgnore
    private InterviewEntity interview;

    private String date;
    private String time;

    @Column(columnDefinition = "TEXT")
    private String description;

    private Float averageScore;
    private String status;
    private String comment;


    @Column(name = "Equestions", columnDefinition = "TEXT")
    private String englishQuestions;

    @Column(name = "Tquestions", columnDefinition = "TEXT")
    private String technicalQuestions;

    @Column(name = "Squestions", columnDefinition = "TEXT")
    private String softSkillQuestions;


    private String interviewer;
    private String interviewerEmail;
}
