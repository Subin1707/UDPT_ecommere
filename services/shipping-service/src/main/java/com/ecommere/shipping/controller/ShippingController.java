package com.ecommere.shipping.controller;

import com.ecommere.shipping.dto.DeliveryStatusUpdateRequest;
import com.ecommere.shipping.entity.Delivery;
import com.ecommere.shipping.service.ShippingService;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/deliveries")
public class ShippingController {

    private final ShippingService shippingService;

    public ShippingController(ShippingService shippingService) {
        this.shippingService = shippingService;
    }

    @GetMapping
    public List<Delivery> getAllDeliveries() {
        return shippingService.getAllDeliveries();
    }

    @GetMapping("/shipper/{shipperName}")
    public List<Delivery> getDeliveriesByShipper(@PathVariable String shipperName) {
        return shippingService.getDeliveriesByShipper(shipperName);
    }

    @PutMapping("/{id}/status")
    public Delivery updateDeliveryStatus(
            @PathVariable Long id,
            @RequestBody DeliveryStatusUpdateRequest request
    ) {
        return shippingService.updateDeliveryStatus(id, request);
    }
}
