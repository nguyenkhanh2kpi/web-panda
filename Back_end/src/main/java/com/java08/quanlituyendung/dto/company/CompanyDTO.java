package com.java08.quanlituyendung.dto.company;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CompanyDTO {

    private String name;
    private String avatar;
    private String website;
    private String info;
    private String address;
    private String phone;

}
