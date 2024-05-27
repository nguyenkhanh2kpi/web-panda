package com.java08.quanlituyendung.dto.InterviewerDTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResponseCreateAcountInterviewDTO {
    private String email;
    private String password;
    private String reccer;
}
