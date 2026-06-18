package com.ecommere.order.service.impl;

import com.ecommere.order.client.ProductInventoryClient;
import com.ecommere.order.dto.CreateOrderRequest;
import com.ecommere.order.dto.UpdateOrderRequest;
import com.ecommere.order.entity.Order;
import com.ecommere.order.event.OrderCreatedEvent;
import com.ecommere.order.repository.OrderRepository;
import com.ecommere.order.service.OrderService;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private static final String ORDER_CREATED_TOPIC = "order-created-topic";

    private final OrderRepository orderRepository;
    private final KafkaTemplate<String, OrderCreatedEvent> kafkaTemplate;
    private final ProductInventoryClient productInventoryClient;

    public OrderServiceImpl(
            OrderRepository orderRepository,
            KafkaTemplate<String, OrderCreatedEvent> kafkaTemplate,
            ProductInventoryClient productInventoryClient
    ) {
        this.orderRepository = orderRepository;
        this.kafkaTemplate = kafkaTemplate;
        this.productInventoryClient = productInventoryClient;
    }

    @Override
    @Transactional
    public Order createOrder(CreateOrderRequest request) {
        // Validate required fields
        if (request.getProductId() == null || request.getProductId() <= 0) {
            throw new IllegalArgumentException("Product ID is required and must be greater than 0");
        }
        if (request.getQuantity() == null || request.getQuantity() <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than 0");
        }
        if (request.getCustomerId() == null || request.getCustomerId().isBlank()) {
            throw new IllegalArgumentException("Customer ID is required");
        }
        if (request.getCustomerName() == null || request.getCustomerName().isBlank()) {
            throw new IllegalArgumentException("Customer Name is required");
        }
        if (request.getAddress() == null || request.getAddress().isBlank()) {
            throw new IllegalArgumentException("Delivery address is required");
        }
        if (request.getPhone() == null || request.getPhone().isBlank()) {
            throw new IllegalArgumentException("Phone number is required");
        }

        // Create and save order BEFORE decreasing stock to ensure transaction integrity
        Order order = new Order();
        order.setProductId(request.getProductId());
        order.setQuantity(request.getQuantity());
        order.setCustomerId(request.getCustomerId());
        order.setCustomerName(request.getCustomerName());
        order.setAddress(request.getAddress());
        order.setPhone(request.getPhone());
        order.setStatus("CREATED");
        order.setCreatedAt(LocalDateTime.now());

        Order savedOrder = orderRepository.save(order);

        // Decrease stock after order is saved
        try {
            productInventoryClient.decreaseStock(request.getProductId(), request.getQuantity());
        } catch (Exception e) {
            // Log the error and rethrow - the order will be saved but stock decrease failed
            throw new RuntimeException("Failed to decrease product inventory: " + e.getMessage(), e);
        }

        // Send Kafka event with error handling
        OrderCreatedEvent event = new OrderCreatedEvent(
                savedOrder.getId(),
                savedOrder.getProductId(),
                savedOrder.getQuantity(),
                savedOrder.getCustomerName(),
                savedOrder.getStatus()
        );

        try {
            kafkaTemplate.send(ORDER_CREATED_TOPIC, savedOrder.getId().toString(), event);
        } catch (Exception e) {
            // Log error but don't fail - order is already saved
            System.err.println("Failed to send Kafka event for order " + savedOrder.getId() + ": " + e.getMessage());
            e.printStackTrace();
        }

        return savedOrder;
    }

    @Override
    @Transactional
    public Order updateOrder(Long id, UpdateOrderRequest request) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));

        order.setProductId(request.getProductId());
        order.setQuantity(request.getQuantity());
        order.setCustomerName(request.getCustomerName());
        order.setStatus(request.getStatus());

        return orderRepository.save(order);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Order> getOrdersByCustomerName(String customerName) {
        return orderRepository.findByCustomerName(customerName);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Order> getOrdersByCustomerId(String customerId) {
        return orderRepository.findByCustomerId(customerId);
    }

    @Override
    @Transactional
    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}
