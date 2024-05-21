package com.java08.quanlituyendung.service;

import com.java08.quanlituyendung.dto.*;
import com.java08.quanlituyendung.entity.UserAccountEntity;
import org.json.simple.parser.ParseException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

public interface IUserService {
    ResponseEntity<ResponseObject> updateProfile(ProfileUpdateRequestDTO request, Authentication authentication);
    ResponseEntity<ResponseObject> getProfile(Authentication authentication) throws ParseException;
    ResponseEntity<ResponseObject> updateUserInfo(UserInfoRequestDTO dto,long id);
    ResponseEntity<ResponseObject> getAllUserInfo();
    ResponseEntity<ResponseObject> getDetailUserInfo(long id);
    ResponseEntity<ResponseObject> createTemporaryCV(CVTemporaryRequestDTO request, Authentication authentication) throws ParseException;
    ResponseEntity<ResponseObject> getTemporaryCV( Authentication authentication)  throws ParseException;
    ResponseEntity<ResponseObject> acceptCandidate(long id);
    public ResponseEntity<ResponseObject> banAccount(long id);
    ResponseEntity<ResponseObject> changePassword(ChangePasswordDTO request, Authentication authentication);

    void createUserInfo(UserAccountEntity userAccountEntity);


}
