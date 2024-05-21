package com.java08.quanlituyendung.dto.InterviewerDTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateAccountInterviewerDTO {
    private String email;
    private String password;
}
