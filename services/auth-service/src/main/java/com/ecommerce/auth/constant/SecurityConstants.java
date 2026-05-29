package com.ecommerce.auth.constant;

public final class SecurityConstants {

    private SecurityConstants() {
    }

    /*
     * JWT
     */
    public static final String TOKEN_PREFIX = "Bearer ";

    public static final String HEADER_STRING = "Authorization";

    /*
     * Roles
     */
    public static final String ROLE_ADMIN = "ROLE_ADMIN";

    public static final String ROLE_CUSTOMER = "ROLE_CUSTOMER";

    public static final String ROLE_SHIPPER = "ROLE_SHIPPER";

    /*
     * Public APIs
     */
    public static final String[] PUBLIC_URLS = {
            "/api/auth/**",
            "/swagger-ui/**",
            "/v3/api-docs/**",
            "/api-docs/**"
    };

    /*
     * Token Types
     */
    public static final String ACCESS_TOKEN = "ACCESS_TOKEN";

    public static final String REFRESH_TOKEN = "REFRESH_TOKEN";
}