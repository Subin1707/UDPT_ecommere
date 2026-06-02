package com.ecommere.order.config;

import com.ecommere.order.entity.Order;
import com.ecommere.order.repository.OrderRepository;
import java.time.LocalDateTime;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class OrderDataSeeder implements CommandLineRunner {

    private static final String[] STATUSES = {"CREATED", "ASSIGNED", "PICKED_UP", "DELIVERING", "DELIVERED"};

    private final OrderRepository orderRepository;

    @Override
    @Transactional
    public void run(String... args) {
        for (int i = 1; i <= 50; i++) {
            createOrder(
                    (long) (((i - 1) % 50) + 1),
                    1 + (i % 5),
                    "Khách hàng đơn test " + String.format("%02d", i),
                    STATUSES[(i - 1) % STATUSES.length],
                    LocalDateTime.now().minusHours(50L - i)
            );
        }
    }

    private void createOrder(
            Long productId,
            Integer quantity,
            String customerName,
            String status,
            LocalDateTime createdAt
    ) {
        if (orderRepository.existsByProductIdAndCustomerNameAndStatus(productId, customerName, status)) {
            return;
        }

        Order order = new Order();
        order.setProductId(productId);
        order.setQuantity(quantity);
        order.setCustomerName(customerName);
        order.setStatus(status);
        order.setCreatedAt(createdAt);
        orderRepository.save(order);
    }
}
