package com.ecommerce.product.dto.request;

import lombok.Data;

@Data
public class CreateReviewRequest {

    private Long productId;

    private Long userId;

    private Integer rating;

    private String comment;
}