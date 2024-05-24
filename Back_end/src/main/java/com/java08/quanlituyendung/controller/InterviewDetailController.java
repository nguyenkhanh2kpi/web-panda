package com.java08.quanlituyendung.controller;


import com.java08.quanlituyendung.dto.InterviewPayload.MarkCandidatePayload;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.dto.RoomStatusDTO;
import com.java08.quanlituyendung.service.IInterviewDetailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/interview-detail")
@Tag(name = "Score Candidate")
public class InterviewDetailController {

    @Autowired
    private IInterviewDetailService iInterviewDetailService;

    @Operation(summary = "Sử dụng phương thức này để lấy tất cả các detail candidate trong các phòng phỏng vấn, admin dùng")
    @GetMapping
    public ResponseEntity<ResponseObject> getAll() {
        return iInterviewDetailService.getAll();
    }

    @Operation(summary = "Dùng để lấy danh sách chi tiết candidate theo phòng gọi interview-detail/room/{idRoom}")
    @GetMapping("/room/{roomId}")
    public ResponseEntity<ResponseObject> getInterviewDetailByRoomId(@PathVariable Long roomId) {
        return iInterviewDetailService.getInterviewDetailByRoomId(roomId);
    }

    @Operation(summary = "Lấy roomDetail bằng cách truyền id của detail")
    @GetMapping("/{roomDetailId}")
    public ResponseEntity<ResponseObject> getOne(@PathVariable Long roomDetailId) {
        return iInterviewDetailService.getOne(roomDetailId);
    }

    @Operation(summary = "Chấm điểm các ứng viên")
    @PostMapping("/mark")
    public ResponseEntity<ResponseObject> markCandidate(@RequestBody MarkCandidatePayload request, Authentication authentication) {
        return iInterviewDetailService.markCandidate(request, authentication);
    }



    @Operation(summary = "Thay đổi trạng thái")
    @PostMapping("/hiring-status/{detailId}")
    public ResponseEntity<ResponseObject> changeHiringStatus(@PathVariable Long detailId, @RequestBody RoomStatusDTO status, Authentication authentication){
        return  iInterviewDetailService.changeStatus(detailId,status.getStatus(),authentication);
    }

    @Operation(summary = "Xóa 1 ứng viên khỏi phòng")
    @DeleteMapping("/{detailId}")
    public ResponseEntity<ResponseObject> deleteCandidate(@PathVariable Long detailId, Authentication authentication){
        return  iInterviewDetailService.deleteCandidate(detailId,authentication);
    }

}
