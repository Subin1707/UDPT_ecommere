package com.ecommerce.product.service.impl;

import com.ecommerce.product.dto.response.InventoryResponse;
import com.ecommerce.product.entity.Inventory;
import com.ecommerce.product.exception.ProductNotFoundException;
import com.ecommerce.product.repository.InventoryRepository;
import com.ecommerce.product.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private static final String PRODUCT_LIST_CACHE = "products:all";
    private static final String PRODUCT_CACHE_PREFIX = "product:";
    private static final String INVENTORY_LOCK_PREFIX = "inventory:lock:";

    private final InventoryRepository inventoryRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    @Transactional(readOnly = true)
    public InventoryResponse getInventoryByProductId(Long productId) {
        Inventory inventory = findInventory(productId);
        return toResponse(inventory);
    }

    @Override
    @Transactional
    public InventoryResponse updateStock(Long productId, Integer quantity) {
        return withInventoryLock(productId, () -> {
            validateQuantity(quantity);
            Inventory inventory = findInventory(productId);
            inventory.setQuantity(quantity);
            Inventory savedInventory = inventoryRepository.save(inventory);
            evictProductCache(productId);
            return toResponse(savedInventory);
        });
    }

    @Override
    @Transactional
    public void increaseStock(Long productId, Integer quantity) {
        withInventoryLock(productId, () -> {
            validateQuantity(quantity);
            Inventory inventory = findInventory(productId);
            inventory.setQuantity(inventory.getQuantity() + quantity);
            inventoryRepository.save(inventory);
            evictProductCache(productId);
            return null;
        });
    }

    @Override
    @Transactional
    public void decreaseStock(Long productId, Integer quantity) {
        withInventoryLock(productId, () -> {
            validateQuantity(quantity);
            Inventory inventory = findInventory(productId);
            Integer currentQuantity = inventory.getQuantity() == null ? 0 : inventory.getQuantity();

            if (currentQuantity < quantity) {
                throw new IllegalStateException("OUT_OF_STOCK");
            }

            inventory.setQuantity(currentQuantity - quantity);
            inventoryRepository.save(inventory);
            evictProductCache(productId);
            return null;
        });
    }

    private Inventory findInventory(Long productId) {
        return inventoryRepository.findByProductId(productId)
                .orElseThrow(() -> new ProductNotFoundException("Inventory not found for product id: " + productId));
    }

    private void validateQuantity(Integer quantity) {
        if (quantity == null || quantity < 0) {
            throw new IllegalArgumentException("Quantity must be greater than or equal to 0");
        }
    }

    private <T> T withInventoryLock(Long productId, LockedInventoryAction<T> action) {
        String lockKey = INVENTORY_LOCK_PREFIX + productId;
        String lockValue = UUID.randomUUID().toString();
        Boolean locked = redisTemplate.opsForValue().setIfAbsent(lockKey, lockValue, 10, TimeUnit.SECONDS);

        if (!Boolean.TRUE.equals(locked)) {
            throw new IllegalStateException("INVENTORY_LOCKED");
        }

        try {
            return action.execute();
        } finally {
            Object currentLockValue = redisTemplate.opsForValue().get(lockKey);
            if (lockValue.equals(currentLockValue)) {
                redisTemplate.delete(lockKey);
            }
        }
    }

    private void evictProductCache(Long productId) {
        redisTemplate.delete(PRODUCT_CACHE_PREFIX + productId);
        redisTemplate.delete(PRODUCT_LIST_CACHE);
    }

    private InventoryResponse toResponse(Inventory inventory) {
        Integer quantity = inventory.getQuantity() == null ? 0 : inventory.getQuantity();

        return InventoryResponse.builder()
                .id(inventory.getId())
                .productId(inventory.getProduct().getId())
                .quantity(quantity)
                .reservedQuantity(0)
                .availableQuantity(quantity)
                .build();
    }

    private interface LockedInventoryAction<T> {
        T execute();
    }
}
