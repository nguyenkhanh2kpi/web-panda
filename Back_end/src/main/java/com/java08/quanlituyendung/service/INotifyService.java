package com.java08.quanlituyendung.service;

import com.java08.quanlituyendung.entity.notify.NotifyEntity;
import org.springframework.security.core.Authentication;

import java.util.List;
import java.util.Optional;

public interface INotifyService {
    List<NotifyEntity> getAllNotifications();
    Optional<NotifyEntity> getNotificationById(Long id);
    NotifyEntity createNotification(NotifyEntity notifyEntity);
    NotifyEntity updateNotification(Long id, NotifyEntity notifyEntityDetails);
    void deleteNotification(Long id);

    List<NotifyEntity> getMyNotifications(Authentication authentication);
    NotifyEntity changeStatus(Long id);
    void sendNotification(String title, String message, String receiver, String link);
}
