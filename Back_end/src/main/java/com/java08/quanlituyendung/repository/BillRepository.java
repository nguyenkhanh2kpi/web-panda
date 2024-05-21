package com.java08.quanlituyendung.repository;

import com.java08.quanlituyendung.entity.vip.BillEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillRepository extends JpaRepository<BillEntity, Long> {

}
