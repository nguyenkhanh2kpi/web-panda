package com.java08.quanlituyendung.controller;

import com.java08.quanlituyendung.dto.InterviewCreateDTO;
import com.java08.quanlituyendung.dto.InterviewPayload.*;
import com.java08.quanlituyendung.dto.InterviewerDTO.CreateAccountInterviewerDTO;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.dto.ResponseObjectT;
import com.java08.quanlituyendung.service.IInterviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.text.ParseException;
import java.util.List;


@RestController
@RequestMapping("/interview")
@RequiredArgsConstructor
@Tag(name = "Room Interview")
public class InterviewController {
    private final IInterviewService service;


    @Operation(summary = "Sử dụng phương thức này để tao tai khoan interviewer")
    @PostMapping("register-interview")
    public ResponseEntity<ResponseObject> registerInterview(@RequestBody CreateAccountInterviewerDTO requestDTO, Authentication authentication) {
        return service.createInterviewer(requestDTO, authentication);
    }




    @Operation(summary = "Lấy ra toàn bộ các cuộc phỏng vấn cho admin và interviewer")
    @GetMapping
    public ResponseEntity<ResponseObjectT<List<RoomResponseDTO>>> getAllInterviews(Authentication authentication) {
        return service.getAllT(authentication);
    }

    @Operation(summary = "Lấy theo id, dung chung")
    @GetMapping("/getRoom/{interviewId}")
    public ResponseEntity<ResponseObjectT<RoomResponseDTO>> getById(@PathVariable Long interviewId) {
        return service.getById(interviewId);
    }
    @Operation(summary = "Lấy danh sách các cuộc phỏng vấn theo JobPost")
    @GetMapping("/{jobPostId}")
    public ResponseEntity<ResponseObjectT<List<RoomResponseDTO>>> getByJobPostId(@PathVariable Long jobPostId, Authentication authentication) {
        return service.getByJobPostId(jobPostId, authentication);
    }

    @Operation(summary = "Lấy danh sách những người phỏng vấn")
    @GetMapping("/interviewers")
    public ResponseEntity<ResponseObject> getAllInterviewer() {
        return service.getAllInterviewer();
    }

    @Operation(summary = "Lấy danh sách đội tuyển dụng của tôi")
    @GetMapping("/my-interviewers")
    public ResponseEntity<ResponseObject> getMyInterviewer(Authentication authentication) {
        return service.getMyInterviewer(authentication);
    }

    @Operation(summary = "Lấy danh sách candidate theo Jobpost để assign vào các phòng phỏng vấn")
    @GetMapping("/candidates/{jobPostId}")
    public ResponseEntity<ResponseObject> getAllCandidateByJd(@PathVariable Long jobPostId) {
        return service.getAllCandidateByJd(jobPostId);
    }

    @Operation(summary = "Tạo phòng phỏng vấn")
    @PostMapping("/create-interview")
    public ResponseEntity<ResponseObject> addInterview(@RequestBody InterviewCreateDTO interview, Authentication authentication) {
        return service.addInterview(interview, authentication);
    }

    @Operation(summary = "Assign 1 người phỏng vấn với 1 phòng")
    @PostMapping("/interviewerAssign")
    public ResponseEntity<ResponseObject> addOneInterviewer(@RequestBody InterviewerToInterviewDTO interviewerToInterview) {
        return service.addOneInterviewer(interviewerToInterview);
    }

    @Operation(summary = "Đăng kí 1 candidate với 1 phòng phỏng vấn")
    @PostMapping("/candidateAssign")
    public ResponseEntity<ResponseObject> addDetailInterview(@RequestBody AssignCandidateToInterviewDTO interviewDetailDTO) {
        return service.assignCandidateToInterview(interviewDetailDTO);
    }

    @Operation(summary = "Không cần tạo linkmeet, truyền vào id của room, tự động các thành viên sẽ được nhận một email lời mời + linkmeet được tạo")
    @PostMapping("/interview-send-calendar-invitation")
    public ResponseEntity<ResponseObject> sendInvitation(@RequestBody SendInvitationDTO request) throws GeneralSecurityException, IOException, ParseException {
        return service.sendCalendarInvitation(request);
    }
    @Operation(summary = "Dùng để update một phòng phỏng vấn với roomId là id của phòng phỏng vấn")
    @PutMapping
    public ResponseEntity<ResponseObject> updateInterview(@RequestBody UpdateInterviewPayload request) {
        return service.updateInterview(request);
    }
    @Operation(summary = "Dùng để xóa một phòng phỏng vấn với roomId là id của phòng phỏng vấn")
    @DeleteMapping("/{roomId}")
    public ResponseEntity<ResponseObject> deleteInterview(@PathVariable Long roomId) {
        return service.deleteInterview(roomId);
    }

}
