package com.java08.quanlituyendung.dto.test;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AddQuestionDTO {
    private String questionText;
    private Long jdId;
    private Long testId;
    private List<AddQuesitonOptionDTO> options;
}
