package com.java08.quanlituyendung.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.json.simple.JSONObject;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CandidateDTO {
    private long id;
    private JSONObject cv;
    private String cvFile;
    private String avatar;
    private String name;
    private String email;
    private  String gender;
    private String phone;
    private  String address;
}
