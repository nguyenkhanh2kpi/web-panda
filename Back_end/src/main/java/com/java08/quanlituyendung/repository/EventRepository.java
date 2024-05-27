package com.java08.quanlituyendung.repository;


import com.java08.quanlituyendung.entity.EventEntity;
import com.java08.quanlituyendung.entity.InterviewEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EventRepository extends JpaRepository<EventEntity, Long> {

}
