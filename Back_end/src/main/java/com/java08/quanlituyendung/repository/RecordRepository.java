package com.java08.quanlituyendung.repository;

import com.java08.quanlituyendung.entity.Test.TestRecordEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordRepository extends JpaRepository<TestRecordEntity, Long> {

}
