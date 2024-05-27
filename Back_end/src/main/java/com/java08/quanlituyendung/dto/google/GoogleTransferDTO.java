package com.java08.quanlituyendung.dto.google;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GoogleTransferDTO {
    private String username;
    private String email;
    private String avatar;
    private String phone;
    private String address;
    private String birthDay;
    private String gender;
}
