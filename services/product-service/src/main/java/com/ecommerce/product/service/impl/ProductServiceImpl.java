package com.ecommerce.product.service.impl;

import com.ecommerce.product.dto.request.CreateProductRequest;
import com.ecommerce.product.dto.request.UpdateProductRequest;
import com.ecommerce.product.dto.response.ProductResponse;
import com.ecommerce.product.entity.Category;
import com.ecommerce.product.entity.Inventory;
import com.ecommerce.product.entity.Product;
import com.ecommerce.product.exception.ProductNotFoundException;
import com.ecommerce.product.mapper.ProductMapper;
import com.ecommerce.product.repository.CategoryRepository;
import com.ecommerce.product.repository.ProductRepository;
import com.ecommerce.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    private static final String PRODUCT_LIST_CACHE = "products:all";
    private static final String PRODUCT_CACHE_PREFIX = "product:";

    @Override
    @Transactional
    public ProductResponse createProduct(CreateProductRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + request.getCategoryId()));

        Product product = ProductMapper.toEntity(request);
        product.setCategory(category);

        Inventory inventory = Inventory.builder()
                .quantity(request.getQuantity())
                .product(product)
                .build();

        product.setInventory(inventory);

        Product savedProduct = productRepository.save(product);

        redisTemplate.delete(PRODUCT_LIST_CACHE);

        return ProductMapper.toResponse(savedProduct);
    }

    @Override
    @Transactional
    public ProductResponse updateProduct(Long id, UpdateProductRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id: " + id));

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found with id: " + request.getCategoryId()));
            product.setCategory(category);
        }

        Product savedProduct = productRepository.save(product);

        redisTemplate.delete(PRODUCT_CACHE_PREFIX + id);
        redisTemplate.delete(PRODUCT_LIST_CACHE);

        return ProductMapper.toResponse(savedProduct);
    }

    @Override
    @Transactional(readOnly = true)
    public ProductResponse getProductById(Long id) {
        String key = PRODUCT_CACHE_PREFIX + id;

        Object cachedProduct = redisTemplate.opsForValue().get(key);

        if (cachedProduct instanceof ProductResponse) {
            System.out.println("CACHE HIT product id = " + id);
            return (ProductResponse) cachedProduct;
        }

        System.out.println("CACHE MISS product id = " + id);

        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product not found with id: " + id));

        ProductResponse response = ProductMapper.toResponse(product);

        redisTemplate.opsForValue().set(key, response, 10, TimeUnit.MINUTES);

        return response;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductResponse> getAllProducts() {
        Object cachedProducts = redisTemplate.opsForValue().get(PRODUCT_LIST_CACHE);

        if (cachedProducts instanceof List<?>) {
            System.out.println("CACHE HIT product list");
            return (List<ProductResponse>) cachedProducts;
        }

        System.out.println("CACHE MISS product list");

        List<ProductResponse> products = productRepository.findAll()
                .stream()
                .map(ProductMapper::toResponse)
                .toList();

        redisTemplate.opsForValue().set(PRODUCT_LIST_CACHE, products, 10, TimeUnit.MINUTES);

        return products;
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);

        redisTemplate.delete(PRODUCT_CACHE_PREFIX + id);
        redisTemplate.delete(PRODUCT_LIST_CACHE);
    }
}
