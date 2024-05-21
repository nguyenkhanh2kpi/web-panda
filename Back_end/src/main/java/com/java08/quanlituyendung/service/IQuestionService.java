package com.java08.quanlituyendung.service;

import com.java08.quanlituyendung.dto.QuestionPayload.QuestionRequestDTO;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.entity.FieldEnum;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

public interface IQuestionService {

    ResponseEntity<ResponseObject> create(QuestionRequestDTO request, Authentication authentication);
    ResponseEntity<ResponseObject> update(QuestionRequestDTO request,Authentication authentication);
    ResponseEntity<ResponseObject> delete(Long id,Authentication authentication);
    ResponseEntity<ResponseObject> getAllByField(FieldEnum fieldEnum);
    ResponseEntity<ResponseObject> getAll();
    ResponseEntity<ResponseObject> getById(Long id);
    ResponseEntity<ResponseObject> getAllBySkills(Long[] sids);


}
