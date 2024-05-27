package com.java08.quanlituyendung.service;


import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.dto.test.AddQuesitonOptionDTO;
import com.java08.quanlituyendung.dto.test.AddQuestionDTO;
import com.java08.quanlituyendung.dto.test.NewTestDTO;
import com.java08.quanlituyendung.dto.test.RecordRequestDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;


public interface IMulQuestionService {
    ResponseEntity<ResponseObject> delQuestion(Authentication authentication, Long quesitonId);

    ResponseEntity<ResponseObject> addQuestion(Authentication authentication, AddQuestionDTO questionText);

    ResponseEntity<ResponseObject> newTest(Authentication authentication, NewTestDTO request);

    ResponseEntity<ResponseObject> getTestForJob(Long jdId, Authentication authentication);

    ResponseEntity<ResponseObject> record(Authentication authentication, RecordRequestDTO request);

    ResponseEntity<ResponseObject> getMyTest(Authentication authentication);

    ResponseEntity<ResponseObject> getMyTestID(Authentication authentication, Long id);

    ResponseEntity<ResponseObject> getRecordByJobID(Long jobId);
}
