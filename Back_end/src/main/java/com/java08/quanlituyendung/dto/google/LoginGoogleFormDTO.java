package com.java08.quanlituyendung.dto.google;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginGoogleFormDTO {
    private String googleToken;
    private String tokenId;
}
