package com.java08.quanlituyendung.service.impl;


import com.java08.quanlituyendung.auth.UserAccountRetriever;
import com.java08.quanlituyendung.converter.ResumeConverter;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.dto.Resume.ResumeDTO;
import com.java08.quanlituyendung.dto.Resume.UpdateResumeDTO;
import com.java08.quanlituyendung.dto.Resume.WorkExpDTO;
import com.java08.quanlituyendung.dto.Resume.WorkProjectDTO;
import com.java08.quanlituyendung.entity.ResumeEntity;
import com.java08.quanlituyendung.entity.Role;
import com.java08.quanlituyendung.entity.UserAccountEntity;
import com.java08.quanlituyendung.entity.sample.WorkingExperience;
import com.java08.quanlituyendung.entity.sample.WorkingProject;
import com.java08.quanlituyendung.repository.ResumeRepository;
import com.java08.quanlituyendung.repository.WorkingExperienceRepository;
import com.java08.quanlituyendung.repository.WorkingProjectRepository;
import com.java08.quanlituyendung.service.IResumeService;
import com.java08.quanlituyendung.utils.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ResumeServiceImpl implements IResumeService {
    private UserAccountRetriever userAccountRetriever;
    private ResumeRepository resumeRepository;
    private ResumeConverter resumeConverter;
    private WorkingExperienceRepository experienceRepository;

    private WorkingProjectRepository workingProjectRepository;

    @Autowired
    public ResumeServiceImpl(UserAccountRetriever userAccountRetriever,
                             ResumeRepository resumeRepository,
                             ResumeConverter resumeConverter,
                             WorkingExperienceRepository experienceRepository
            , WorkingProjectRepository workingProjectRepository) {
        this.userAccountRetriever = userAccountRetriever;
        this.resumeRepository = resumeRepository;
        this.resumeConverter = resumeConverter;
        this.experienceRepository = experienceRepository;
        this.workingProjectRepository = workingProjectRepository;
    }

    @Override
    public ResponseEntity<ResponseObject> createResume(ResumeDTO request, Authentication authentication) {
        UserAccountEntity user = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);

        if (user == null) {
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.NOT_ACCEPTABLE.toString())
                    .message("Something went wrong")
                    .build());
        }

