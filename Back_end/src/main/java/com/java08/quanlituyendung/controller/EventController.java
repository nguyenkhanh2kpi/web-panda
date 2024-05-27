package com.java08.quanlituyendung.controller;

import com.java08.quanlituyendung.dto.*;
import com.java08.quanlituyendung.service.IEventService;
import com.java08.quanlituyendung.service.IFileUploadService;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/event")
@RequiredArgsConstructor
@Tag(name = "Event")
public class EventController {

    @Autowired
    IEventService eventService;

    private final IFileUploadService fileUploadService;

    @Operation(summary = "Lấy tất cả Event, yêu cầu phải đăng nhập tài khoản")
    @GetMapping
    public ResponseEntity<ResponseObject> getAllEvent() {
        return eventService.getAllEvent();
    }


    @Operation(summary = "Lấy event cua toi")
    @GetMapping("/myEvent")
    public  ResponseEntity<ResponseObject> getMyEvent(Authentication authentication) {
        return eventService.getMyEvent(authentication);
    }

    @Operation(summary = "Lấy Event thông qua ID ")
    @GetMapping("/{id}")
    public ResponseEntity<ResponseObject> getEvent(@PathVariable Long id, Authentication authentication) {
        return eventService.getEvent(id, authentication);
    }

    @Operation(summary = "Tạo Event mới, yêu cầu phải đăng nhập tài khoản ")
    @PostMapping
    public ResponseEntity<ResponseObject> createEvent(@RequestBody CreateEventRequestDTO request, Authentication authentication) {
        return eventService.createEvent(request, authentication);
    }

    @Operation(summary = "Cập nhật Event thông qua Event ID, yêu cầu tài khoản đăng nhập phải trùng với tài khoản tạo Event và role phải là ADMIN")
    @PutMapping("/{id}")
    public ResponseEntity<ResponseObject> updateEvent(@RequestBody EventDTO request,@PathVariable long id, Authentication authentication){
        return eventService.updateEvent(request,id, authentication);
    }

    @Operation(summary = "Xóa Event thông qua Event ID, yêu cầu tài khoản đăng nhập phải trùng với tài khoản tạo Event và role phải là ADMIN")
    @DeleteMapping("/{eventId}")
    public ResponseEntity<ResponseObject> delete(@PathVariable Long eventId, Authentication authentication) {
        return eventService.deleteEvent(eventId, authentication);
    }



    @PostMapping("/{id}/upload/image")
    public ResponseEntity<ResponseObject> uploadImage(@RequestParam("file") MultipartFile file,@PathVariable long id, Authentication authentication) {
        try {
            String fileUrl = fileUploadService.uploadFile(file);
            EventDTO eventDTO = new EventDTO();
            eventDTO.setImage(fileUrl);
            return eventService.updateEvent(eventDTO,id ,authentication);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
