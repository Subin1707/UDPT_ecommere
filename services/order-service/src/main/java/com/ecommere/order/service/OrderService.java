package com.ecommere.order.service;

import com.ecommere.order.dto.CreateOrderRequest;
import com.ecommere.order.dto.UpdateOrderRequest;
import com.ecommere.order.entity.Order;

import java.util.List;

public interface OrderService {

    Order createOrder(CreateOrderRequest request);

    Order updateOrder(Long id, UpdateOrderRequest request);

    List<Order> getAllOrders();

    void deleteOrder(Long id);
}
