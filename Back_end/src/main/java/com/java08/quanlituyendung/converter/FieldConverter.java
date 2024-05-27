package com.java08.quanlituyendung.converter;

import com.java08.quanlituyendung.dto.QuestionPayload.FieldDTO;
import com.java08.quanlituyendung.entity.FieldEnum;
import com.java08.quanlituyendung.entity.QuestionEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class FieldConverter {
    @Autowired
    QuestionConverter questionConverter;
    public FieldDTO toDTO(List<QuestionEntity> questionEntities, FieldEnum fieldEnum) {
        List<QuestionEntity> questions = new ArrayList<>();
        for(QuestionEntity q: questionEntities){
          if(q.getField()!= null && q.getField().equals(fieldEnum) ){
              questions.add(q);
          }
        }
        return FieldDTO.builder()
                .id((long) (fieldEnum.ordinal() + 1))
                .fieldName(fieldEnum.name())
                .questions(questionConverter.toListQuestionDTO(questions))
                .build();

    }
    public List<FieldDTO> toFieldDTOList(List<QuestionEntity> questionEntities) {
        List<FieldDTO> fieldDTOList = new ArrayList<>();
        for (FieldEnum f : FieldEnum.values()) {
            fieldDTOList.add(toDTO(questionEntities, f));

        }
        return fieldDTOList;
    }
}
