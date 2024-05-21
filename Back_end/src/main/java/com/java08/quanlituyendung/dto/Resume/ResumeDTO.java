package com.java08.quanlituyendung.dto.Resume;

import com.java08.quanlituyendung.entity.sample.WorkingExperience;
import com.java08.quanlituyendung.entity.sample.WorkingProject;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResumeDTO {
    private Long id;
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
    private String aboutYourself;

    // workEx
    private List<WorkingExperience> workingExperiences = new ArrayList<>();

    //    skill
    private String mainSkill;
    private List<String> skills = new ArrayList<>();

//  education

    private String school;
    private String startEdudatiomTime;
    private String endEducationTime;
    private String major;
    private String others;

    //projects
    private List<WorkingProject> workingProjects = new ArrayList<>();
}
