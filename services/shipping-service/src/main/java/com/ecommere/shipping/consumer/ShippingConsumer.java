package com.ecommere.shipping.consumer;

import com.ecommere.shipping.event.OrderCreatedEvent;
import com.ecommere.shipping.service.ShippingService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class ShippingConsumer {

    private final ShippingService shippingService;

    public ShippingConsumer(ShippingService shippingService) {
        this.shippingService = shippingService;
    }

    @KafkaListener(
            topics = "order-created-topic",
            groupId = "shipping-group"
    )
    public void consume(OrderCreatedEvent event) {
        System.out.println("=================================");
        System.out.println("SHIPPING SERVICE RECEIVED ORDER_CREATED");
        System.out.println("Order ID: " + event.getOrderId());
        System.out.println("Customer: " + event.getCustomerName());
        System.out.println("=================================");

        shippingService.createDeliveryFromOrder(event);
    }
}
