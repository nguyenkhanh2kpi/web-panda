package com.java08.quanlituyendung.converter;


import com.google.api.services.people.v1.model.Person;
import com.java08.quanlituyendung.auth.CustomOAuth2User;
import com.java08.quanlituyendung.auth.LoginGoogleService;
import com.java08.quanlituyendung.dto.AuthDataResponseDTO;
import com.java08.quanlituyendung.dto.CVTemporaryRequestDTO;
import com.java08.quanlituyendung.dto.OAuth2RequestDTO;
import com.java08.quanlituyendung.dto.ProfileUpdateRequestDTO;
import com.java08.quanlituyendung.dto.RegisterRequestDTO;
import com.java08.quanlituyendung.dto.UserAccountPayload.UserAccountCustomResponseDTO;
import com.java08.quanlituyendung.dto.google.GoogleTransferDTO;
import com.java08.quanlituyendung.entity.*;
import com.java08.quanlituyendung.repository.UserAccountRepository;
import com.java08.quanlituyendung.repository.UserInfoRepository;
import com.java08.quanlituyendung.utils.RandomNumberGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.function.Consumer;


@Component
@RequiredArgsConstructor
public class UserAccountConverter {

    private final PasswordEncoder passwordEncoder;
    private final UserAccountRepository userAccountRepository;

    @Autowired
    UserInfoRepository userInfoRepository;

    @Autowired
    LoginGoogleService loginGoogleService;

    public UserAccountEntity toEntity(RegisterRequestDTO registerRequestDTO) {
        UserAccountEntity entity = new UserAccountEntity();
        entity.setEmail(registerRequestDTO.getEmail());
        entity.setPassword(passwordEncoder.encode(registerRequestDTO.getPassword()));
        entity.setUsername(registerRequestDTO.getUsername());
        return entity;
    }
    public ProfileUpdateRequestDTO toDto(UserInfoEntity userInfoEntity){
        ProfileUpdateRequestDTO dto = new ProfileUpdateRequestDTO();
        dto.setFullName(userInfoEntity.getFullName());
        dto.setEmail(userInfoEntity.getUserAccountInfo().getEmail());
        dto.setPhone(userInfoEntity.getPhone());
        dto.setGender(userInfoEntity.getGender());
        dto.setAddress(userInfoEntity.getAddress());
        dto.setDob(userInfoEntity.getDob());
        dto.setCv_pdf(userInfoEntity.getCv_pdf());
        dto.setAvatar(userInfoEntity.getAvatar());
        dto.setLanguage(userInfoEntity.getLanguage());
        dto.setSkill(userInfoEntity.getSkill());
        dto.setExperience(userInfoEntity.getExperience());
        dto.setDescription(userInfoEntity.getDescription());
        return dto;
    }
    public UserInfoEntity toEntity(ProfileUpdateRequestDTO profileUpdateRequest, UserAccountEntity userAccount) {
        UserInfoEntity userInfoEntity = userInfoRepository.findUserInfoEntityByUserAccountInfo(userAccount);
        if (profileUpdateRequest.getFullName() != null) {
            userInfoEntity.setFullName(profileUpdateRequest.getFullName());
        }
        if (profileUpdateRequest.getPhone() != null) {
            userInfoEntity.setPhone(profileUpdateRequest.getPhone());
        }
        if (profileUpdateRequest.getAddress() != null) {
            userInfoEntity.setAddress(profileUpdateRequest.getAddress());
        }
        if(profileUpdateRequest.getGender() != null){
            userInfoEntity.setGender(profileUpdateRequest.getGender());
        }
        if(profileUpdateRequest.getDob() != null){
            userInfoEntity.setDob(profileUpdateRequest.getDob());
        }
        if (profileUpdateRequest.getLanguage() != null) {
            userInfoEntity.setLanguage(profileUpdateRequest.getLanguage());
        }
        if (profileUpdateRequest.getSkill() != null) {
            userInfoEntity.setSkill(profileUpdateRequest.getSkill());
        }
        if (profileUpdateRequest.getExperience() != null) {
            userInfoEntity.setExperience(profileUpdateRequest.getExperience());
        }
        if(profileUpdateRequest.getAvatar() != null){
            userInfoEntity.setAvatar(profileUpdateRequest.getAvatar());
        }
        if(profileUpdateRequest.getCv_pdf() != null){
            userInfoEntity.setCv_pdf(profileUpdateRequest.getCv_pdf());
        }
         if(profileUpdateRequest.getDescription() != null){
            userInfoEntity.setDescription(profileUpdateRequest.getDescription());
        }
        return userInfoEntity;
    }

