package com.java08.quanlituyendung.repository;

import com.java08.quanlituyendung.entity.CompanyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CompanyRepository extends JpaRepository<CompanyEntity, Long> {
    Optional<CompanyEntity> findByUserId(Long aLong);
}
