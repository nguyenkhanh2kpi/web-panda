package com.java08.quanlituyendung.dto;

import org.json.simple.JSONObject;

import com.java08.quanlituyendung.entity.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileUpdateRequestDTO {
    private String fullName;
    //private String username;
    private String email;
    private String phone;
    private Gender gender;
    private String address;
    private String dob;
    private  String cv_pdf;
    private String avatar;
    //cv
    private String language;
    private String skill;
    private String experience;
    private String description;
}
