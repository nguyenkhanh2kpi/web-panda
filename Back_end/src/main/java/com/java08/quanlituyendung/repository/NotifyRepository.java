package com.java08.quanlituyendung.repository;

import com.java08.quanlituyendung.entity.notify.NotifyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotifyRepository extends JpaRepository<NotifyEntity, Long> {

}