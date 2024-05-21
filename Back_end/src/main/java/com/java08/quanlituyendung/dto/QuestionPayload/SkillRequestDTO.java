package com.java08.quanlituyendung.dto.QuestionPayload;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SkillRequestDTO {
    long id;
    String skillName;
}
