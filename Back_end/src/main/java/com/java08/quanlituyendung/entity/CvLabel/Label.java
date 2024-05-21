package com.java08.quanlituyendung.entity.CvLabel;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "label")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Label {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private String name;
    private String color;

}
