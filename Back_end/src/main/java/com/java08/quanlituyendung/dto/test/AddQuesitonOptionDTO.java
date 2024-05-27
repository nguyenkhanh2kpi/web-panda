package com.java08.quanlituyendung.dto.test;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class AddQuesitonOptionDTO {
//    private Long testId;
//    private Long questionId;
    private String optionText;
    private boolean isAnswer;

}
