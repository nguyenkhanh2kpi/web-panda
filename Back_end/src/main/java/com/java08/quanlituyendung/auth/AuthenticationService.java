package com.java08.quanlituyendung.auth;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.services.people.v1.model.Person;
import com.java08.quanlituyendung.calendar.CalendarGoogleService;
import com.java08.quanlituyendung.converter.UserAccountConverter;
import com.java08.quanlituyendung.dto.*;
import com.java08.quanlituyendung.dto.google.GoogleTransferDTO;
import com.java08.quanlituyendung.dto.google.LoginGoogleFormDTO;
import com.java08.quanlituyendung.entity.*;
import com.java08.quanlituyendung.jwt.JwtService;
import com.java08.quanlituyendung.repository.OtpRepository;
import com.java08.quanlituyendung.repository.UserAccountRepository;
import com.java08.quanlituyendung.repository.UserInfoRepository;
import com.java08.quanlituyendung.service.IMailService;
import com.java08.quanlituyendung.service.ITokenService;
import com.java08.quanlituyendung.service.impl.MailServerService;
import com.java08.quanlituyendung.service.impl.OtpServiceImpl;
import com.java08.quanlituyendung.utils.Constant;
import com.java08.quanlituyendung.utils.RandomNumberGenerator;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.security.GeneralSecurityException;
import java.util.Optional;

@Service
public class AuthenticationService {
    private final UserAccountRepository userAccountRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final ITokenService tokenService;
    private final UserAccountConverter userAccountConverter;
    private final IMailService mailService;
    private final UserInfoRepository userInfoRepository;
    private final OtpServiceImpl otpService;
    private final OtpRepository otpRepository;
    private final UserAccountRepository userRepository;

    private final MailServerService mailServerService;


    @Autowired
    private LoginGoogleService loginGoogleService;

    @Autowired
    private CalendarGoogleService calendarGoogleService;

    @Autowired
    public AuthenticationService(UserAccountRepository userAccountRepository, JwtService jwtService, AuthenticationManager authenticationManager, ITokenService tokenService, UserAccountConverter userAccountConverter, IMailService mailService, UserInfoRepository userInfoRepository, OtpServiceImpl otpService, OtpRepository otpRepository, UserAccountRepository userRepository, MailServerService mailServerService) {
        this.userAccountRepository = userAccountRepository;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
        this.userAccountConverter = userAccountConverter;
        this.mailService = mailService;
        this.userInfoRepository = userInfoRepository;
        this.otpService = otpService;
        this.otpRepository = otpRepository;
        this.userRepository = userRepository;
        this.mailServerService = mailServerService;
    }

