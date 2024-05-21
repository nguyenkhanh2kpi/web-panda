package com.java08.quanlituyendung.dto.QuestionPayload;

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
public class QuestionRequestDTO {
    Long id;
    List<Long> positionIds;
    List<Long> skillIds;
    FieldEnum fieldEnum;
    String question;
    String answer;
}
