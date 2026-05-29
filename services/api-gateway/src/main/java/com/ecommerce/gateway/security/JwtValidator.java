package com.ecommerce.gateway.security;

import org.springframework.stereotype.Component;

@Component
public class JwtValidator {

    public boolean isValid(String token) {

        return JwtUtil.validateToken(token);
    }

    public String getUsername(String token) {

        return JwtUtil.getUsername(token);
    }
}
