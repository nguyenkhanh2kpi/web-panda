package com.java08.quanlituyendung.controller;

import com.java08.quanlituyendung.dto.CVTemporaryRequestDTO;
import com.java08.quanlituyendung.dto.ProfileUpdateRequestDTO;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.service.IFileUploadService;
import com.java08.quanlituyendung.service.IUserService;
import io.swagger.v3.oas.annotations.tags.Tag;

import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;

import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
@Tag(name = "Profile")
public class ProfileController {
    @Autowired
    private IUserService userService;
    private final IFileUploadService fileUploadService;

    @Operation(summary = "Lấy Profile của tài khoản đang đăng nhập")
    @GetMapping
    public ResponseEntity<ResponseObject> getProfile(Authentication authentication) throws ParseException{
        return userService.getProfile(authentication);
    }

    @Operation(summary = "API dùng để upload file CV cho tài khoản đang đăng nhập")
    @PostMapping("/upload/cv")
    public ResponseEntity<ResponseObject> uploadCV(@RequestParam("file") MultipartFile file, Authentication authentication) {
        try {
            String fileUrl = fileUploadService.uploadFile(file);
            ProfileUpdateRequestDTO profileUpdateRequestDTO = new ProfileUpdateRequestDTO();
            profileUpdateRequestDTO.setCv_pdf(fileUrl);
            return userService.updateProfile(profileUpdateRequestDTO ,authentication);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "API dùng để upload ảnh avatar cho tài khoản đang đăng nhập")
    @PostMapping("/upload/avatar")
    public ResponseEntity<ResponseObject> uploadAvatar(@RequestParam("file") MultipartFile file, Authentication authentication) {
        try {
            String fileUrl = fileUploadService.uploadFile(file);
            ProfileUpdateRequestDTO profileUpdateRequestDTO = new ProfileUpdateRequestDTO();
            profileUpdateRequestDTO.setAvatar(fileUrl);
            return userService.updateProfile(profileUpdateRequestDTO ,authentication);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Operation(summary = "Cập nhật thông tin tài khoản của tài khoản đang đăng nhập")
    @PutMapping
    public ResponseEntity<ResponseObject> update(@RequestBody ProfileUpdateRequestDTO profileUpdateRequestDTO, Authentication authentication) {
                return userService.updateProfile(profileUpdateRequestDTO,authentication);
    }

    @Operation(summary = "Cập nhật CV nháp tạm thời, nếu Account đang có 1 bản nháp thì cập nhật vào bản đó")
    @PutMapping("/temp-cv")
    public ResponseEntity<ResponseObject> CVTemporary(@RequestBody CVTemporaryRequestDTO cvTemporaryRequestDTO, Authentication authentication) throws ParseException{
                return userService.createTemporaryCV(cvTemporaryRequestDTO,authentication);
    }

    @Operation(summary = "Lấy CV nháp của Account nếu có")
    @GetMapping("/temp-cv")
    public ResponseEntity<ResponseObject> CVTemporary(Authentication authentication) throws ParseException {
                return userService.getTemporaryCV(authentication);
    }
}
