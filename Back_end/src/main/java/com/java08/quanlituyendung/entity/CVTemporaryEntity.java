package com.java08.quanlituyendung.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cvTemporary")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CVTemporaryEntity extends BaseEntity {
    @Column(name = "cv",columnDefinition = "text")
    private String cv;

    @OneToOne(cascade = CascadeType.ALL)
    @MapsId
    @JsonIgnore
    private UserAccountEntity userAccount;


}
