package com.java08.quanlituyendung.dto.QuestionPayload;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class FieldDTO{
    private Long id;
    @NotBlank(message = "Field Not Blank")
    private String fieldName;
    private List<QuestionResponseDTO> questions = new ArrayList<>();

}
