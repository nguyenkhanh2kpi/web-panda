package com.java08.quanlituyendung.dto.QuestionPayload;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class PositionDTOResponse {
    private Long id;
    private String positionName;
    //private List<SkillDTO> skills = new ArrayList<>();
}
