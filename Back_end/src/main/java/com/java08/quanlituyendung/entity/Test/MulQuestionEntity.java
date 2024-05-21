package com.java08.quanlituyendung.entity.Test;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "mul_question")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class MulQuestionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String questionText;

    @ManyToOne
    @JoinColumn(name = "test_id")
    private TestEntity test;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MulQuestionOptionEntity> options = new ArrayList<>();



}