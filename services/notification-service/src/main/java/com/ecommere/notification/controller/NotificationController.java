package com.ecommere.notification.controller;

import com.ecommere.notification.entity.NotificationEvent;
import com.ecommere.notification.repository.NotificationEventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationEventRepository notificationEventRepository;

    @GetMapping
    public List<NotificationEvent> getNotifications() {
        return notificationEventRepository.findTop50ByOrderByCreatedAtDesc();
    }
}
