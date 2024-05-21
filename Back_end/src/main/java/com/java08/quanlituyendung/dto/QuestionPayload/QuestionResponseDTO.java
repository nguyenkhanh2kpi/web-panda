package com.java08.quanlituyendung.dto.QuestionPayload;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.java08.quanlituyendung.entity.FieldEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class QuestionResponseDTO {
    private Long id;
    private String question;
    private String creatorName;
    private FieldEnum fieldEnum;
    private List<Long> positionIds;
    private List<Long> skillIds;
    private String answer;
}