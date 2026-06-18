package com.ecommerce.product.controller;

import com.ecommerce.product.dto.response.InventoryResponse;
import com.ecommerce.product.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @GetMapping("/{productId}")
    public InventoryResponse getInventory(
            @PathVariable Long productId
    ) {
        return inventoryService.getInventoryByProductId(productId);
    }

    @PutMapping("/{productId}")
    public InventoryResponse updateStock(
            @PathVariable Long productId,
            @RequestParam Integer quantity
    ) {
        return inventoryService.updateStock(
                productId,
                quantity
        );
    }

    @PostMapping("/{productId}/decrease")
    public void decreaseStock(
            @PathVariable Long productId,
            @RequestParam Integer quantity
    ) {
        inventoryService.decreaseStock(productId, quantity);
    }

    @PostMapping("/{productId}/increase")
    public void increaseStock(
            @PathVariable Long productId,
            @RequestParam Integer quantity
    ) {
        inventoryService.increaseStock(productId, quantity);
    }
}
