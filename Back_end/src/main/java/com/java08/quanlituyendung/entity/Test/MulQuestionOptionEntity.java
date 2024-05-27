package com.java08.quanlituyendung.entity.Test;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "mul_question_option")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class MulQuestionOptionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String optionText;
    private boolean isAnswer;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private MulQuestionEntity question;

}