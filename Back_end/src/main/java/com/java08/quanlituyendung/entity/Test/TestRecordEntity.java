package com.java08.quanlituyendung.entity.Test;


import com.java08.quanlituyendung.entity.UserAccountEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "test_record")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class TestRecordEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    private UserAccountEntity userAccountEntity;

    @ManyToOne
    private TestEntity testEntity;

    private Double score;

    @Column(name = "record", columnDefinition = "TEXT")
    private String record;

}
