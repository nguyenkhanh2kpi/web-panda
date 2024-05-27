package com.java08.quanlituyendung.service;


import com.java08.quanlituyendung.dto.QuestionPayload.PositionDTORequest;
import com.java08.quanlituyendung.dto.ResponseObject;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

public interface IPositionService {

    ResponseEntity<ResponseObject> update(PositionDTORequest request, Long id, Authentication authentication);
    ResponseEntity<ResponseObject> create(PositionDTORequest request, Authentication authentication);
    ResponseEntity<ResponseObject> delete(long id, Authentication authentication);

    ResponseEntity<ResponseObject> getAll();

    ResponseEntity<ResponseObject> getById(Long id);
}
