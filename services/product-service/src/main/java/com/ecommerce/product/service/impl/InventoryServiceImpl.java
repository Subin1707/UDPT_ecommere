package com.ecommerce.product.service.impl;

import com.ecommerce.product.dto.response.InventoryResponse;
import com.ecommerce.product.service.InventoryService;
import org.springframework.stereotype.Service;

@Service
public class InventoryServiceImpl implements InventoryService {

    @Override
    public InventoryResponse getInventoryByProductId(Long productId) {
        return null;
    }

    @Override
    public InventoryResponse updateStock(Long productId, Integer quantity) {
        return null;
    }

    @Override
    public void increaseStock(Long productId, Integer quantity) {

    }

    @Override
    public void decreaseStock(Long productId, Integer quantity) {

    }
}