package com.java08.quanlituyendung.repository;

import com.java08.quanlituyendung.entity.Test.TestEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TestRepository extends JpaRepository<TestEntity, Long> {
    Optional<TestEntity> findById(Long id);
    List<TestEntity> findAllByJobPostingEntityId(Long id);


}
