-- =========================
-- CATEGORY
-- =========================

INSERT INTO categories (id, name, description)
VALUES
(1, 'Laptop', 'Laptop gaming và văn phòng'),
(2, 'Phone', 'Điện thoại thông minh'),
(3, 'Accessory', 'Phụ kiện công nghệ');



-- =========================
-- PRODUCT
-- =========================

INSERT INTO products (
    id,
    name,
    description,
    price,
    brand,
    active,
    created_at,
    updated_at,
    category_id
)
VALUES
(
    1,
    'MacBook Pro M3',
    'Laptop Apple hiệu năng cao',
    2499.99,
    'Apple',
    true,
    NOW(),
    NOW(),
    1
),
(
    2,
    'iPhone 15 Pro Max',
    'Điện thoại flagship Apple',
    1599.99,
    'Apple',
    true,
    NOW(),
    NOW(),
    2
),
(
    3,
    'Logitech G Pro X',
    'Tai nghe gaming cao cấp',
    199.99,
    'Logitech',
    true,
    NOW(),
    NOW(),
    3
);



-- =========================
-- INVENTORY
-- =========================

INSERT INTO inventories (
    id,
    quantity,
    product_id
)
VALUES
(1, 20, 1),
(2, 35, 2),
(3, 50, 3);



-- =========================
-- PRODUCT IMAGE
-- =========================

INSERT INTO product_images (
    id,
    image_url,
    product_id
)
VALUES
(
    1,
    'https://example.com/macbook.jpg',
    1
),
(
    2,
    'https://example.com/iphone.jpg',
    2
),
(
    3,
    'https://example.com/headphone.jpg',
    3
);



-- =========================
-- PRODUCT REVIEW
-- =========================

INSERT INTO product_reviews (
    id,
    user_id,
    rating,
    comment,
    created_at,
    product_id
)
VALUES
(
    1,
    101,
    5,
    'Sản phẩm cực tốt',
    NOW(),
    1
),
(
    2,
    102,
    4,
    'Hiệu năng ổn',
    NOW(),
    2
),
(
    3,
    103,
    5,
    'Tai nghe âm thanh rất hay',
    NOW(),
    3
);