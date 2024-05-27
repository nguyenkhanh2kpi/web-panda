package com.java08.quanlituyendung.controller;

import com.java08.quanlituyendung.dto.JobPostingDTO;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.service.IJobPostingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/job-posting")
@Tag(name = "Job Posting")
public class JobPostingController {
    @Autowired
    private IJobPostingService jobPostingService;
    @Operation(summary = "Sử dụng phương thức này để lấy thông tin của tất cả các job")
    @GetMapping
    public ResponseEntity<ResponseObject> getAllJobPosting() {
        return jobPostingService.getAllJobPosting();
    }
    @Operation(summary = "Sử dụng phương thức này để lấy danh sách các candidate đã ứng tuyển theo id job")
    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getDetailJobPosting(@PathVariable long id) throws ParseException {
        return jobPostingService.getDetailJobPosting(id);
    }
    @Operation(summary = "Sử dụng phương thức này để tạo job posting")
    @PostMapping
    public ResponseEntity<ResponseObject> createJobPosting(@RequestBody JobPostingDTO request, Authentication authentication) {
        return jobPostingService.save(request, authentication);
    }

    @Operation(summary = "Lấy danh sách công việc của tôi")
    @GetMapping(value = "/my-job")
    public ResponseEntity<ResponseObject> getMyJobs(Authentication authentication) {
        return jobPostingService.getMyJobs(authentication);
    }

    @Operation(summary = "Sử dụng phương thức này để cập nhật job posting theo từng id")
    @PutMapping(value = "/{id}")
    public ResponseEntity<ResponseObject> updateJobPosting(@RequestBody JobPostingDTO request, @PathVariable long id, Authentication authentication) {
        request.setId(id);
        return jobPostingService.save(request, authentication);
    }
    @Operation(summary = "Sử dụng phương thức này để xóa job posting theo từng id")
    @DeleteMapping(value = "/{id}")
    public ResponseEntity<ResponseObject> delete(@PathVariable long id) {
        return jobPostingService.delete(id);
    }


    @PutMapping("/{id}/state")
    public ResponseEntity<ResponseObject> updateJobState(@PathVariable long id, @RequestBody String state) {
        return jobPostingService.updateJobState(id, state);
    }
    @PutMapping("/{id}/vip/{vipStatus}")
    public ResponseEntity<ResponseObject> setJobVIPStatus(@PathVariable long id, @PathVariable boolean vipStatus,Authentication authentication) {
        return jobPostingService.setJobVIPStatus(id, vipStatus,authentication);
    }
}
