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
public class MulQuestionResponseDTO {
    private Long id;
    private String questionText;
    private List<OptionResponseDTO> options;
}
