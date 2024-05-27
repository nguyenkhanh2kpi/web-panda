package com.java08.quanlituyendung.repository;

import com.java08.quanlituyendung.entity.Test.MulQuestionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MulQuestionRepository extends JpaRepository<MulQuestionEntity, Long> {
    Optional<MulQuestionEntity> findById(Long id);



}
