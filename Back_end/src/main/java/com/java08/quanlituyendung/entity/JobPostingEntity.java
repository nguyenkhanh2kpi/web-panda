package com.java08.quanlituyendung.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "JobPosting")
public class JobPostingEntity extends BaseEntity{
    @Column(name = "name")
    private String name;
    @Column(name = "position")
    private String position;
    @Column(name = "language")
    private String language;
    @Column(name = "location")
    private String location;
    @Column(name = "salary")
    private String salary;
    @Column(name = "number")
    private String number;
    @Column(name = "workingForm")
    private String workingForm;
    @Column(name = "sex")
    private String sex;
    @Column(name = "experience")
    private String experience;
    @Column(name = "detailLocation")
    private String detailLocation;
    @Column(name = "detailJob", columnDefinition = "text")
    private String detailJob;
    @Column(name = "requirements", columnDefinition = "text")
    private String requirements;
    @Column(name = "interest", columnDefinition = "text")
    private String interest;
    @Column(name = "image", columnDefinition = "text")
    private String image;
    @Column(name = "createDate")
    private String createDate;
    @Column(name = "updateDate")
    private String updateDate;
    @Column(name = "expriredDate")
    private String expriredDate;
    @Column(name = "status")
    private Boolean status;

    // danh sach ung vien
    @OneToMany(mappedBy = "jobPostingEntity")
    private List<CVEntity> cvEntities;

    // thuoc ve skill
//    @ManyToMany
//    @JoinTable(
//            name = "Skills_JobPosting",
//            joinColumns = @JoinColumn(name = "jobPostingId"),
//            inverseJoinColumns = @JoinColumn(name = "skillId")
//    )
//    private List<SkillEntity> skillsEntities = new ArrayList<>();

    // danh sach nguoi phong van ?
    @OneToMany(mappedBy = "jobPostingEntity")
    private List<InterviewEntity> interviewEntity;

    // co the la nguoi tao
    @ManyToOne
    @JoinColumn(name = "userAccountId")
    private UserAccountEntity userAccountEntity;


// những trường mới
    private Boolean requireTest;

    @Enumerated(EnumType.STRING)
    private JobPostingEntity.State state;
    public enum State {
        CREATE,
        ON,
        PAUSE,
        END
    }
//nganh nghe
    @Column(name = "industry")
    private String industry;

    @Column(name = "industry2")
    private String industry2;

}