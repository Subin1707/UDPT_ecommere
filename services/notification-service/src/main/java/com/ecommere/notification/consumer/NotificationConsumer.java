package com.ecommere.notification.consumer;

import com.ecommere.notification.entity.NotificationEvent;
import com.ecommere.notification.event.OrderCreatedEvent;
import com.ecommere.notification.repository.NotificationEventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class NotificationConsumer {

    private final NotificationEventRepository notificationEventRepository;

    @KafkaListener(
            topics = "order-created-topic",
            groupId = "notification-group"
    )
    public void consume(OrderCreatedEvent event) {
        System.out.println("=================================");
        System.out.println("ORDER CREATED EVENT RECEIVED");
        System.out.println("Order ID: " + event.getOrderId());
        System.out.println("Product ID: " + event.getProductId());
        System.out.println("Quantity: " + event.getQuantity());
        System.out.println("Customer: " + event.getCustomerName());
        System.out.println("Status: " + event.getStatus());
        System.out.println("=================================");

        NotificationEvent notification = NotificationEvent.builder()
                .type("ORDER_CREATED")
                .orderId(event.getOrderId())
                .productId(event.getProductId())
                .quantity(event.getQuantity())
                .customerName(event.getCustomerName())
                .status(event.getStatus())
                .message("Đơn hàng #" + event.getOrderId() + " đã được tạo cho " + event.getCustomerName())
                .createdAt(LocalDateTime.now())
                .build();

        notificationEventRepository.save(notification);
    }
}
