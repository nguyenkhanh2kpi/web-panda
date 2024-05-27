package com.java08.quanlituyendung.entity.Test;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.type.DateTime;
import com.java08.quanlituyendung.entity.JobPostingEntity;
import com.java08.quanlituyendung.entity.UserAccountEntity;
import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.w3c.dom.Text;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "test_entity")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class TestEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private UserAccountEntity userAccountEntity;


    @JsonIgnore
    @ManyToOne
    private JobPostingEntity jobPostingEntity;

//    private Integer time;

    // them moi
    private String summary;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

    // them tap2
    @ElementCollection
    @CollectionTable(name = "Test_attendees", joinColumns = @JoinColumn(name = "test_id"))
    @Column(name = "attendees")
    private List<String> attendees= new ArrayList<>();


    @JsonIgnore
    @OneToMany(mappedBy = "testEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TestRecordEntity> records = new ArrayList<>();

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "test_id")
    private List<MulQuestionEntity> mulQuestions = new ArrayList<>();


}
