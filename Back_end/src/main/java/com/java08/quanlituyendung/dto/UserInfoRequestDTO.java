package com.java08.quanlituyendung.dto;

import com.java08.quanlituyendung.entity.Gender;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoRequestDTO {
    private String fullName;
    private String email;
    private String phone;
    private String address;
}