    public ResponseEntity<ResponseObject> sendOTP(String mail, OtpType otpType) {
        try {
            Optional<UserAccountEntity> userAccountOptional = userRepository.findByEmail(mail);
            if (userAccountOptional.isPresent()) {
                UserAccountEntity user = userAccountOptional.get();
                var otp_code = RandomNumberGenerator.generateSixDigitNumber();
                // send mail;
                if (otpType.equals(OtpType.VERIFY)) {
                    mailServerService.sendEmail1(user.getEmail(), otp_code,EmailType.VERIFICATION);
//                    mailService.sendEmail(user.getEmail(), otp_code, EmailType.VERIFICATION);
                } else {
                    mailServerService.sendEmail1(user.getEmail(), otp_code,EmailType.RESET_PASSWORD);
//                    mailService.sendEmail(user.getEmail(), otp_code, EmailType.RESET_PASSWORD);
                }
                // check deliverable mail
//                if(!mailService.isDeliverableMail(user.getEmail())){
//                    return ResponseEntity.status(HttpStatus.OK).body(
//                                    ResponseObject.builder()
//                                    .status(HttpStatus.NOT_FOUND.toString())
//                                    .message(Constant.MAIL_FAIL)
//                                    .build());
//                    }
                otpService.revokeAllUserOtp(user, otpType);
                otpService.saveUserOtp(user, otp_code, otpType, 320);
                return ResponseEntity.status(HttpStatus.OK).body(
                        ResponseObject.builder()
                                .status(HttpStatus.OK.toString())
                                .message(Constant.SUCCESS)
                                .build());
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.NOT_FOUND.toString())
                            .message(Constant.MAIL_NOT_MATCH)
                            .build());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.status(HttpStatus.OK).body(
                    ResponseObject.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                            .message(Constant.FAIL)
                            .build());
        }
    }

    public ResponseEntity<AuthenticationResponseDTO> verifyUser(VerificationRequestDTO request) {
        try {
            Optional<UserAccountEntity> userOptional = userRepository.
                    findByEmail(request.getEmail());
            if (userOptional.isPresent()) {
                UserAccountEntity user = userOptional.get();
                Optional<OtpEntity> otpOptional =
                        otpRepository.findValidOtpByUser(user.getEmail(), request.getOtp(), OtpType.VERIFY, OtpEnum.Enabled);
                if (otpOptional.isPresent()) {
                    OtpEntity otp = otpOptional.get();
                    otpService.revokeAllUserOtp(user, OtpType.VERIFY);
                    otp.getUser().setState(UserAccountEntity.State.ACTIVE);
                    otp.getUser().setStatus(Status.INPROCESS);
                    otpRepository.save(otp);
                    return ResponseEntity.status(HttpStatus.OK).body(
                            AuthenticationResponseDTO.builder()
                                    .status(HttpStatus.OK.toString())
                                    .message(Constant.SUCCESS_VERIFY)
                                    .data(userAccountConverter.toAuthDataResponseDTO(user))
                                    .build());
                } else {
                    return ResponseEntity.status(HttpStatus.OK).body(
                            AuthenticationResponseDTO.builder()
                                    .status(HttpStatus.BAD_REQUEST.toString())
                                    .message(Constant.INVALID_OTP)
                                    .build());
                }
            }
            return ResponseEntity.status(HttpStatus.OK).body(
                    AuthenticationResponseDTO.builder()
                            .status(HttpStatus.NOT_FOUND.toString())
                            .message(Constant.MAIL_NOT_MATCH)
                            .build());

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    AuthenticationResponseDTO.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                            .message(Constant.FAIL + ":" + e)
                            .build());
        }
    }

    public ResponseEntity<AuthenticationResponseDTO> saveOrUpdateUser(GoogleRequestDTO requestDTO, Role role, AuthenticationProvider authenticationProvider) {
        try {
            final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
            Credential credential = loginGoogleService.getCredentialsFromAccessToken(HTTP_TRANSPORT, requestDTO.getToken());
            Person person = loginGoogleService.getUserInfo(credential);
            Optional<UserAccountEntity> userOptional = userRepository.
                    findByEmail(person.getEmailAddresses().get(0).getValue());
            if (userOptional.isPresent()) {
                var user = userOptional.get();
                var jwtToken = jwtService.generateToken(user);
                var refreshToken = jwtService.generateRefreshToken(user);

                tokenService.revokeAllUserToken(user);
                tokenService.saveUserToken(user, refreshToken);
                userAccountRepository.save(userAccountConverter.toEntityForUpdate(person, user));
                return ResponseEntity.status(HttpStatus.OK).body(
                        AuthenticationResponseDTO.builder()
                                .data(userAccountConverter.toAuthDataResponseDTO(user))
                                .status(HttpStatus.OK.toString())
                                .message(Constant.SUCCESS_LOGIN)
                                .accessToken(jwtToken)
                                .refreshToken(refreshToken)
                                .build());

            }
            var user = userAccountConverter.toEntityWithAuthProvider(person, role, authenticationProvider);
            var savedUser = userRepository.save(user);
            //tạo userInfo
            var userInfo = createUserInfo(user);
            user.setUserInfo(userInfo);
            // cập nhật userInfo, tạm thời chỉ thêm avt từ google account
            userInfoRepository.save(userAccountConverter.toEntityForCreate(person, user));

            var jwtToken = jwtService.generateToken(user);
            var refreshToken = jwtService.generateRefreshToken(user);

            tokenService.revokeAllUserToken(user);
            tokenService.saveUserToken(user, refreshToken);

            return ResponseEntity.status(HttpStatus.OK).body(
                    AuthenticationResponseDTO.builder()
                            .status(HttpStatus.CREATED.toString())
                            .message(Constant.SUCCESS_LOGIN)
                            .data(userAccountConverter.toAuthDataResponseDTO(savedUser))
                            .accessToken(jwtToken)
                            .refreshToken(refreshToken)
                            .build());


        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    AuthenticationResponseDTO.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                            .message("Error" + ":" + e)
                            .build());
        }
    }

    public ResponseEntity<AuthenticationResponseDTO> register(RegisterRequestDTO request, Role role, AuthenticationProvider authenticationProvider) {
        try {
            if (request.getEmail().isEmpty()) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        AuthenticationResponseDTO.builder()
                                .status(HttpStatus.BAD_REQUEST.toString())
                                .message(Constant.REGISTER_FAIL + ": Missing Email!")
                                .build());
            }
            if (request.getPassword().isEmpty()) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        AuthenticationResponseDTO.builder()
                                .status(HttpStatus.BAD_REQUEST.toString())
                                .message(Constant.REGISTER_FAIL + ": Missing Password!")
                                .build());
            }
            if (request.getUsername().isEmpty()) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        AuthenticationResponseDTO.builder()
                                .status(HttpStatus.BAD_REQUEST.toString())
                                .message(Constant.REGISTER_FAIL + ": Missing Username!")
                                .build());
            }
            if (userAccountRepository.existsByEmail(request.getEmail())) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        AuthenticationResponseDTO.builder()
                                .status(HttpStatus.CONFLICT.toString())
                                .message(Constant.EMAIL_EXISTED)
                                .build());
            }
            if (userAccountRepository.existsByUsername(request.getUsername())) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        AuthenticationResponseDTO.builder()
                                .status(HttpStatus.CONFLICT.toString())
                                .message(Constant.USERNAME_IS_EXIST)
                                .build());
            }
            var user = userAccountConverter.toEntityWithRole(request, role, authenticationProvider);
            var otpCode = RandomNumberGenerator.generateSixDigitNumber();

            //send mail @Async;
