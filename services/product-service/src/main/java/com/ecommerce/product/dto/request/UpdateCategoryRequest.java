package com.ecommerce.product.dto.request;

import lombok.Data;

@Data
public class UpdateCategoryRequest {

    private String name;

    private String description;
}