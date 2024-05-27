package com.java08.quanlituyendung.repository;

import com.java08.quanlituyendung.entity.InterviewDetailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface InterviewDetailRepository extends JpaRepository<InterviewDetailEntity, Long> {
    Optional<List<InterviewDetailEntity>> findByInterview_Id(Long id);
    List<InterviewDetailEntity>  findByCandidateId(Long id);

}