//            mailService.sendEmail(user.getEmail(), otpCode, EmailType.VERIFICATION);
            mailServerService.sendEmail1(user.getEmail(), otpCode,EmailType.VERIFICATION);

            // check deliverable mail;
//            if (!mailService.isDeliverableMail(user.getEmail())) {
//                return ResponseEntity.status(HttpStatus.OK).body(
//                        AuthenticationResponseDTO.builder()
//                                .status(HttpStatus.BAD_REQUEST.toString())
//                                .message(Constant.MAIL_FAIL)
//                                .build());
//            }
            var savedUser = userAccountRepository.save(user);
            otpService.saveUserOtp(savedUser, otpCode, OtpType.VERIFY, 320);
            createUserInfo(user);
            return ResponseEntity.status(HttpStatus.OK).body(
                    AuthenticationResponseDTO.builder()
                            .status(HttpStatus.CREATED.toString())
                            .message(Constant.SUCCESS_REGISTER)
                            .data(userAccountConverter.toAuthDataResponseDTO(user))
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    AuthenticationResponseDTO.builder()
                            .status(HttpStatus.INTERNAL_SERVER_ERROR.toString())
                            .message(Constant.REGISTER_FAIL + ":" + e)
                            .build());
        }
    }


    public ResponseEntity<AuthenticationResponseDTO> authenticate(AuthenticationRequestDTO request) {
        try {
            Optional<UserAccountEntity> userOptional = userRepository.
                    findByEmail(request.getEmail());
            if (userOptional.get().getAuthenticationProvider() == AuthenticationProvider.GOOGLE) {
                return ResponseEntity.status(HttpStatus.OK).body(
                        AuthenticationResponseDTO.builder()
                                .status(HttpStatus.NOT_ACCEPTABLE.toString())
                                .message(Constant.ACCOUNT_WRONG_PROVIDER)
                                .build());
            }
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            var user = userAccountRepository.findByEmail(request.getEmail()).orElseThrow();
            if (user.getState() != UserAccountEntity.State.ACTIVE) {
                return ResponseEntity.ok(
                        AuthenticationResponseDTO.builder()
                                .status(HttpStatus.NOT_ACCEPTABLE.toString())
                                .message(Constant.YOUR_ACCOUNT_IS_NOT_ACTIVE)
                                .build());
            }
            var jwtToken = jwtService.generateToken(user);
            var refreshToken = jwtService.generateRefreshToken(user);

            tokenService.revokeAllUserToken(user);
            tokenService.saveUserToken(user, refreshToken);

            return ResponseEntity.status(HttpStatus.OK).body(
                    AuthenticationResponseDTO.builder()
                            .status(HttpStatus.OK.toString())
                            .message(Constant.SUCCESS_LOGIN)
                            .data(userAccountConverter.toAuthDataResponseDTO(user))
                            .accessToken(jwtToken)
                            .refreshToken(refreshToken)
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.OK).body(
                    AuthenticationResponseDTO.builder()
                            .status(HttpStatus.UNAUTHORIZED.toString())
                            .message(Constant.EMAIL_OR_PASSWORD_NOTMATCH)
                            .build());
        }
    }


    public void refreshToken(HttpServletRequest request, HttpServletResponse response) throws IOException {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtService.extractUsername(refreshToken);

        if (userEmail != null && tokenService.isTokenAlive(refreshToken)) {
            UserAccountEntity user = this.userAccountRepository.findByEmail(userEmail).orElseThrow();
            if (jwtService.isTokenValid(refreshToken, user)) {
                String accessToken = jwtService.generateToken(user);

                AuthenticationResponseDTO authResponse = AuthenticationResponseDTO.builder()
                        .message(Constant.REFRESH_TOKEN_SUCCESS)
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .build();
                writeJsonResponse(response, authResponse);
            }
        } else {
            AuthenticationResponseDTO authResponse = AuthenticationResponseDTO.builder()
                    .message(Constant.TOKEN_IS_REVOKED)
                    .build();
            writeJsonResponse(response, authResponse);
        }
    }


    private void writeJsonResponse(HttpServletResponse response, Object responseObject) throws IOException {
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setCharacterEncoding(StandardCharsets.UTF_8.toString());
        try (PrintWriter writer = response.getWriter()) {
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.writeValue(writer, responseObject);
        }
    }

    private UserInfoEntity createUserInfo(UserAccountEntity userAccountEntity) {
        return userInfoRepository.save(UserInfoEntity.builder()
                .userAccountInfo(userAccountEntity)
                .avatar("https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-1/341056611_561940302586852_3051668306992785039_n.jpg?stp=dst-jpg_p200x200&_nc_cat=107&ccb=1-7&_nc_sid=7206a8&_nc_ohc=V6sB0rsKOe8AX-poMo4&_nc_ht=scontent.fsgn2-3.fna&oh=00_AfCAQLo2iz1n9QTMggikNtakCcEN6Iq9_q3_65qAWEVavw&oe=64CFDE44")
                .build());
    }

    private UserInfoEntity createUserInfoWithGoogle(UserAccountEntity userAccountEntity, GoogleTransferDTO transferDTO) {
        return userInfoRepository.save(UserInfoEntity.builder()
                .userAccountInfo(userAccountEntity)
                .fullName(transferDTO.getUsername())
                .avatar(transferDTO.getAvatar())
                .phone(transferDTO.getPhone())
                .dob(transferDTO.getBirthDay())
                .address(transferDTO.getAddress())
                .build());
    }


    public ResponseEntity<AuthenticationResponseDTO> loginGoogle(LoginGoogleFormDTO request) throws GeneralSecurityException, IOException {
        GoogleTransferDTO transferDTO = calendarGoogleService.getEmailFromToken(request.getGoogleToken());

        Optional<UserAccountEntity> user = userRepository.findByEmail(transferDTO.getEmail());
        if (user.isPresent()) {
            var jwtToken = jwtService.generateToken(user.get());
            var refreshToken = jwtService.generateRefreshToken(user.get());
            tokenService.revokeAllUserToken(user.get());
            tokenService.saveUserToken(user.get(), refreshToken);
            return ResponseEntity.status(HttpStatus.OK).body(
                    AuthenticationResponseDTO.builder()
                            .status(HttpStatus.OK.toString())
                            .message(Constant.SUCCESS_LOGIN)
                            .data(userAccountConverter.toAuthDataResponseDTO(user.get()))
                            .accessToken(jwtToken)
                            .refreshToken(refreshToken)
                            .build());
        } else {
            var newUser = userAccountConverter.toEntityGoogle(transferDTO);
            var savedUser = userAccountRepository.save(newUser);
            createUserInfoWithGoogle(newUser, transferDTO);
            var jwtToken = jwtService.generateToken(newUser);
            var refreshToken = jwtService.generateRefreshToken(newUser);
            tokenService.revokeAllUserToken(newUser);
            tokenService.saveUserToken(newUser, refreshToken);
            return ResponseEntity.status(HttpStatus.OK).body(
                    AuthenticationResponseDTO.builder()
                            .status(HttpStatus.CREATED.toString())
                            .message(Constant.SUCCESS_REGISTER)
                            .accessToken(jwtToken)
                            .data(userAccountConverter.toAuthDataResponseDTO(savedUser))
                            .build());
        }
    }
}
