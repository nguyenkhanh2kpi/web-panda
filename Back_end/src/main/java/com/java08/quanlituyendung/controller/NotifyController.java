package com.java08.quanlituyendung.controller;

import com.java08.quanlituyendung.entity.notify.NotifyEntity;
import com.java08.quanlituyendung.service.INotifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
public class NotifyController {
    private final INotifyService notifyService;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public NotifyController(SimpMessagingTemplate messagingTemplate,INotifyService notifyService) {
        this.messagingTemplate = messagingTemplate;
        this.notifyService = notifyService;
    }

//    @PostMapping
//    public void sendNotification(@RequestBody NotifyEntity notifyEntity) {
//        messagingTemplate.convertAndSend("/topic/notifications", notifyEntity);
//    }

    @GetMapping("/my-notification") List<NotifyEntity> getMyNotifyEntities(Authentication authentication) {
        return notifyService.getMyNotifications(authentication);
    }

    @GetMapping
    public List<NotifyEntity> getAllNotifications() {
        return notifyService.getAllNotifications();
    }

    @GetMapping("/{id}")
    public ResponseEntity<NotifyEntity> getNotificationById(@PathVariable Long id) {
        return notifyService.getNotificationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public NotifyEntity createNotification(@RequestBody NotifyEntity notifyEntity) {
        return notifyService.createNotification(notifyEntity);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NotifyEntity> updateNotification(@PathVariable Long id, @RequestBody NotifyEntity notifyEntityDetails) {
        return ResponseEntity.ok(notifyService.updateNotification(id, notifyEntityDetails));
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<NotifyEntity> changeStatus(@PathVariable Long id,Authentication authentication) {
        return ResponseEntity.ok(notifyService.changeStatus(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
        notifyService.deleteNotification(id);
        return ResponseEntity.noContent().build();
    }
}