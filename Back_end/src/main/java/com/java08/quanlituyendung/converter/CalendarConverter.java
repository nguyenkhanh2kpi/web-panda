package com.java08.quanlituyendung.converter;

import com.java08.quanlituyendung.calendar.TypeCalendar;
import com.java08.quanlituyendung.dto.CalendarPayload.LocalCalendarResponseDTO;
import com.java08.quanlituyendung.entity.EventEntity;
import com.java08.quanlituyendung.entity.InterviewDetailEntity;
import com.java08.quanlituyendung.entity.InterviewEntity;
import org.json.simple.JSONObject;
import org.springframework.stereotype.Component;

@Component
public class CalendarConverter {


    public LocalCalendarResponseDTO EventEntityTOLocalCalendarDTO(EventEntity event) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("EventID", event.getId());
        return LocalCalendarResponseDTO.builder()
                .type(TypeCalendar.EVENT.name())
                .date(event.getTime())
                .time(event.getTime())
                .title(event.getName())
                .description(event.getArticle())
                .detail(jsonObject)
                .build();
    }

    public LocalCalendarResponseDTO InterviewDetailToLocalCalendarDTO(InterviewDetailEntity interviewDetail) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("InterviewDetailId", interviewDetail.getId());
        jsonObject.put("linkMeet", interviewDetail.getInterview().getLinkmeet());
        return LocalCalendarResponseDTO.builder()
                .type(TypeCalendar.INTERVIEW.name())
                .date(interviewDetail.getDate())
                .time(interviewDetail.getTime())
                .title(interviewDetail.getInterview().getRoomName())
                .description(interviewDetail.getInterview().getDescription())
                .detail(jsonObject)
                .build();
    }

    public LocalCalendarResponseDTO InterviewToLocalCalendarDTO(InterviewEntity interview) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("InterviewID",interview.getId());
        jsonObject.put("linkMeet", interview.getLinkmeet());
        return LocalCalendarResponseDTO.builder()
                .type(TypeCalendar.INTERVIEW.name())
                .date(interview.getStartDate())
                .time(interview.getStartDate())
                .title(interview.getRoomName())
                .description(interview.getDescription())
                .detail(jsonObject)
                .build();
    }
}
