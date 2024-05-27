package com.java08.quanlituyendung.repository;

import com.java08.quanlituyendung.entity.vip.BillEntity;
import com.java08.quanlituyendung.utils.PackVipType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BillRepository extends JpaRepository<BillEntity, Long> {
    List<BillEntity> findByEmailAndType(String email, PackVipType type);
}
