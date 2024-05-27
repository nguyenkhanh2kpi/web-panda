package com.java08.quanlituyendung.service;

import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.dto.Resume.ResumeDTO;
import com.java08.quanlituyendung.dto.Resume.UpdateResumeDTO;
import com.java08.quanlituyendung.dto.Resume.WorkExpDTO;
import com.java08.quanlituyendung.dto.Resume.WorkProjectDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

public interface IResumeService {

    ResponseEntity<ResponseObject> createResume(ResumeDTO request, Authentication authentication);

    ResponseEntity<ResponseObject> getMyResume(Authentication authentication);

    ResponseEntity<ResponseObject> save(Authentication authentication, WorkExpDTO request);

    ResponseEntity<ResponseObject> delete(Authentication authentication, WorkExpDTO request);

    ResponseEntity<ResponseObject> saveProject(Authentication authentication, WorkProjectDTO request);

    ResponseEntity<ResponseObject> deleteProject(Authentication authentication, WorkProjectDTO request);

    ResponseEntity<ResponseObject> updateResume(UpdateResumeDTO request, Authentication authentication);

    ResponseEntity<ResponseObject> getAll(Authentication authentication);
}
