package com.java08.quanlituyendung.controller;

import com.java08.quanlituyendung.auth.AuthenticationService;
import com.java08.quanlituyendung.dto.*;
import com.java08.quanlituyendung.dto.InterviewerDTO.CreateAccountInterviewerDTO;
import com.java08.quanlituyendung.dto.google.LoginGoogleFormDTO;
import com.java08.quanlituyendung.entity.AuthenticationProvider;
import com.java08.quanlituyendung.entity.OtpType;
import com.java08.quanlituyendung.entity.Role;
import com.java08.quanlituyendung.service.IInterviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.security.GeneralSecurityException;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "//localhost:3000/")
@Tag(name = "Auth")
public class AuthController {

    private final AuthenticationService authenticationService;

    private final IInterviewService iInterviewService;
    @CrossOrigin(origins = "//localhost:3000/")

//    @Operation(summary = "Sử dụng phương thức này để đăng nhập bằng tài khoản google")
//    @PostMapping("/google/login")
//    public ResponseEntity<AuthenticationResponseDTO> loginGoogle(@RequestBody GoogleRequestDTO requestDTO){
//        return authenticationService.saveOrUpdateUser(requestDTO,Role.CANDIDATE,AuthenticationProvider.GOOGLE);
//    }
    @Operation(summary = "Sử dụng phương thức này để gửi mã otp về gmail")
    @PostMapping("/send-otp")
    public ResponseEntity<ResponseObject> sendOTP(@RequestBody EmailRequestDTO request){
        return authenticationService.sendOTP(request.getEmail(), OtpType.VERIFY);
    }
    @Operation(summary = "Sử dụng phương thức này để xác thực tài khoản thông qua mã otp nhận được từ gmail")
    @PostMapping("/verify")
    public ResponseEntity<AuthenticationResponseDTO> verifyUser(@RequestBody VerificationRequestDTO request){
        return authenticationService.verifyUser(request);
    }
    @Operation(summary = "Sử dụng phương thức này để đăng ký tài khoản")
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponseDTO> register(@RequestBody RegisterRequestDTO request) {
        return authenticationService.register(request, Role.CANDIDATE, AuthenticationProvider.LOCAL);
    }

    @Operation(summary = "Sử dụng phương thức này để đăng nhập")
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDTO> authenticate(@RequestBody AuthenticationRequestDTO request) {
        return authenticationService.authenticate(request);
    }

    @Operation(summary = "Sử dụng phương thức này để đăng nhập")
    @PostMapping("/login-google")
    public ResponseEntity<AuthenticationResponseDTO> loginGoogle(@RequestBody LoginGoogleFormDTO request) throws GeneralSecurityException, IOException {
        return authenticationService.loginGoogle(request);
    }

    @Operation(summary = "Sử dụng phương thức này để tạo mới access token")
    @PostMapping("/refresh-token")
    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        authenticationService.refreshToken(request, response);
    }
    @ExceptionHandler(BindException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)  // Nếu validate fail thì trả về 400
    public String handleBindException(BindException e) {
        // Trả về message của lỗi đầu tiên
        String errorMessage = "Request không hợp lệ";
        if (e.getBindingResult().hasErrors())
            e.getBindingResult().getAllErrors().get(0).getDefaultMessage();
        return errorMessage;
    }
}