    public UserInfoEntity toEntity(CVTemporaryRequestDTO profileUpdateRequest, UserAccountEntity userAccount) {
        UserInfoEntity userInfoEntity = userInfoRepository.findUserInfoEntityByUserAccountInfo(userAccount);

        return userInfoEntity;
    }

    public UserInfoEntity toEntityForCreate(Person person, UserAccountEntity userAccount) {
        UserInfoEntity userInfoEntity = userInfoRepository.findUserInfoEntityByUserAccountInfo(userAccount);
        if (person.getNames() != null && !person.getNames().isEmpty()) {
            userInfoEntity.setFullName(person.getNames().get(0).getDisplayName());
        } else {
            userInfoEntity.setFullName(null);
        }
        if (person.getPhotos() != null && !person.getPhotos().isEmpty()) {
            userAccount.getUserInfo().setAvatar(person.getPhotos().get(0).getUrl());
        } else {
            userAccount.getUserInfo().setAvatar(null);
        }
        if (person.getBirthdays() != null && !person.getBirthdays().isEmpty()) {
            userInfoEntity.setDob(person.getBirthdays().get(0).toString());
        } else {
            userInfoEntity.setDob(null);
        }
        if (person.getPhoneNumbers() != null && !person.getPhoneNumbers().isEmpty()) {
            userInfoEntity.setPhone(person.getPhoneNumbers().get(0).toString());
        } else {
            userInfoEntity.setPhone(null);
        }
        if (person.getAddresses() != null && !person.getAddresses().isEmpty()) {
            userInfoEntity.setAddress(person.getAddresses().get(0).toString());
        } else {
            userInfoEntity.setAddress(null);
        }
        userInfoRepository.save(userInfoEntity);
        return userInfoEntity;
    }
    public UserAccountEntity toEntityForUpdate(Person person, UserAccountEntity userAccount) {
        if (person.getNames() != null && !person.getNames().isEmpty()) {
            userAccount.getUserInfo().setFullName(person.getNames().get(0).getDisplayName());
        } else {
            userAccount.getUserInfo().setFullName(null);
        }
        if (person.getPhotos() != null && !person.getPhotos().isEmpty()) {
            userAccount.getUserInfo().setAvatar(person.getPhotos().get(0).getUrl());
        } else {
            userAccount.getUserInfo().setAvatar(null);
        }

        if (person.getBirthdays() != null && !person.getBirthdays().isEmpty()) {
            userAccount.getUserInfo().setDob(person.getBirthdays().get(0).toString());
        } else {
            userAccount.getUserInfo().setDob(null);
        }
        if (person.getPhoneNumbers() != null && !person.getPhoneNumbers().isEmpty()) {
            userAccount.getUserInfo().setPhone(person.getPhoneNumbers().get(0).toString());
        } else {
            userAccount.getUserInfo().setPhone(null);
        }
        if (person.getAddresses() != null && !person.getAddresses().isEmpty()) {
            userAccount.getUserInfo().setAddress(person.getAddresses().get(0).toString());
        } else {
            userAccount.getUserInfo().setAddress(null);
        }
        userAccount.setAuthenticationProvider(AuthenticationProvider.GOOGLE);
        userAccountRepository.save(userAccount);
        return userAccount;
    }

