package com.ecommere.notification.consumer;

import com.ecommere.notification.event.OrderCreatedEvent;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class NotificationConsumer {

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
    }
}
