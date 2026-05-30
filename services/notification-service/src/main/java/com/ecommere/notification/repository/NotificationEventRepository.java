package com.ecommere.notification.repository;

import com.ecommere.notification.entity.NotificationEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationEventRepository extends JpaRepository<NotificationEvent, Long> {

    List<NotificationEvent> findTop50ByOrderByCreatedAtDesc();
}
