package com.java08.quanlituyendung.controller;

import com.java08.quanlituyendung.dto.ChangePasswordDTO;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.dto.UserInfoRequestDTO;
import com.java08.quanlituyendung.service.IUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Tag(name = "User Account")

public class UserAccountController {
    @Autowired
    private IUserService userService;

    @Operation(summary = "Xác minh mật khẩu hiện tại và đổi mật khẩu mới")
    @PutMapping("/password")
    public ResponseEntity<ResponseObject> updatePassword(@RequestBody ChangePasswordDTO changePasswordDTO,
            Authentication authentication) {
        return userService.changePassword(changePasswordDTO, authentication);
    }

    @Operation(summary = "Lấy tất cả User Info trong database")
    @GetMapping
    public ResponseEntity<ResponseObject> getAllUserInfo() {
        return userService.getAllUserInfo();
    }

    @Operation(summary = "Lấy User Info với User ID")
    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getDetailUserInfo(@PathVariable long id) {
        return userService.getDetailUserInfo(id);
    }

    @Operation(summary = "Cập nhật User Info ID")

    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> updateUserInfo(@RequestBody UserInfoRequestDTO dto,@PathVariable long id ){
        return userService.updateUserInfo(dto, id);
    }

    @Operation(summary = "Cập nhật trạng thái Account là Accept")
    @PostMapping("/accept/{id}")
    public ResponseEntity<ResponseObject> acceptCandidate(@PathVariable long id){
        return userService.acceptCandidate(id);
    }


    @Operation(summary = "Cập nhật trạng thái Account là Banned")
    @PostMapping("/ban/{id}")
    public ResponseEntity<ResponseObject> banAccount(@PathVariable long id){
        return userService.banAccount(id);
    }
}
