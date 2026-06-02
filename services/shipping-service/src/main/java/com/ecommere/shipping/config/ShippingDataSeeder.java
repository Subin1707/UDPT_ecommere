package com.ecommere.shipping.config;

import com.ecommere.shipping.entity.Delivery;
import com.ecommere.shipping.repository.DeliveryRepository;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class ShippingDataSeeder implements CommandLineRunner {

    private static final String[] STATUSES = {"ASSIGNED", "PICKED_UP", "DELIVERING", "DELIVERED"};

    private final DeliveryRepository deliveryRepository;

    @Override
    @Transactional
    public void run(String... args) {
        for (int i = 1; i <= 50; i++) {
            String shipperName = i % 4 == 1 ? "UNASSIGNED" : "Shipper mẫu " + String.format("%02d", ((i - 1) % 23) + 1);
            createDelivery(
                    (long) i,
                    (long) (((i - 1) % 50) + 1),
                    1 + (i % 5),
                    "Khách hàng đơn test " + String.format("%02d", i),
                    shipperName,
                    STATUSES[(i - 1) % STATUSES.length],
                    LocalDateTime.now().minusHours(50L - i)
            );
        }
    }

    private void createDelivery(
            Long orderId,
            Long productId,
            Integer quantity,
            String customerName,
            String shipperName,
            String status,
            LocalDateTime createdAt
    ) {
        var existingDelivery = deliveryRepository.findByOrderId(orderId);
        if (existingDelivery.isPresent()) {
            Delivery delivery = existingDelivery.get();
            if (delivery.getShipperLat() == null || delivery.getShipperLng() == null
                    || delivery.getCustomerLat() == null || delivery.getCustomerLng() == null) {
                setDemoLocation(delivery, orderId);
                deliveryRepository.save(delivery);
            }
            return;
        }

        Delivery delivery = new Delivery();
        delivery.setOrderId(orderId);
        delivery.setProductId(productId);
        delivery.setQuantity(quantity);
        delivery.setCustomerName(customerName);
        delivery.setShipperName(shipperName);
        delivery.setStatus(status);
        setDemoLocation(delivery, orderId);
        delivery.setCreatedAt(createdAt);
        delivery.setUpdatedAt(createdAt.plusHours(2));
        deliveryRepository.save(delivery);
    }

    private void setDemoLocation(Delivery delivery, Long orderId) {
        delivery.setShipperLat(21.0285 + (orderId % 8) * 0.0012);
        delivery.setShipperLng(105.8542 - (orderId % 8) * 0.0011);
        delivery.setCustomerLat(21.0350 + (orderId % 6) * 0.0010);
        delivery.setCustomerLng(105.8340 + (orderId % 6) * 0.0013);
    }
}
