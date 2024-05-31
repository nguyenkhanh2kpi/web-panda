package com.java08.quanlituyendung.service.impl;

import com.java08.quanlituyendung.auth.UserAccountRetriever;
import com.java08.quanlituyendung.entity.notify.NotifyEntity;
import com.java08.quanlituyendung.repository.NotifyRepository;
import com.java08.quanlituyendung.service.INotifyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class NotifyService implements INotifyService {
    private final SimpMessagingTemplate messagingTemplate;
    private final NotifyRepository notifyRepository;
    private final UserAccountRetriever userAccountRetriever;

    @Autowired
    public NotifyService(NotifyRepository notifyRepository, UserAccountRetriever userAccountRetriever, SimpMessagingTemplate messagingTemplate) {
        this.notifyRepository = notifyRepository;
        this.userAccountRetriever = userAccountRetriever;
        this.messagingTemplate = messagingTemplate;
    }

    @Override
    public List<NotifyEntity> getAllNotifications() {
        return notifyRepository.findAll();
    }

    @Override
    public Optional<NotifyEntity> getNotificationById(Long id) {
        return notifyRepository.findById(id);
    }

    @Override
    public NotifyEntity createNotification(NotifyEntity notifyEntity) {
        notifyEntity.setStatus(NotifyEntity.NotificationStatus.UNREAD);
        messagingTemplate.convertAndSend("/topic/notifications", notifyEntity);
        return notifyRepository.save(notifyEntity);
    }

    @Override
    public NotifyEntity updateNotification(Long id, NotifyEntity notifyEntityDetails) {
        return notifyRepository.findById(id).map(notifyEntity -> {
            notifyEntity.setTitle(notifyEntityDetails.getTitle());
            notifyEntity.setMessage(notifyEntityDetails.getMessage());
            notifyEntity.setLink(notifyEntityDetails.getLink());
            notifyEntity.setRecipient(notifyEntityDetails.getRecipient());
            notifyEntity.setStatus(NotifyEntity.NotificationStatus.UNREAD);
            return notifyRepository.save(notifyEntity);
        }).orElseGet(() -> {
            notifyEntityDetails.setId(id);
            return notifyRepository.save(notifyEntityDetails);
        });
    }

    @Override
    public void deleteNotification(Long id) {
        notifyRepository.deleteById(id);
    }

    @Override
    public List<NotifyEntity> getMyNotifications(Authentication authentication) {
        var user = userAccountRetriever.getUserAccountEntityFromAuthentication(authentication);
        return notifyRepository.findAll().stream()
                .filter(notifyEntity -> notifyEntity.getRecipient().contains(user.getEmail()))
                .sorted(Comparator.comparing(NotifyEntity::getCreatedAt).reversed())
                .collect(Collectors.toList());
    }

    @Override
    public NotifyEntity changeStatus(Long id) {
        return notifyRepository.findById(id).map(notifyEntity -> {
            if (notifyEntity.getStatus() == NotifyEntity.NotificationStatus.READ) {
                notifyEntity.setStatus(NotifyEntity.NotificationStatus.UNREAD);
            } else {
                notifyEntity.setStatus(NotifyEntity.NotificationStatus.READ);
            }
            return notifyRepository.save(notifyEntity);
        }).orElseGet(() -> {
            return null;
        });
    }

    @Override
    public void sendNotification(String title, String message, String receiver, String link) {
        this.createNotification(NotifyEntity.builder().title(title).message(message).recipient(receiver).link(link).build());
    }
}
