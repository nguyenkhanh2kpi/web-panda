package com.java08.quanlituyendung.controller;

import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.dto.Resume.ResumeDTO;
import com.java08.quanlituyendung.dto.Resume.UpdateResumeDTO;
import com.java08.quanlituyendung.dto.Resume.WorkExpDTO;
import com.java08.quanlituyendung.dto.Resume.WorkProjectDTO;
import com.java08.quanlituyendung.service.IResumeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("resume")
@RequiredArgsConstructor
@Tag(name = "Resume")
public class ResumeController {

    private final IResumeService iResumeService;

    @Operation(summary = "Get or create resume")
    @GetMapping("")
    public ResponseEntity<ResponseObject> getOrCreateResume(Authentication authentication) {
        return iResumeService.getMyResume(authentication);
    }

    @Operation(summary = "create resume (tam khong dung)")
    @PostMapping("")
    public ResponseEntity<ResponseObject> createResume(@RequestBody ResumeDTO request, Authentication authentication) {
        return iResumeService.createResume(request, authentication);
    }

    @Operation(summary = "update resume")
    @PutMapping("")
    public ResponseEntity<ResponseObject> update(@RequestBody UpdateResumeDTO request, Authentication authentication) {
        return iResumeService.updateResume(request, authentication);
    }


    @Operation(summary = "")
    @PostMapping("/work-ex/add-or-update")
    public ResponseEntity<ResponseObject> addWorkEx(@RequestBody WorkExpDTO request, Authentication authentication) {
        return iResumeService.save(authentication, request);
    }

    @Operation(summary = "")
    @PostMapping("/delete-work-ex")
    public ResponseEntity<ResponseObject> deleteWorkEx(@RequestBody WorkExpDTO request, Authentication authentication) {
        return iResumeService.delete(authentication, request);
    }


    @Operation(summary = "")
    @PostMapping("/project/add-or-update")
    public ResponseEntity<ResponseObject> addProject(@RequestBody WorkProjectDTO request, Authentication authentication) {
        return iResumeService.saveProject(authentication, request);
    }

    @Operation(summary = "")
    @PostMapping("/delete-work-project")
    public ResponseEntity<ResponseObject> deleteProject(@RequestBody WorkProjectDTO request, Authentication authentication) {
        return iResumeService.deleteProject(authentication, request);
    }


    //get tat ca resume
    @Operation(summary = "Get all resume")
    @GetMapping("/all")
    public ResponseEntity<ResponseObject> getAll(Authentication authentication) {
        return iResumeService.getAll(authentication);
    }


}
