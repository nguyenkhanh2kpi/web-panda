package com.java08.quanlituyendung.converter;

import com.java08.quanlituyendung.dto.UserInfoDataDTO;
import com.java08.quanlituyendung.dto.UserInfoRequestDTO;
import com.java08.quanlituyendung.entity.UserInfoEntity;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Component;

@Component
public class UserInfoConverter {
    JSONParser parser = new JSONParser();

    public UserInfoDataDTO toDto(UserInfoEntity userInfoEntity) {
        UserInfoDataDTO dto = new UserInfoDataDTO();
        dto.setId(userInfoEntity.getId());
        dto.setAddress(userInfoEntity.getAddress());
        dto.setAvt(userInfoEntity.getAvatar());
        dto.setName(userInfoEntity.getFullName());
        dto.setSkill(userInfoEntity.getSkill());
        dto.setExperience(userInfoEntity.getExperience());
        dto.setPhone(userInfoEntity.getPhone());
        dto.setCv_pdf(userInfoEntity.getCv_pdf());
        return dto;
    }

    public UserInfoEntity toEntity(UserInfoRequestDTO dto, UserInfoEntity entity) {
        if (dto.getFullName() != null) {
            entity.setFullName(dto.getFullName());
        }
        if (dto.getAddress() != null) {
            entity.setAddress(dto.getAddress());
        }
        if (dto.getPhone() != null) {
            entity.setPhone(dto.getPhone());
        }
        return entity;
    }

    public JSONObject toJson(UserInfoEntity userInfoEntity) {
        JSONObject obj = new JSONObject();
        obj.put("userId", userInfoEntity.getId());
        obj.put("fullName", userInfoEntity.getFullName());
        obj.put("avatar", userInfoEntity.getAvatar());
        obj.put("gender", userInfoEntity.getGender());
        obj.put("phone", userInfoEntity.getPhone());
        obj.put("address", userInfoEntity.getAddress());
        obj.put("language", userInfoEntity.getLanguage());
        obj.put("skill", userInfoEntity.getSkill());
        obj.put("experience", userInfoEntity.getExperience());
        obj.put("description", userInfoEntity.getDescription());
        return obj;
    }

}
