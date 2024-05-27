package com.java08.quanlituyendung.service;

import com.java08.quanlituyendung.dto.InterviewCreateDTO;
import com.java08.quanlituyendung.dto.InterviewPayload.*;
import com.java08.quanlituyendung.dto.InterviewerDTO.CreateAccountInterviewerDTO;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.dto.ResponseObjectT;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.text.ParseException;
import java.util.List;

public interface IInterviewService {

    ResponseEntity<ResponseObject> addInterview(InterviewCreateDTO interview, Authentication authentication);

    ResponseEntity<ResponseObject> addOneInterviewer(InterviewerToInterviewDTO interviewerToInterview);

    ResponseEntity<ResponseObjectT<List<RoomResponseDTO>>> getByJobPostId(Long jobPostId, Authentication authentication);

    ResponseEntity<ResponseObject> getAllInterviewer();

    ResponseEntity<ResponseObject> getAllCandidateByJd(Long jobPostId);

    ResponseEntity<ResponseObject> assignCandidateToInterview(AssignCandidateToInterviewDTO interviewDetailDTO);

    ResponseEntity<ResponseObject> sendCalendarInvitation(SendInvitationDTO request) throws GeneralSecurityException, IOException, ParseException;

    ResponseEntity<ResponseObject> updateInterview(UpdateInterviewPayload request);

    ResponseEntity<ResponseObject> deleteInterview(Long roomId);

    ResponseEntity<ResponseObjectT<List<RoomResponseDTO>>> getAllT(Authentication authentication);

    ResponseEntity<ResponseObject> createInterviewer(CreateAccountInterviewerDTO req, Authentication authentication);

    ResponseEntity<ResponseObjectT<RoomResponseDTO>> getById(Long interviewId);

    ResponseEntity<ResponseObject> getMyInterviewer(Authentication authentication);
}


