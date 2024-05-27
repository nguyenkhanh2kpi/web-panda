package com.java08.quanlituyendung.repository;

import com.java08.quanlituyendung.entity.QuestionEntity;
import com.java08.quanlituyendung.entity.UserAccountEntity;
import com.java08.quanlituyendung.entity.UserInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserInfoRepository extends JpaRepository<UserInfoEntity,Long> {
    UserInfoEntity findUserInfoEntityByUserAccountInfo(UserAccountEntity userAccount);
    UserInfoEntity getAllById(Long id);

    UserInfoEntity findOneById(Long id);
    @Query("select u.userInfo FROM UserAccountEntity u where u.email =?1 ")
    Optional<UserInfoEntity> findUserInfoEntitiesByEmail(String email);




}
