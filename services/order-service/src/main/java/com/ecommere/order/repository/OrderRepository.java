package com.ecommere.order.repository;

import com.ecommere.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {

    boolean existsByProductIdAndCustomerNameAndStatus(Long productId, String customerName, String status);
}
