package com.java08.quanlituyendung.controller;

import com.java08.quanlituyendung.auth.AuthenticationService;
import com.java08.quanlituyendung.dto.*;
import com.java08.quanlituyendung.entity.OtpType;
import com.java08.quanlituyendung.service.IOtpService;
import com.java08.quanlituyendung.service.IUserService;
import com.java08.quanlituyendung.service.impl.OtpServiceImpl;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/recover")
@RequiredArgsConstructor
@Tag(name = "Reset Password")
public class ResetPasswordController {
    private final AuthenticationService authenticationService;
    private final IOtpService otpService;

    @Operation(summary = "Gửi mã OTP đến địa chỉ mail được gửi lên")
    @PostMapping("/send-otp")
    public ResponseEntity<ResponseObject> sendOTP(@RequestBody EmailRequestDTO request ){
        return authenticationService.sendOTP(request.getEmail(),OtpType.RESET_PASSWORD);
    }

    @Operation(summary = "Xác minh mã OTP đã được gửi qua mail")
    @PostMapping("/verify")
    public ResponseEntity<ResponseObject> verifyUser(@RequestBody VerificationRequestDTO request){
        return otpService.verifyUser(request, OtpType.RESET_PASSWORD);
    }

    @Operation(summary = "Đổi mật khẩu mới thông qua User ID, OTP")
    @PutMapping("/password")
    public ResponseEntity<ResponseObject> createNewPassword(
            @RequestBody ResetPasswordDTO request,
            @RequestParam("uid") String id,
            @RequestParam("o") String otp){
        return otpService.createNewPassword(request, id,otp);
    }
}
