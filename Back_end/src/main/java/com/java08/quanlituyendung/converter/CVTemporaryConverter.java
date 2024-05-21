package com.java08.quanlituyendung.converter;

import com.java08.quanlituyendung.auth.CustomOAuth2User;
import com.java08.quanlituyendung.dto.AuthDataResponseDTO;
import com.java08.quanlituyendung.dto.CVTemporaryRequestDTO;
import com.java08.quanlituyendung.dto.CVTemporaryResponseDTO;
import com.java08.quanlituyendung.dto.OAuth2RequestDTO;
import com.java08.quanlituyendung.dto.ProfileUpdateRequestDTO;
import com.java08.quanlituyendung.dto.RegisterRequestDTO;
import com.java08.quanlituyendung.dto.UserAccountPayload.UserAccountCustomResponseDTO;
import com.java08.quanlituyendung.entity.AuthenticationProvider;
import com.java08.quanlituyendung.entity.CVTemporaryEntity;
import com.java08.quanlituyendung.entity.Role;
import com.java08.quanlituyendung.entity.UserAccountEntity;
import com.java08.quanlituyendung.entity.UserInfoEntity;
import com.java08.quanlituyendung.repository.UserAccountRepository;
import com.java08.quanlituyendung.repository.UserInfoRepository;
import com.java08.quanlituyendung.utils.RandomNumberGenerator;
import lombok.RequiredArgsConstructor;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class CVTemporaryConverter {
    public CVTemporaryEntity toEntity(CVTemporaryRequestDTO cvTemporaryRequestDTO) {
        if(cvTemporaryRequestDTO==null){
            return null;
        }
        CVTemporaryEntity cvTemporaryEntity = new CVTemporaryEntity();
        cvTemporaryEntity.setCv(cvTemporaryRequestDTO.getCv().toString());
        return cvTemporaryEntity;

    }

    public CVTemporaryResponseDTO toDto(CVTemporaryEntity cvTemporaryEntity) throws ParseException {
        if(cvTemporaryEntity==null){
            return null;
        }
        CVTemporaryResponseDTO cvTemporaryResponseDTO = new CVTemporaryResponseDTO();
        cvTemporaryResponseDTO.setId(cvTemporaryEntity.getId());
        JSONParser parser = new JSONParser();
        JSONObject cvObj = (JSONObject) parser.parse(cvTemporaryEntity.getCv());
        cvTemporaryResponseDTO.setCv(cvObj);
        return cvTemporaryResponseDTO;
    }
}
