package com.java08.quanlituyendung.repository;

import com.java08.quanlituyendung.entity.Role;
import com.java08.quanlituyendung.entity.UserAccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface UserAccountRepository extends JpaRepository<UserAccountEntity, Long> {
    Optional<UserAccountEntity> findById(Long id);
    Optional<UserAccountEntity> findByEmail(String email);

    Optional<UserAccountEntity> findByUsername(String username);
    Boolean existsByEmail(String email);
    Boolean existsByUsername(String username);
//    Optional<UserAccountEntity> findByEmailAndOtp(String email,String otp);


    Optional<List<UserAccountEntity>> findByRole(Role role);
    UserAccountEntity findOneById(Long id);

}