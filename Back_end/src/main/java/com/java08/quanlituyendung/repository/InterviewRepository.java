package com.java08.quanlituyendung.repository;

import com.java08.quanlituyendung.entity.UserAccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import com.java08.quanlituyendung.entity.InterviewEntity;

import java.util.List;

public interface InterviewRepository extends JpaRepository<InterviewEntity, Long> {
    List<InterviewEntity> findByJobPostingEntityId (Long i);
    List<InterviewEntity> findByInterviewers(UserAccountEntity interviewers);

    List<InterviewEntity> findByUserAccountEntity(UserAccountEntity userAccountEntity);
}

