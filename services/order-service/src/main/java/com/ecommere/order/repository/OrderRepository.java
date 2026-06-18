package com.ecommere.order.repository;

import com.ecommere.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    boolean existsByProductIdAndCustomerNameAndStatus(Long productId, String customerName, String status);

    List<Order> findByCustomerName(String customerName);

    List<Order> findByCustomerId(String customerId);
}
