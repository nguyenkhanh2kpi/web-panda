package com.java08.quanlituyendung.repository;

import com.java08.quanlituyendung.entity.UserAccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import com.java08.quanlituyendung.entity.JobPostingEntity;

import java.util.List;
import java.util.Optional;

public interface JobPostingRepository extends JpaRepository<JobPostingEntity, Long>{

    JobPostingEntity findOneById(Long id);

    List<JobPostingEntity> findByUserAccountEntity(UserAccountEntity user);
}
