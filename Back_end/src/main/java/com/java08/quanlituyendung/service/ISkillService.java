package com.java08.quanlituyendung.service;

import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.dto.QuestionPayload.SkillRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

public interface ISkillService {

     ResponseEntity<ResponseObject> create(SkillRequestDTO request, Authentication authentication);
     ResponseEntity<ResponseObject> delete(Long id,Authentication authentication);
     ResponseEntity<ResponseObject> update(Long id,SkillRequestDTO request,Authentication authentication);
     ResponseEntity<ResponseObject> getAll(Authentication authentication);

    ResponseEntity<ResponseObject> getById(Long id);
}
