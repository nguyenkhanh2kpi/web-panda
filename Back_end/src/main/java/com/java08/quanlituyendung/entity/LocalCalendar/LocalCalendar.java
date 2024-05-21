package com.java08.quanlituyendung.entity.LocalCalendar;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class LocalCalendar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String subject;
    private String location;
    private String startTime;
    private String endTime;
    private boolean isAllDay;
    private Long resourceId;
    private String description;
    private Long userId;

    public void setIsAllDay(boolean isAllDay) {
        this.isAllDay = isAllDay;
    }
}
