package com.java08.quanlituyendung.dto.Resume;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkProjectDTO {
    private Long id;
    private String nameProject;
    private String startTime;
    private String endTime;
    private String client;
    private String description;
    private String members;
    private String position;
    private String responsibilities;
    private String technology;

}
