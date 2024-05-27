package com.java08.quanlituyendung.service.impl;

import com.java08.quanlituyendung.dto.*;
import com.java08.quanlituyendung.entity.*;
import com.java08.quanlituyendung.repository.OtpRepository;
import com.java08.quanlituyendung.repository.UserAccountRepository;
import com.java08.quanlituyendung.service.IOtpService;
import com.java08.quanlituyendung.utils.Constant;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OtpServiceImpl implements IOtpService {
    private final UserAccountRepository userAccountRepository;
    private final OtpRepository otpRepository;
    private final PasswordEncoder passwordEncoder;
    @Override
    public void saveUserOtp(UserAccountEntity user, String otpCode, OtpType otpType, long expInSeconds) {
        OtpEnum otpEnum = OtpEnum.Disabled;
        if(otpType.equals(OtpType.VERIFY)){
            otpEnum = OtpEnum.Enabled;
        }
        var otp = OtpEntity.builder()
                .user(user)
                .otp(otpCode)
                .otpType(otpType)
                .creationTime(LocalDateTime.now())
                .expiredTime(LocalDateTime.now().plusSeconds(expInSeconds))
                .status(otpEnum)
                .build();
        otpRepository.save(otp);

    }

    @Override
    public void revokeAllUserOtp(UserAccountEntity user, OtpType otpType) {
        var validUserOTPs = otpRepository.findAllValidOtpByUser(user.getId(),otpType);
        if(validUserOTPs.isEmpty()) {
            return;
        }
        validUserOTPs.forEach(otp -> {
            otp.setStatus(OtpEnum.Revoked);
        });
        otpRepository.saveAll(validUserOTPs);
    }
    @Override
    public ResponseEntity<ResponseObject> createNewPassword(ResetPasswordDTO request, String id, String code) {
        try{
            if(request.getPassword().equals(request.getConfirmPassword())){
                Optional<OtpEntity> otpOptional =
                        otpRepository.findValidOtpByUserID(Long.parseLong(id),code,OtpType.RESET_PASSWORD,OtpEnum.Enabled);
                if(otpOptional.isPresent()){
                    OtpEntity otp = otpOptional.get();
                    otp.user.setPassword(passwordEncoder.encode(request.getPassword()));
                    otp.setStatus(OtpEnum.Revoked);
                    otpRepository.save(otp);
                    return ResponseEntity.status(HttpStatus.OK).body(
                            ResponseObject.builder()
                                    .status(HttpStatus.OK.toString())
                                    .message(Constant.SUCCESS)
                                    .build());
                }
                return ResponseEntity.status(HttpStatus.OK).body(
                        ResponseObject.builder()
                                .status(HttpStatus.NOT_FOUND.toString())
                                .message(Constant.INVALID_OTP)
                                .build());
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.BAD_REQUEST.toString())
                            .message("Password not match confirm Password")
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                            .message(Constant.FAIL+":"+e.toString())
                            .build());
        }
    }

    @Override
    public ResponseEntity<ResponseObject> verifyUser(VerificationRequestDTO request, OtpType otpType) {
        try{
            Optional<OtpEntity> otpOptional = otpRepository.
                    findValidOtpByUser(request.getEmail(),request.getOtp(),otpType,OtpEnum.Disabled);
            if(otpOptional.isPresent()){
                OtpEntity otp = otpOptional.get();
                otp.setStatus(OtpEnum.Enabled);
                otpRepository.save(otp);
                return ResponseEntity.status(HttpStatus.OK).body(
                        ResponseObject.builder()
                                .status(HttpStatus.OK.toString())
                                .message(Constant.SUCCESS)
                                .data(ForgotPasswordDTO.builder()
                                        .otp(otp.getOtp())
                                        .userId(otp.user.getId()).build())
                                .build());
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.FORBIDDEN.toString())
                            .message(Constant.INVALID_OTP)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                            .message(Constant.FAIL+":"+e.toString())
                            .build());
        }
    }

}
