package com.java08.quanlituyendung.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Entity
@Table(name = "event")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class EventEntity extends BaseEntity {

    @Column(name = "image")
    private String image;

    @Column(name = "name")
    private String name;

    @Column(name = "article")
    private String article;

    @Column(name = "time")
    private String time;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    private boolean status;

    @ManyToOne
    @JoinColumn(name = "author")
    @JsonIgnore
    private UserAccountEntity userAccountEntity;

}
