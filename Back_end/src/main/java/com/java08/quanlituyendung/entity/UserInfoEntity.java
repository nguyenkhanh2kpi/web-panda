package com.java08.quanlituyendung.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "UserInfo")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoEntity extends BaseEntity {

    @Column(name = "fullName")
    private String fullName;
    @Column(name = "gender")
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(name = "dob")
    private String dob;
    @Column(name = "address")
    private String address;
    @Column(name = "avatar", columnDefinition = "text")
    private String avatar;
    @Column(name = "phone")
    private String phone;
    @Column(name = "cv_pdf", columnDefinition = "text")
    private String cv_pdf;
    // cv
    @Column(name = "language")
    private String language;
    @Column(name = "skill")
    private String skill;
    @Column(name = "experience")
    private String experience;
    @Column(name = "description")
    private String description;

    @OneToOne(cascade = CascadeType.ALL)
    @MapsId
    @JoinColumn(name = "accountId")
    @JsonIgnore
    private UserAccountEntity userAccountInfo;
}
