package com.ecommere.shipping.service.impl;

import com.ecommere.shipping.dto.DeliveryStatusUpdateRequest;
import com.ecommere.shipping.entity.Delivery;
import com.ecommere.shipping.event.OrderCreatedEvent;
import com.ecommere.shipping.repository.DeliveryRepository;
import com.ecommere.shipping.service.ShippingService;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class ShippingServiceImpl implements ShippingService {

    private final DeliveryRepository deliveryRepository;

    public ShippingServiceImpl(DeliveryRepository deliveryRepository) {
        this.deliveryRepository = deliveryRepository;
    }

    @Override
    public Delivery createDeliveryFromOrder(OrderCreatedEvent event) {
        return deliveryRepository.findByOrderId(event.getOrderId())
                .orElseGet(() -> createNewDelivery(event));
    }

    private Delivery createNewDelivery(OrderCreatedEvent event) {
        Delivery delivery = new Delivery();
        delivery.setOrderId(event.getOrderId());
        delivery.setProductId(event.getProductId());
        delivery.setQuantity(event.getQuantity());
        delivery.setCustomerName(event.getCustomerName());
        delivery.setShipperName("UNASSIGNED");
        delivery.setStatus("ASSIGNED");
        delivery.setCreatedAt(LocalDateTime.now());
        delivery.setUpdatedAt(LocalDateTime.now());

        Delivery savedDelivery = deliveryRepository.save(delivery);

        System.out.println("SHIPPING CREATED FOR ORDER: " + event.getOrderId());

        return savedDelivery;
    }

    @Override
    public List<Delivery> getAllDeliveries() {
        return deliveryRepository.findAll();
    }

    @Override
    public Delivery updateDeliveryStatus(Long id, DeliveryStatusUpdateRequest request) {
        Delivery delivery = deliveryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Delivery not found with id: " + id));

        delivery.setStatus(request.getStatus());

        if (request.getShipperName() != null) {
            delivery.setShipperName(request.getShipperName());
        }

        delivery.setUpdatedAt(LocalDateTime.now());

        Delivery savedDelivery = deliveryRepository.save(delivery);

        System.out.println("DELIVERY STATUS UPDATED: " + savedDelivery.getStatus());

        return savedDelivery;
    }

    @Override
    public List<Delivery> getDeliveriesByShipper(String shipperName) {
        return deliveryRepository.findByShipperName(shipperName);
    }
}
