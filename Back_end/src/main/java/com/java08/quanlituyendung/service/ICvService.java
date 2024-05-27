package com.java08.quanlituyendung.service;

import com.java08.quanlituyendung.dto.ApplyJob.ApplyJobNewCVDTO;
import com.java08.quanlituyendung.dto.ResponseObject;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import java.io.IOException;

public interface ICvService {
    ResponseEntity<ResponseObject> applyJob(long idJobPosting, Authentication authentication);

    ResponseEntity<ResponseObject> getAllCV();

    ResponseEntity<ResponseObject> applyJobNewCV(ApplyJobNewCVDTO request, Authentication authentication) throws IOException;

    ResponseEntity<ResponseObject> updateStatus(Long id, String status);

    ResponseEntity<ResponseObject> updateLabel(Long id, String label);

    ResponseEntity<ResponseObject> getCVById(Long id);

    ResponseEntity<ResponseObject> updateView(Long id, Boolean status);
}
