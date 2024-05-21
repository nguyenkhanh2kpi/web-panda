package com.java08.quanlituyendung.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OAuth2RequestDTO {
    private String username;
    private String email;
    private String avatar;
}
