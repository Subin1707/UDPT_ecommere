package com.ecommerce.product.dto.request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class UpdateProductRequest {

    private String name;

    private String description;

    private BigDecimal price;

    private Long categoryId;
}