package com.ecommere.order.service;

import com.ecommere.order.dto.CreateOrderRequest;
import com.ecommere.order.entity.Order;

import java.util.List;

public interface OrderService {

    Order createOrder(CreateOrderRequest request);

    List<Order> getAllOrders();
}
