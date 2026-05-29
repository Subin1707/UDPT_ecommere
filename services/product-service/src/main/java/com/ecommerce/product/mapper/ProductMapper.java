package com.ecommerce.product.mapper;

import com.ecommerce.product.dto.request.CreateProductRequest;
import com.ecommerce.product.dto.response.CategoryResponse;
import com.ecommerce.product.dto.response.ProductImageResponse;
import com.ecommerce.product.dto.response.ProductResponse;
import com.ecommerce.product.entity.Category;
import com.ecommerce.product.entity.Product;
import com.ecommerce.product.entity.ProductImage;

import java.util.Collections;
import java.util.List;

public class ProductMapper {

    private ProductMapper() {
    }

    public static Product toEntity(CreateProductRequest request) {

        Product product = new Product();

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());

        return product;
    }

    public static ProductResponse toResponse(Product product) {

        ProductResponse response = new ProductResponse();

        response.setId(product.getId());
        response.setName(product.getName());
        response.setDescription(product.getDescription());
        response.setPrice(product.getPrice());
        response.setStock(product.getInventory() != null ? product.getInventory().getQuantity() : null);
        response.setActive(product.getActive());
        response.setCategory(toCategoryResponse(product.getCategory()));
        response.setImages(toImageResponses(product.getImages()));
        response.setCreatedAt(product.getCreatedAt());
        response.setUpdatedAt(product.getUpdatedAt());

        return response;
    }

    private static CategoryResponse toCategoryResponse(Category category) {
        if (category == null) {
            return null;
        }

        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .build();
    }

    private static List<ProductImageResponse> toImageResponses(List<ProductImage> images) {
        if (images == null) {
            return Collections.emptyList();
        }

        return images.stream()
                .map(image -> ProductImageResponse.builder()
                        .id(image.getId())
                        .imageUrl(image.getImageUrl())
                        .build())
                .toList();
    }
}
