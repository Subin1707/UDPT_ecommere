package com.ecommerce.product.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductImageResponse {

    private Long id;

    private String imageUrl;

    private Boolean thumbnail;
}