package com.java08.quanlituyendung.dto.MessageDTO;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatInfo {
    private String chatID;
    private String accessKey;
}
