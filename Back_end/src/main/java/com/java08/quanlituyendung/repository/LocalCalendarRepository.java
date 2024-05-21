package com.java08.quanlituyendung.repository;

import com.java08.quanlituyendung.entity.LocalCalendar.LocalCalendar;
import org.springframework.data.jpa.repository.JpaRepository;

public interface  LocalCalendarRepository extends JpaRepository<LocalCalendar, Long> {
}
