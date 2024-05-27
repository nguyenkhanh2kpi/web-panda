package com.java08.quanlituyendung.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.java08.quanlituyendung.entity.sample.WorkingExperience;
import com.java08.quanlituyendung.entity.sample.WorkingProject;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Resume")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResumeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "userAccountId")
    private UserAccountEntity userAccountEntity;

//    personal infomation

    private String fullName;
    private String applicationPosition;
    private String email;
    private String phone;
    private String gender;
    private String dateOB;
    private String city;
    private String address;
    private String linkedIn;
    private String github;

    //    about
    @Column(name = "aboutYourself", columnDefinition = "TEXT")
    private String aboutYourself;

    // workEx
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "resume_id")
    private List<WorkingExperience> workingExperiences = new ArrayList<>();

    //    skill

    private String mainSkill;
    @ElementCollection
    @CollectionTable(name = "Resume_Skills", joinColumns = @JoinColumn(name = "resume_id"))
    @Column(name = "skill")
    private List<String> skills = new ArrayList<>();

//  education

    private String school;
    private String startEducationTime;
    private String endEducationTime;
    private String major;
    private String others;

//projects
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "resume_id")
    private List<WorkingProject> workingProjects = new ArrayList<>();



}
