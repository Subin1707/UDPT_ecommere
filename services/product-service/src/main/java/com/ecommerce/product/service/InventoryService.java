package com.ecommerce.product.service;

import com.ecommerce.product.dto.response.InventoryResponse;

public interface InventoryService {

    InventoryResponse getInventoryByProductId(Long productId);

    InventoryResponse updateStock(Long productId, Integer quantity);

    void increaseStock(Long productId, Integer quantity);

    void decreaseStock(Long productId, Integer quantity);
}