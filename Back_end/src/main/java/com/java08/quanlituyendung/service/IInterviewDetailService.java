package com.java08.quanlituyendung.service;

import com.java08.quanlituyendung.dto.InterviewPayload.MarkCandidatePayload;
import com.java08.quanlituyendung.dto.ResponseObject;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

public interface IInterviewDetailService {

    ResponseEntity<ResponseObject> markCandidate(MarkCandidatePayload request, Authentication authentication);

    ResponseEntity<ResponseObject> getInterviewDetailByRoomId(Long roomId);

    ResponseEntity<ResponseObject> getAll();

    ResponseEntity<ResponseObject> getOne(Long roomDetailId);

    ResponseEntity<ResponseObject> changeStatus(Long detailId, String status, Authentication authentication);
}