//        var resume = resumeRepository.findByUserAccountEntity(user);
//
//        if(resume.isEmpty()) {
//            ResumeEntity resumeEntity = new ResumeEntity();
//            resumeEntity.setUserAccountEntity(user);
//            resumeRepository.save(resumeEntity);
//            return ResponseEntity.ok(ResponseObject.builder()
//                    .status(HttpStatus.CREATED.toString())
//                    .message(Constant.SUCCESS)
//                    .data(resumeConverter.toDTO(resumeEntity))
//                    .build());
//        }

        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.OK.toString())
                .message(Constant.SUCCESS)
                .data(resumeConverter.toDTO(resumeRepository.save(resumeConverter.toEntity(request, user))))
                .build());
    }

    @Override
    public ResponseEntity<ResponseObject> getMyResume(Authentication authentication) {
        UserAccountEntity user = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        if (user == null) {
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.NOT_ACCEPTABLE.toString())
                    .message("Something went wrong")
                    .build());
        }
        var resume = resumeRepository.findByUserAccountEntity(user);
        if (resume.isEmpty()) {
            ResumeEntity resumeEntity = resumeConverter.userToResumeEntity(user);
            resumeRepository.save(resumeEntity);
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.CREATED.toString())
                    .message(Constant.SUCCESS)
                    .data(resumeConverter.toDTO(resumeEntity))
                    .build());
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.OK.toString())
                .message(Constant.SUCCESS)
                .data(resumeConverter.toDTO(resume.get()))
                .build());
    }

    @Override
    public ResponseEntity<ResponseObject> getAll(Authentication authentication) {
        UserAccountEntity user = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        if (user.getRole().equals(Role.RECRUITER)) {
            var resumes = resumeRepository.findAll();
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.OK.toString())
                    .message(Constant.SUCCESS)
                    .data(resumes.stream().map(resumeConverter::toDTO).collect(Collectors.toList()))
                    .build());
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.NOT_ACCEPTABLE.toString())
                .message("Something went wrong")
                .build());
    }

    @Override
    public ResponseEntity<ResponseObject> save(Authentication authentication, WorkExpDTO request) {
        UserAccountEntity user = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        if (user == null) {
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.NOT_ACCEPTABLE.toString())
                    .message("Something went wrong")
                    .build());
        }
        WorkingExperience workingExperience;
        workingExperience = resumeConverter.DtoToWokEntity(request);
        experienceRepository.save(workingExperience);

        Optional<ResumeEntity> resume = resumeRepository.findByUserAccountEntity(user);
        if (resume.isPresent() && request.getId() == null) {
            resume.get().getWorkingExperiences().add(workingExperience);
            resumeRepository.save(resume.get());
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.CREATED.toString())
                    .message(Constant.SUCCESS)
                    .data(resumeConverter.toDTO(resume.get()))
                    .build());
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.OK.toString())
                .message("UPDATE")
                .data(resumeConverter.toDTO(resume.get()))
                .build());
    }


    @Override
    public ResponseEntity<ResponseObject> delete(Authentication authentication, WorkExpDTO request) {
        UserAccountEntity user = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        if (user == null) {
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.NOT_ACCEPTABLE.toString())
                    .message("Something went wrong")
                    .build());
        }

        WorkingExperience workingExperience;
        workingExperience = resumeConverter.DtoToWokEntity(request);
        experienceRepository.delete(workingExperience);

        Optional<ResumeEntity> resume = resumeRepository.findByUserAccountEntity(user);


        if (resume.isPresent() && request.getId() != null) {
            resume.get().getWorkingExperiences().remove(resumeConverter.DtoToWokEntity(request));
            resumeRepository.save(resume.get());
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.OK.toString())
                    .message(Constant.SUCCESS)
                    .data(resumeConverter.toDTO(resume.get()))
                    .build());
        }

        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.OK.toString())
                .message("NOT FOUND")
                .data(resumeConverter.toDTO(resume.get()))
                .build());
    }

    @Override
    public ResponseEntity<ResponseObject> saveProject(Authentication authentication, WorkProjectDTO request) {
        UserAccountEntity user = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        if (user == null) {
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.NOT_ACCEPTABLE.toString())
                    .message("Something went wrong")
                    .build());
        }


        WorkingProject workingProject;
        workingProject = resumeConverter.DtoToProEntity(request);
        workingProjectRepository.save(workingProject);

        Optional<ResumeEntity> resume = resumeRepository.findByUserAccountEntity(user);
        if (resume.isPresent() && request.getId() == null) {
            resume.get().getWorkingProjects().add(workingProject);
            resumeRepository.save(resume.get());
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.CREATED.toString())
                    .message(Constant.SUCCESS)
                    .data(resumeConverter.toDTO(resume.get()))
                    .build());
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.OK.toString())
                .message("UPDATE")
                .data(resumeConverter.toDTO(resume.get()))
                .build());

    }

    @Override
    public ResponseEntity<ResponseObject> deleteProject(Authentication authentication, WorkProjectDTO request) {

        UserAccountEntity user = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        if (user == null) {
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.NOT_ACCEPTABLE.toString())
                    .message("Something went wrong")
                    .build());
        }

        WorkingProject workingProject;
        workingProject = resumeConverter.DtoToProEntity(request);
        workingProjectRepository.delete(workingProject);

        Optional<ResumeEntity> resume = resumeRepository.findByUserAccountEntity(user);


        if (resume.isPresent() && request.getId() != null) {
            resume.get().getWorkingProjects().remove(resumeConverter.DtoToProEntity(request));
            resumeRepository.save(resume.get());
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.OK.toString())
                    .message(Constant.SUCCESS)
                    .data(resumeConverter.toDTO(resume.get()))
                    .build());
        }

        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.OK.toString())
                .message("NOT FOUND")
                .data(resumeConverter.toDTO(resume.get()))
                .build());

    }

    @Override
    public ResponseEntity<ResponseObject> updateResume(UpdateResumeDTO request, Authentication authentication) {
        Optional<ResumeEntity> resume = resumeRepository.findById(request.getId());
        if (resume.isPresent()) {
            resumeRepository.save(resumeConverter.toEntity(resume.get(), request));
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.OK.toString())
                    .message(Constant.SUCCESS)
                    .data(resumeConverter.toDTO(resume.get()))
                    .build());

        } else {
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.NOT_FOUND.toString())
                    .message("Can not find resume")
                    .data("")
                    .build());

        }
    }


}
