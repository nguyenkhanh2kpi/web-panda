package com.java08.quanlituyendung.repository;

import com.java08.quanlituyendung.entity.OtpEntity;
import com.java08.quanlituyendung.entity.OtpEnum;
import com.java08.quanlituyendung.entity.OtpType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OtpRepository extends JpaRepository<OtpEntity,Long> {
    @Query(value = """
          select o from OtpEntity o
          where o.user.id = :id and (o.expiredTime >= CURRENT_TIMESTAMP and o.status <>'Revoked' and o.otpType =:otpType)
          
    """)
    List<OtpEntity> findAllValidOtpByUser(Long id, OtpType otpType);

    @Query(value = """
          select o from OtpEntity o  where o.user.email = :email and 
          (o.expiredTime >= CURRENT_TIMESTAMP and o.status =:otpEnum and o.otpType =:otpType and o.otp=:otp)
    """)
    Optional<OtpEntity> findValidOtpByUser(String email, String otp, OtpType otpType, OtpEnum otpEnum);
    @Query(value = """
          select o from OtpEntity o  where o.user.id = :id and 
          (o.expiredTime >= CURRENT_TIMESTAMP and o.status = :otpEnum and o.otpType =:otpType and o.otp=:otp)
    """)
    Optional<OtpEntity> findValidOtpByUserID(Long id, String otp, OtpType otpType, OtpEnum otpEnum);
}
