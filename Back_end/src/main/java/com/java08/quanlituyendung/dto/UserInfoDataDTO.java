package com.java08.quanlituyendung.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.json.simple.JSONObject;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoDataDTO {
    Long id;
    String name;
    String email;
    String permission;
    String dateRegister;
    String dateBlacklist;
    String accountStatus;
    List <JSONObject> listInterview;
    String avt;
    String username;
    String phone;
    String address;
    String status;
    String skill;
    String experience;
    String cv_pdf;
    List<JSONObject> listJobPosting; 
}
