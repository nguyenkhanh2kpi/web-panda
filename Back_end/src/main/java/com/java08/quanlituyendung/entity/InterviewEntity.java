package com.java08.quanlituyendung.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Interview")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InterviewEntity extends BaseEntity{
    private String roomName;
    private String skill;
    private String description;
    private String startDate;
    private String endDate;
    private String status;
    private String linkmeet;

    // danh sach nguoi phong van
    @ManyToMany
    @JsonIgnore
    @JoinTable(
            name = "interviewer_interview",
            joinColumns = @JoinColumn(name = "interview_id"),
            inverseJoinColumns = @JoinColumn(name = "interviewer_id")
    )
    private List<UserAccountEntity> interviewers = new ArrayList<>();

    // danh sach cac detail
    @OneToMany(mappedBy = "interview", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<InterviewDetailEntity> interviewDetailEntities = new ArrayList<>();

    // nguoi tao room
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "userAccountId")
    private UserAccountEntity userAccountEntity;

    // job post cua room -- lay candidate tu day
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "jobPostId")
    private JobPostingEntity jobPostingEntity;
}
