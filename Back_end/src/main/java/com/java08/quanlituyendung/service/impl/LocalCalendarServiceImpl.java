package com.java08.quanlituyendung.service.impl;

import com.java08.quanlituyendung.auth.UserAccountRetriever;
import com.java08.quanlituyendung.converter.CalendarConverter;
import com.java08.quanlituyendung.dto.CalendarPayload.LocalCalendarResponseDTO;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.entity.*;
import com.java08.quanlituyendung.repository.EventRepository;
import com.java08.quanlituyendung.repository.InterviewDetailRepository;
import com.java08.quanlituyendung.repository.InterviewRepository;
import com.java08.quanlituyendung.service.IEventService;
import com.java08.quanlituyendung.service.ILocalCalendarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class LocalCalendarServiceImpl implements ILocalCalendarService {

    @Autowired
    UserAccountRetriever userAccountRetriever;

    @Autowired
    IEventService eventService;

    @Autowired
    CalendarConverter calendarConverter;

    @Autowired
    InterviewDetailRepository interviewDetailRepository;

    @Autowired
    InterviewRepository interviewRepository;

    @Autowired
    EventRepository eventRepository;

    @Override
    public ResponseEntity<ResponseObject> getMyCalendar(Authentication authentication) {

        UserAccountEntity userAccountEntity = userAccountRetriever
                .getUserAccountEntityFromAuthentication(authentication);
        List<EventEntity> eventEntities = eventRepository.findAll();

        List<LocalCalendarResponseDTO> responseDTOS = new ArrayList<>();
        for (var e : eventEntities) {
            responseDTOS.add(calendarConverter.EventEntityTOLocalCalendarDTO(e));
        }

        if (userAccountEntity != null) {
            if (userAccountEntity.getRole().equals(Role.CANDIDATE)) {
                List<InterviewDetailEntity> interviewDetails = interviewDetailRepository
                        .findByCandidateId(userAccountEntity.getId());
                for (var i : interviewDetails) {
                    responseDTOS.add(calendarConverter.InterviewDetailToLocalCalendarDTO(i));
                }
            }
            if (userAccountEntity.getRole().equals(Role.INTERVIEWER)) {
                List<InterviewEntity> interviewEntities = interviewRepository.findByInterviewers(userAccountEntity);
                for (var i : interviewEntities) {
                    responseDTOS.add(calendarConverter.InterviewToLocalCalendarDTO(i));
                }
            }
            if (userAccountEntity.getRole().equals(Role.RECRUITER)) {
                List<InterviewEntity> interviewEntities = interviewRepository.findByUserAccountEntity(userAccountEntity);
                for (var i : interviewEntities) {
                    responseDTOS.add(calendarConverter.InterviewToLocalCalendarDTO(i));
                }
            }
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.OK.toString())
                    .message("SUCCESS!!")
                    .data(responseDTOS)
                    .build());
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.NOT_FOUND.toString())
                .message("FAIL!!")
                .build());
    }
}
