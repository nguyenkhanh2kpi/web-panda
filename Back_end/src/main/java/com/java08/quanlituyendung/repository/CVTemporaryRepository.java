package com.java08.quanlituyendung.repository;

import com.java08.quanlituyendung.entity.CVTemporaryEntity;
import com.java08.quanlituyendung.entity.UserAccountEntity;
import com.java08.quanlituyendung.entity.UserInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;


public interface CVTemporaryRepository extends JpaRepository<CVTemporaryEntity,Long> {
    Optional<CVTemporaryEntity> findByUserAccount(UserAccountEntity userAccount);

}
