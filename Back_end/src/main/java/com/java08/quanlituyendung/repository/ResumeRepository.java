package com.java08.quanlituyendung.repository;


import com.java08.quanlituyendung.entity.ResumeEntity;
import com.java08.quanlituyendung.entity.UserAccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResumeRepository extends JpaRepository<ResumeEntity, Long> {
    Optional<ResumeEntity> findByUserAccountEntity(UserAccountEntity userAccountEntity);

}
