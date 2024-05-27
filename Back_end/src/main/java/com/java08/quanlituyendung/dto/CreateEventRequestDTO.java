package com.java08.quanlituyendung.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateEventRequestDTO {
    private String title;
    private String article;
    private String time;
    private String author;
    private boolean status;
    private String image;
    private String content;
}
