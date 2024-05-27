package com.java08.quanlituyendung.controller;

import com.java08.quanlituyendung.dto.*;
import com.java08.quanlituyendung.dto.QuestionPayload.SkillRequestDTO;
import com.java08.quanlituyendung.service.ISkillService;

import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/skill")
@RequiredArgsConstructor
@Tag(name = "Skill")
public class SkillController {

    @Autowired
    private final ISkillService skillService;

    @Operation(summary = "Xóa Skill thông qua Skill ID")
    @DeleteMapping ("/{id}")
    public ResponseEntity<ResponseObject> deleteSkill(@PathVariable long id,Authentication authentication) {
        return skillService.delete(id,authentication);
    }

    @Operation(summary = "Tạo Skill mới với thông tin gửi lên")
    @PostMapping
    public ResponseEntity<ResponseObject> createSkill(@RequestBody SkillRequestDTO request, Authentication authentication) {
        return skillService.create(request,authentication);
    }

    @Operation(summary = "Cập nhật thông tin mới của Skill thông qua ID")
    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> updateSkill(@PathVariable long id,@RequestBody SkillRequestDTO request,Authentication authentication) {
        return skillService.update(id,request,authentication);
    }

    @Operation(summary = "Lấy tất cả các Skill trong database")
    @GetMapping()
    public ResponseEntity<ResponseObject> getAll(Authentication authentication) {
        return skillService.getAll(authentication);
    }

    @Operation(summary = "Lấy skill theo id")
    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getById(@PathVariable Long id) {
        return skillService.getById(id);
    }

}
