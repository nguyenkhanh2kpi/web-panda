package com.java08.quanlituyendung.repository;

import com.java08.quanlituyendung.entity.Test.MulQuestionOptionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MulOptionRepository extends JpaRepository<MulQuestionOptionEntity, Long> {
}
