package com.java08.quanlituyendung.entity.vip;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "vip_pack")
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class VipPackReccerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Long price;
    private String des;
    @Column(name = "benefit", columnDefinition = "TEXT")
    private String benefit;
}
