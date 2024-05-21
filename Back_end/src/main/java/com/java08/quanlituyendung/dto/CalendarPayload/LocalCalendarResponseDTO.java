package com.java08.quanlituyendung.dto.CalendarPayload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.json.simple.JSONObject;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LocalCalendarResponseDTO {
    private String type;
    private String date;
    private String time;
    private String title;
    private String description;
    private JSONObject detail;
}
