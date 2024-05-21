package com.java08.quanlituyendung.dto;


import com.java08.quanlituyendung.entity.UserInfoEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthDataResponseDTO {
    private String username;
    private String email;
    private String state;
    private String role;
    private UserInfoEntity userInfo;
}
