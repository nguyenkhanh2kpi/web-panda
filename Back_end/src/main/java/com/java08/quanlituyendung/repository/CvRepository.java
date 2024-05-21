package com.java08.quanlituyendung.repository;

import com.java08.quanlituyendung.entity.CVEntity;
import com.java08.quanlituyendung.entity.JobPostingEntity;
import com.java08.quanlituyendung.entity.UserAccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CvRepository extends JpaRepository<CVEntity, Long> {


    List<CVEntity> findAllByJobPostingEntityId(long id);

    List<CVEntity> findAllByUserAccountEntityId(long id);

}
