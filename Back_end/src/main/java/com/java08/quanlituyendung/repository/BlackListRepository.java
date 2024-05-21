package com.java08.quanlituyendung.repository;

import com.java08.quanlituyendung.entity.BlacklistEntity;
import com.java08.quanlituyendung.entity.Status;
import com.java08.quanlituyendung.entity.UserAccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlackListRepository extends JpaRepository<BlacklistEntity, Long> {
    List<BlacklistEntity> findAllById(Long userId);
    List<BlacklistEntity> findAllByUserAccountEntityId(Long userId);
    List<BlacklistEntity> findAllByUserAccountEntityStatus(Status status);
    BlacklistEntity findFirstByUserAccountEntityOrderByDateBlacklistDesc(UserAccountEntity userAccountEntity);
    List<BlacklistEntity> findBlacklistEntityByUserAccountEntity(UserAccountEntity userAccountEntity);
}
