package com.ecommerce.product.config;

import com.ecommerce.product.entity.Category;
import com.ecommerce.product.entity.Inventory;
import com.ecommerce.product.entity.Product;
import com.ecommerce.product.entity.ProductImage;
import com.ecommerce.product.repository.CategoryRepository;
import com.ecommerce.product.repository.ProductRepository;
import java.math.BigDecimal;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class ProductDataSeeder implements CommandLineRunner {

    private static final long TARGET_PRODUCT_COUNT = 50;

    private static final String[] PRODUCT_TYPES = {
            "Laptop học tập", "Tai nghe Bluetooth", "Bàn phím cơ", "Chuột không dây", "Màn hình văn phòng",
            "Áo khoác nam", "Váy công sở", "Giày sneaker", "Balo laptop", "Đồng hồ thông minh"
    };

    private static final String[] BRANDS = {
            "Dell", "HP", "Logitech", "Samsung", "UrbanStyle", "SoundPro", "Xiaomi", "Anker", "Lenovo", "Nike"
    };

    private static final String[] IMAGE_URLS = {
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80"
    };

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    @Override
    @Transactional
    public void run(String... args) {
        Category laptop = createCategoryIfMissing("Laptop", "Máy tính xách tay phục vụ học tập và làm việc");
        Category audio = createCategoryIfMissing("Âm thanh", "Tai nghe, loa và phụ kiện âm thanh");
        Category accessory = createCategoryIfMissing("Phụ kiện", "Phụ kiện công nghệ cho văn phòng và cá nhân");
        Category fashion = createCategoryIfMissing("Thời trang", "Quần áo, giày dép và phụ kiện thời trang");
        Category device = createCategoryIfMissing("Thiết bị thông minh", "Thiết bị thông minh cho cuộc sống hiện đại");

        Category[] categories = {laptop, audio, accessory, accessory, device, fashion, fashion, fashion, accessory, device};

        int seedIndex = 1;
        while (productRepository.count() < TARGET_PRODUCT_COUNT) {
            int index = (seedIndex - 1) % PRODUCT_TYPES.length;
            String name = PRODUCT_TYPES[index] + " " + String.format("%02d", seedIndex);

            if (productRepository.findByName(name).isEmpty()) {
                createProduct(
                        name,
                        "Sản phẩm test số " + seedIndex + " dùng để kiểm thử danh mục, tồn kho, ảnh và luồng đặt hàng.",
                        BRANDS[index],
                        BigDecimal.valueOf(250_000L + (long) seedIndex * 175_000L),
                        5 + (seedIndex % 40),
                        categories[index],
                        IMAGE_URLS[index]
                );
            }

            seedIndex++;
        }
    }

    private Category createCategoryIfMissing(String name, String description) {
        return categoryRepository.findByName(name)
                .orElseGet(() -> categoryRepository.save(Category.builder()
                        .name(name)
                        .description(description)
                        .build()));
    }

    private void createProduct(
            String name,
            String description,
            String brand,
            BigDecimal price,
            Integer quantity,
            Category category,
            String imageUrl
    ) {
        Product product = Product.builder()
                .name(name)
                .description(description)
                .brand(brand)
                .price(price)
                .active(true)
                .category(category)
                .build();

        Inventory inventory = Inventory.builder()
                .quantity(quantity)
                .product(product)
                .build();

        ProductImage image = ProductImage.builder()
                .imageUrl(imageUrl)
                .product(product)
                .build();

        product.setInventory(inventory);
        product.setImages(List.of(image));
        productRepository.save(product);
    }
}
