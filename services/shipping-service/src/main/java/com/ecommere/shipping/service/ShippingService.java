package com.ecommere.shipping.service;

import com.ecommere.shipping.dto.DeliveryStatusUpdateRequest;
import com.ecommere.shipping.dto.DeliveryLocationUpdateRequest;
import com.ecommere.shipping.entity.Delivery;
import com.ecommere.shipping.event.OrderCreatedEvent;
import java.util.List;

public interface ShippingService {

    Delivery createDeliveryFromOrder(OrderCreatedEvent event);

    List<Delivery> getAllDeliveries();

    Delivery updateDeliveryStatus(Long id, DeliveryStatusUpdateRequest request);

    Delivery updateDeliveryLocation(Long id, DeliveryLocationUpdateRequest request);

    List<Delivery> getDeliveriesByShipper(String shipperName);
}
