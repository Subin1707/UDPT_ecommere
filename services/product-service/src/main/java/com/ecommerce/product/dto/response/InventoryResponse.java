package com.ecommerce.product.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InventoryResponse {

    private Long id;

    private Long productId;

    private Integer quantity;

    private Integer reservedQuantity;

    private Integer availableQuantity;
}