    public UserAccountEntity toEntityWithAuthProvider(Person person, Role roleEnum,
                                                      AuthenticationProvider authenticationProvider) throws IOException {
        UserAccountEntity entity = new UserAccountEntity();
        entity.setUsername(person.getEmailAddresses().get(0).getValue()+"-google");
        entity.setAuthenticationProvider(authenticationProvider);
        entity.setEmail(person.getEmailAddresses().get(0).getValue());

        entity.setCreationTime(LocalDateTime.now());
        entity.setRole(roleEnum);
        entity.setState(UserAccountEntity.State.ACTIVE);
        entity.setStatus(Status.INPROCESS);
        return userAccountRepository.save(entity);
    }
    // convert for local
    public UserAccountEntity toEntityWithRole(RegisterRequestDTO registerRequestDTO, Role roleEnum,
            AuthenticationProvider authenticationProvider) {
        UserAccountEntity entity = new UserAccountEntity();
        entity.setUsername(registerRequestDTO.getUsername());
        entity.setPassword(passwordEncoder.encode(registerRequestDTO.getPassword()));
        entity.setEmail(registerRequestDTO.getEmail());
        entity.setState(UserAccountEntity.State.UNAUTHENTICATED);
        entity.setCreationTime(LocalDateTime.now());
        entity.setRole(roleEnum);
        entity.setAuthenticationProvider(authenticationProvider);
        entity.setStatus(Status.INPROCESS);
        return entity;
    }
    // convert cho register google
    public UserAccountEntity toEntityGoogle(GoogleTransferDTO transferDTO) {
        UserAccountEntity entity = new UserAccountEntity();
        entity.setUsername(transferDTO.getUsername());
        entity.setPassword(passwordEncoder.encode("1234"));
        entity.setEmail(transferDTO.getEmail());
        entity.setState(UserAccountEntity.State.ACTIVE);
        entity.setCreationTime(LocalDateTime.now());
        entity.setRole(Role.CANDIDATE);
        entity.setAuthenticationProvider(AuthenticationProvider.GOOGLE);
        entity.setStatus(Status.INPROCESS);
        return entity;
    }
    public AuthDataResponseDTO toAuthDataResponseDTO(UserAccountEntity userAccountEntity) {
        AuthDataResponseDTO authDataResponseDTO = new AuthDataResponseDTO();
        authDataResponseDTO.setUsername(userAccountEntity.getUsernameReal());
        authDataResponseDTO.setEmail(userAccountEntity.getEmail());
        authDataResponseDTO.setUserInfo(userAccountEntity.getUserInfo());
        authDataResponseDTO.setState(userAccountEntity.getState().toString());
        authDataResponseDTO.setRole(userAccountEntity.getRole().toString());
        return authDataResponseDTO;
    }

    public OAuth2RequestDTO toOAuth2RequestDTO(CustomOAuth2User customOAuth2User) {
        OAuth2RequestDTO oAuth2RequestDTO = new OAuth2RequestDTO();
        oAuth2RequestDTO.setUsername(
                convertToLowerCase(customOAuth2User.getName()) + RandomNumberGenerator.generateSixDigitNumber());
        oAuth2RequestDTO.setEmail(customOAuth2User.getEmail());
        oAuth2RequestDTO.setAvatar(customOAuth2User.getAvatar());
        return oAuth2RequestDTO;
    }

    public static String convertToLowerCase(String input) {
        String convertedString = input.toLowerCase();
        convertedString = convertedString.replaceAll(" ", "_");
        convertedString = removeDiacritics(convertedString).replaceAll("đ", "d");
        return convertedString;
    }

    private static String removeDiacritics(String input) {
        // input = input.replaceAll("Đ", "D");
        String normalizedString = java.text.Normalizer.normalize(input, java.text.Normalizer.Form.NFD);
        return normalizedString.replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
    }


    /// response

    public UserAccountCustomResponseDTO AccountToCustomeResponse(UserAccountEntity userAccount){
        UserAccountCustomResponseDTO responseDTO = new UserAccountCustomResponseDTO();
        responseDTO.setId(userAccount.getId());
        responseDTO.setEmail(userAccount.getEmail());
        responseDTO.setAvatar(userAccount.getUserInfo().getAvatar());
        responseDTO.setFullName(userAccount.getUserInfo().getFullName());
        responseDTO.setUsername(userAccount.getUsernameReal());
        responseDTO.setStatus(userAccount.getStatus().toString());
        return responseDTO;
    }
    private <T> void setFirstNonNullElement(List<T> list, Consumer<T> setter) {
        if (list != null) {
            for (T element : list) {
                if (element != null) {
                    setter.accept(element);
                    return;
                }
            }
        }
        setter.accept(null);
    }
}
