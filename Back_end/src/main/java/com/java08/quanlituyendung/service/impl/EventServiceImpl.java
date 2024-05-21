package com.java08.quanlituyendung.service.impl;

import com.java08.quanlituyendung.auth.UserAccountRetriever;
import com.java08.quanlituyendung.converter.EventRequestConverter;
import com.java08.quanlituyendung.dto.CreateEventRequestDTO;
import com.java08.quanlituyendung.dto.ResponseObject;
import com.java08.quanlituyendung.dto.EventDTO;
import com.java08.quanlituyendung.entity.*;
import com.java08.quanlituyendung.repository.EventRepository;
import com.java08.quanlituyendung.service.IEventService;
import com.java08.quanlituyendung.utils.Constant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class EventServiceImpl implements IEventService {
    @Autowired
    private EventRequestConverter eventRequestConverter;
    @Autowired
    private EventRepository eventRepository;
    @Autowired
    private UserAccountRetriever userAccountRetriever;

    @Override
    public ResponseEntity<ResponseObject> createEvent(CreateEventRequestDTO request, Authentication authentication) {
        UserAccountEntity userAccountEntity = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        if (userAccountEntity != null) {
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.OK.toString())
                    .message(Constant.ADD_EVENT_SUCCESS)
                    .data(eventRequestConverter.responseEventObject(
                            eventRepository.save(eventRequestConverter.createEventRequestToEventEntity(request, userAccountEntity))))
                    .build());
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.UNAUTHORIZED.toString())
                .message(Constant.NOT_AUTHENTICATED)
                .build());
    }

    @Override
    public ResponseEntity<ResponseObject> getAllEvent() {
        List<EventEntity> events = eventRepository.findAll();
        List<EventDTO> eventDTOS = events.stream()
                .map(eventRequestConverter::responseEventObject)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.OK.toString())
                .data(eventDTOS)
                .message(Constant.SUCCESS)
                .build());
    }

    public ResponseEntity<ResponseObject> getEvent(Long id, Authentication authentication) {
        Optional<EventEntity> event = eventRepository.findById(id);
        if(event.isPresent()){
            return ResponseEntity.status(HttpStatus.OK).body(ResponseObject.builder()
                    .status(HttpStatus.OK.toString())
                    .message(Constant.SUCCESS)
                    .data(eventRequestConverter.responseEventObject(event.get()))
                    .build());
        }
        return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                ResponseObject.builder()
                        .message(Constant.FAIL)
                        .build());
    }

    @Override
    public ResponseEntity<ResponseObject> updateEvent(EventDTO request,long id, Authentication authentication) {
        UserAccountEntity userAccountEntity = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        Optional<EventEntity> event = eventRepository.findById(id);
        if (event.isPresent()) {
            if (userAccountEntity.getRole().equals(Role.ADMIN) || event.get().getUserAccountEntity().equals(userAccountEntity)) {
                return ResponseEntity.ok(ResponseObject.builder()
                        .status(HttpStatus.OK.toString())
                        .message(Constant.SUCCESS)
                        .data(eventRequestConverter.responseEventObject(
                                eventRepository.save(
                                eventRequestConverter.updateEventRequestToEventEntity(request, event.get()))))
                        .build());
            } else {
                return ResponseEntity.ok(
                        ResponseObject.builder()
                                .status(HttpStatus.FORBIDDEN.toString())
                                .message(Constant.YOU_DONT_HAVE_PERMISION)
                                .build());
            }
        }
        return ResponseEntity.ok(
                ResponseObject.builder()
                        .status(HttpStatus.NOT_FOUND.toString())
                        .message(Constant.EVENT_NOT_FOUND)
                        .build());
    }

    @Override
    public ResponseEntity<ResponseObject> getMyEvent(Authentication authentication) {
        UserAccountEntity userAccountEntity = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        List<EventEntity> events = eventRepository.findAll();
        List<EventDTO> eventDTOS = events.stream()
                .filter(event -> event.getUserAccountEntity()==userAccountEntity)
                .map(eventRequestConverter::responseEventObject)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.OK.toString())
                .data(eventDTOS)
                .message(Constant.SUCCESS)
                .build());

    }

    @Override
    public ResponseEntity<ResponseObject> deleteEvent(Long eventId, Authentication authentication) {
        UserAccountEntity userAccountEntity = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        Optional<EventEntity> event = eventRepository.findById(eventId);
        if (userAccountEntity != null && event.isPresent()) {
            var user = event.get().getUserAccountEntity();
            if (user.equals(userAccountEntity) || userAccountEntity.getRole() == Role.ADMIN) {
                event.get().setStatus(false);
                return ResponseEntity.ok(ResponseObject.builder()
                        .status(HttpStatus.OK.toString())
                        .message(Constant.SUCCESS)
                        .data(eventRequestConverter.responseEventObject(
                                eventRepository.save(event.get())))
                        .build());
            }
            return ResponseEntity.ok(ResponseObject.builder()
                    .status(HttpStatus.FORBIDDEN.toString())
                    .message(Constant.YOU_DONT_HAVE_PERMISION)
                    .build());
        }
        return ResponseEntity.ok(ResponseObject.builder()
                .status(HttpStatus.UNAUTHORIZED.toString())
                .message(Constant.NOT_AUTHENTICATED)
                .build());
    }


}
