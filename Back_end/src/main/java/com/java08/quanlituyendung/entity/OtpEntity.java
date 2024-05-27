package com.java08.quanlituyendung.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Otp")
public class OtpEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String otp;
    @Enumerated(EnumType.STRING)
    public OtpType otpType = OtpType.VERIFY;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private OtpEnum status;

    @Temporal(TemporalType.TIMESTAMP)
    public LocalDateTime expiredTime;

    @Temporal(TemporalType.TIMESTAMP)
    LocalDateTime creationTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    public UserAccountEntity user;
}
