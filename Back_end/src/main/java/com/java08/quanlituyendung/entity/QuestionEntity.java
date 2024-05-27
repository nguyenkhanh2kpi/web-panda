package com.java08.quanlituyendung.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "Question")
public class QuestionEntity extends BaseEntity{
    @Column(name = "question")
    private String question;
    @Column(name = "answer")
    private String answer;
    @Column(name = "isDeleted")
    private Boolean isDeleted;
    @Column(name = "createdBy")
    private String createdBy;
    @Temporal(TemporalType.TIMESTAMP)
    public LocalDateTime createTime;
    @Column(name = "field")
    @Enumerated(EnumType.STRING)
    private FieldEnum field;
    @JsonIgnore
    @ManyToMany(mappedBy = "questionEntities")
    private List<PositionEntity> positions = new ArrayList<>();
    @JsonIgnore
    @ManyToMany(mappedBy = "questionEntities")
    private List<SkillEntity> skills = new ArrayList<>();

}
