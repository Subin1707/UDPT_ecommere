package com.ecommerce.product.service;

import com.ecommerce.product.dto.request.CreateCategoryRequest;
import com.ecommerce.product.dto.response.CategoryResponse;

import java.util.List;

public interface CategoryService {

    CategoryResponse createCategory(CreateCategoryRequest request);

    CategoryResponse getCategoryById(Long id);

    List<CategoryResponse> getAllCategories();

    void deleteCategory(Long id);
}