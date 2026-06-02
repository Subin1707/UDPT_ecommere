package com.ecommere.notification.config;

import com.ecommere.notification.entity.NotificationEvent;
import com.ecommere.notification.repository.NotificationEventRepository;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class NotificationDataSeeder implements CommandLineRunner {

    private static final String[] TYPES = {"ORDER_CREATED", "SHIPPING_ASSIGNED", "ORDER_DELIVERING", "ORDER_DELIVERED"};
    private static final String[] STATUSES = {"CREATED", "ASSIGNED", "DELIVERING", "DELIVERED"};

    private final NotificationEventRepository notificationEventRepository;

    @Override
    @Transactional
    public void run(String... args) {
        for (int i = 1; i <= 50; i++) {
            int index = (i - 1) % TYPES.length;
            createNotification(
                    TYPES[index],
                    (long) i,
                    (long) (((i - 1) % 50) + 1),
                    1 + (i % 5),
                    "Khách hàng đơn test " + String.format("%02d", i),
                    STATUSES[index],
                    createMessage(TYPES[index], i),
                    LocalDateTime.now().minusHours(50L - i)
            );
        }
    }

    private String createMessage(String type, int orderId) {
        return switch (type) {
            case "SHIPPING_ASSIGNED" -> "Đơn hàng #" + orderId + " đã được phân công cho shipper.";
            case "ORDER_DELIVERING" -> "Đơn hàng #" + orderId + " đang được giao tới khách hàng.";
            case "ORDER_DELIVERED" -> "Đơn hàng #" + orderId + " đã giao thành công.";
            default -> "Đơn hàng #" + orderId + " đã được tạo thành công.";
        };
    }

    private void createNotification(
            String type,
            Long orderId,
            Long productId,
            Integer quantity,
            String customerName,
            String status,
            String message,
            LocalDateTime createdAt
    ) {
        if (notificationEventRepository.existsByTypeAndOrderId(type, orderId)) {
            return;
        }

        NotificationEvent notificationEvent = NotificationEvent.builder()
                .type(type)
                .orderId(orderId)
                .productId(productId)
                .quantity(quantity)
                .customerName(customerName)
                .status(status)
                .message(message)
                .createdAt(createdAt)
                .build();

        notificationEventRepository.save(notificationEvent);
    }
}
