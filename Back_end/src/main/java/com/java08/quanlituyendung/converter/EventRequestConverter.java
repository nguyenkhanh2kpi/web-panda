package com.java08.quanlituyendung.converter;

import com.google.api.client.util.DateTime;
import com.google.api.services.calendar.model.*;
import com.java08.quanlituyendung.dto.CalendarAddRequestDTO;
import com.java08.quanlituyendung.dto.CreateEventRequestDTO;
import com.java08.quanlituyendung.dto.EventDTO;
import com.java08.quanlituyendung.entity.EventEntity;
import com.java08.quanlituyendung.entity.UserAccountEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Component
@RequiredArgsConstructor
public class EventRequestConverter {
    // converter da sua
    public EventEntity createEventRequestToEventEntity(CreateEventRequestDTO request, UserAccountEntity recruiter) {
        EventEntity entity = new EventEntity();
        entity.setName(request.getTitle());
        entity.setArticle(request.getArticle());
        entity.setTime(request.getTime());
        entity.setUserAccountEntity(recruiter);
        entity.setImage(request.getImage());
        entity.setContent(request.getContent());
        entity.setStatus(true);
        return entity;
    }

    public EventEntity updateEventRequestToEventEntity(EventDTO request, EventEntity event) {
        if (request.getTitle() != null) {
            event.setName(request.getTitle());
        }
        if (request.getArticle() != null) {
            event.setArticle(request.getArticle());
        }
        if (request.getTime() != null) {
            event.setTime(request.getTime());
        }
        event.setStatus(true);
        if (request.getImage() != null) {
            event.setImage(request.getImage());
        }
        if (request.getContent() != null) {
            event.setContent(request.getContent());
        }
        return event;
    }

    public EventDTO responseEventObject(EventEntity event) {
        EventDTO eventDTO = new EventDTO();
        eventDTO.setId(event.getId());
        eventDTO.setTitle(event.getName());
        eventDTO.setArticle(event.getArticle());
        eventDTO.setTime(event.getTime());
        eventDTO.setAuthor(getEventAuthor(event));
        eventDTO.setStatus(event.isStatus());
        eventDTO.setImage(event.getImage());
        eventDTO.setContent(event.getContent());
        return eventDTO;
    }

    private String getEventAuthor(EventEntity event) {
        String fullName = event.getUserAccountEntity().getUserInfo().getFullName();
        if (fullName != null) {
            return fullName;
        }
        return event.getUserAccountEntity().getEmail();
    }

    public static Event convertToEventCalendar(CalendarAddRequestDTO requestDTO) {
        Event event = new Event();

        event.setSummary("Bạn có một buổi phỏng vấn tại JOB PANDA : " + requestDTO.getSummary());
        event.setDescription("Lưu ý: " + requestDTO.getDescription());

        DateTime startDateTime = new DateTime(requestDTO.getStartTime());
        EventDateTime start = new EventDateTime()
                .setDateTime(startDateTime)
                .setTimeZone("Asia/Ho_Chi_Minh");
        event.setStart(start);

        DateTime endDateTime = new DateTime(requestDTO.getEndTime());
        EventDateTime end = new EventDateTime()
                .setDateTime(endDateTime)
                .setTimeZone("Asia/Ho_Chi_Minh");
        event.setEnd(end);


        ConferenceSolutionKey solutionKey = new ConferenceSolutionKey().setType("hangoutsMeet");
        CreateConferenceRequest request = new CreateConferenceRequest().setConferenceSolutionKey(solutionKey)
                .setRequestId("qwerfsdiob");
        EntryPoint entryPoint = new EntryPoint().setEntryPointType("video");
        ConferenceData conferenceData = new ConferenceData().setCreateRequest(request)
                .setCreateRequest(request)
                .setEntryPoints(Collections.singletonList(entryPoint));
        event.setConferenceData(conferenceData);


        List<EventAttendee> attendees = new ArrayList<>();
        if (requestDTO.getAttendees() != null) {
            for (String email : requestDTO.getAttendees()) {
                attendees.add(new EventAttendee().setEmail(email));
            }
        }
        event.setAttendees(attendees);

        EventReminder[] reminderOverrides = {
                new EventReminder().setMethod("email").setMinutes(24 * 60),
                new EventReminder().setMethod("popup").setMinutes(10)
        };
        Event.Reminders reminders = new Event.Reminders()
                .setUseDefault(false)
                .setOverrides(Arrays.asList(reminderOverrides));
        event.setReminders(reminders);

        return event;
    }


    public static Event convertToEventCalendarOffline(CalendarAddRequestDTO requestDTO) {
        Event event = new Event()
                .setSummary(requestDTO.getSummary()+ " tại " + requestDTO.getLocation())
                .setLocation(requestDTO.getLocation())
                .setDescription(requestDTO.getDescription());

        DateTime startDateTime = new DateTime(requestDTO.getStartTime());
        EventDateTime start = new EventDateTime()
                .setDateTime(startDateTime)
                .setTimeZone("Asia/Ho_Chi_Minh");
        event.setStart(start);

        DateTime endDateTime = new DateTime(requestDTO.getEndTime());
        EventDateTime end = new EventDateTime()
                .setDateTime(endDateTime)
                .setTimeZone("Asia/Ho_Chi_Minh");
        event.setEnd(end);

        List<EventAttendee> attendees = new ArrayList<>();
        if (requestDTO.getAttendees() != null) {
            for (String email : requestDTO.getAttendees()) {
                attendees.add(new EventAttendee().setEmail(email));
            }
        }
        event.setAttendees(attendees);


        EventReminder[] reminderOverrides = new EventReminder[] {
                new EventReminder().setMethod("email").setMinutes(24 * 60),
                new EventReminder().setMethod("popup").setMinutes(10),
        };
        Event.Reminders reminders = new Event.Reminders()
                .setUseDefault(false)
                .setOverrides(Arrays.asList(reminderOverrides));
        event.setReminders(reminders);
        return event;
    }

}
