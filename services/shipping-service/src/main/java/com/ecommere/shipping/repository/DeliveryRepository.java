package com.ecommere.shipping.repository;

import com.ecommere.shipping.entity.Delivery;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DeliveryRepository extends JpaRepository<Delivery, Long> {

    Optional<Delivery> findByOrderId(Long orderId);

    List<Delivery> findByShipperName(String shipperName);
}
