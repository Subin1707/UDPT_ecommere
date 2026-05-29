package com.ecommerce.product.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductReviewResponse {

    private Long id;

    private Long userId;

    private Integer rating;

    private String comment;

    private LocalDateTime createdAt;
}