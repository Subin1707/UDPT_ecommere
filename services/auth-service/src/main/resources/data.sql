INSERT IGNORE INTO roles (id, name, created_at, updated_at)
VALUES (
    UUID_TO_BIN(UUID()),
    'ROLE_ADMIN',
    NOW(),
    NOW()
);

INSERT IGNORE INTO roles (id, name, created_at, updated_at)
VALUES (
    UUID_TO_BIN(UUID()),
    'ROLE_CUSTOMER',
    NOW(),
    NOW()
);

INSERT IGNORE INTO roles (id, name, created_at, updated_at)
VALUES (
    UUID_TO_BIN(UUID()),
    'ROLE_SHIPPER',
    NOW(),
    NOW()
);