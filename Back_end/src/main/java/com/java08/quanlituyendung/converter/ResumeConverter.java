package com.java08.quanlituyendung.converter;


import com.java08.quanlituyendung.dto.Resume.ResumeDTO;
import com.java08.quanlituyendung.dto.Resume.UpdateResumeDTO;
import com.java08.quanlituyendung.dto.Resume.WorkExpDTO;
import com.java08.quanlituyendung.dto.Resume.WorkProjectDTO;
import com.java08.quanlituyendung.entity.ResumeEntity;
import com.java08.quanlituyendung.entity.UserAccountEntity;
import com.java08.quanlituyendung.entity.sample.WorkingExperience;
import com.java08.quanlituyendung.entity.sample.WorkingProject;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ResumeConverter {
    public ResumeEntity toEntity(ResumeDTO request, UserAccountEntity userAccountEntity) {
        ResumeEntity entity =
                ResumeEntity.builder()
                        .id(request.getId())
                        .userAccountEntity(userAccountEntity)
                        .fullName(request.getFullName())
                        .applicationPosition(request.getApplicationPosition())
                        .email(request.getEmail())
                        .phone(request.getPhone())
                        .gender(request.getGender())
                        .dateOB(request.getDateOB())
                        .city(request.getCity())
                        .address(request.getAddress())
                        .linkedIn(request.getLinkedIn())
                        .github(request.getGithub())
                        .aboutYourself(request.getAboutYourself())
                        .mainSkill(request.getMainSkill())
                        .skills(request.getSkills())
                        .school(request.getSchool())
                        .startEducationTime(request.getStartEdudatiomTime())
                        .endEducationTime(request.getEndEducationTime())
                        .major(request.getMajor())
                        .others(request.getOthers())
                        .build();
        return entity;
    }

    public ResumeDTO toDTO(ResumeEntity resumeEntity) {
        return ResumeDTO.builder()
                .id(resumeEntity.getId())
                .fullName(resumeEntity.getFullName())
                .applicationPosition(resumeEntity.getApplicationPosition())
                .email(resumeEntity.getEmail())
                .phone(resumeEntity.getPhone())
                .gender(resumeEntity.getGender())
                .dateOB(resumeEntity.getDateOB())
                .city(resumeEntity.getCity())
                .address(resumeEntity.getAddress())
                .linkedIn(resumeEntity.getLinkedIn())
                .github(resumeEntity.getGithub())
                .aboutYourself(resumeEntity.getAboutYourself())
                .mainSkill(resumeEntity.getMainSkill())
                .skills(resumeEntity.getSkills())
                .school(resumeEntity.getSchool())
                .startEdudatiomTime(resumeEntity.getStartEducationTime())
                .endEducationTime(resumeEntity.getEndEducationTime())
                .major(resumeEntity.getMajor())
                .others(resumeEntity.getOthers())
                .workingExperiences(resumeEntity.getWorkingExperiences())
                .workingProjects(resumeEntity.getWorkingProjects())
                .build();
    }

    public WorkingExperience DtoToWokEntity(WorkExpDTO dto) {
        return WorkingExperience.builder()
                .id(dto.getId())
                .companyName(dto.getCompanyName())
                .startWorkingTime(dto.getStartWorkingTime())
                .endWorkingTime(dto.getEndWorkingTime())
                .position(dto.getPosition())
                .jobDetail(dto.getJobDetail())
                .technology(dto.getTechnology())
                .build();
    }


    public WorkingProject DtoToProEntity(WorkProjectDTO request) {
        return WorkingProject.builder()
                .id(request.getId())
                .nameProject(request.getNameProject())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .client(request.getClient())
                .description(request.getDescription())
                .members(request.getMembers())
                .position(request.getPosition())
                .responsibilities(request.getResponsibilities())
                .technology(request.getTechnology())
                .build();
    }

    public ResumeEntity userToResumeEntity(UserAccountEntity user) {
        var work = WorkingExperience.builder()
                .companyName("")
                .startWorkingTime("")
                .endWorkingTime("")
                .position("")
                .jobDetail("")
                .technology("")
                .build();

        List<WorkingExperience> workingExperiences = new ArrayList<>();
        workingExperiences.add(work);

        var project = WorkingProject.builder()
                .nameProject("")
                .startTime("")
                .endTime("")
                .client("")
                .description("")
                .members("")
                .position("")
                .responsibilities("")
                .technology("")
                .build();
        List<WorkingProject> workingProjects = new ArrayList<>();
        workingProjects.add(project);

        return ResumeEntity.builder()
                .userAccountEntity(user)
                .fullName(user.getUserInfo().getFullName())
                .workingExperiences(workingExperiences)
                .workingProjects(workingProjects)
                .email(user.getEmail())
                .dateOB(user.getUserInfo().getDob())
                .build();
    }

    public ResumeEntity toEntity(ResumeEntity resumeEntity, UpdateResumeDTO request) {
        resumeEntity.setFullName(request.getFullName());
        resumeEntity.setApplicationPosition(request.getApplicationPosition());
        resumeEntity.setEmail(request.getEmail());
        resumeEntity.setPhone(request.getPhone());
        resumeEntity.setGender(request.getGender());
        resumeEntity.setDateOB(request.getDateOB());
        resumeEntity.setCity(request.getCity());
        resumeEntity.setAddress(request.getAddress());
        resumeEntity.setLinkedIn(request.getLinkedIn());
        resumeEntity.setGithub(request.getGithub());
        resumeEntity.setAboutYourself(request.getAboutYourself());
        resumeEntity.setMainSkill(request.getMainSkill());
        resumeEntity.setSkills(request.getSkills());
        resumeEntity.setSchool(request.getSchool());
        resumeEntity.setStartEducationTime(request.getStartEducationTime());
        resumeEntity.setEndEducationTime(request.getEndEducationTime());
        resumeEntity.setMajor(request.getMajor());
        resumeEntity.setOthers(request.getOthers());
        return resumeEntity;
    }
}
