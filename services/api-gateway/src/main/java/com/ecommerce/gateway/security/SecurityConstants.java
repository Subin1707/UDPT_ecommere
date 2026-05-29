package com.ecommerce.gateway.security;

public class SecurityConstants {

    private SecurityConstants() {
    }

    public static final String SECRET =
            "mySecretKeymySecretKeymySecretKey";

    public static final String TOKEN_PREFIX =
            "Bearer ";

    public static final String HEADER =
            "Authorization";

    public static final long EXPIRATION =
            86400000;
}
