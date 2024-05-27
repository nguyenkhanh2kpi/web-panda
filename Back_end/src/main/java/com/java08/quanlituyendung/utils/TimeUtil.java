package com.java08.quanlituyendung.utils;

import java.time.Duration;
import java.time.LocalDateTime;

public class TimeUtil {
    public static boolean isValidTime(LocalDateTime creationTime, long minutes) {
        LocalDateTime currentDatetime = LocalDateTime.now();
        Duration duration = Duration.between(creationTime, currentDatetime);
        return duration.toMinutes() <= minutes;
    }
}

