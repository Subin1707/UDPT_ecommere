package com.ecommerce.auth.security.jwt;

import jakarta.servlet.http.HttpServletRequest;
import lombok.experimental.UtilityClass;
import org.springframework.util.StringUtils;

@UtilityClass
public class JwtUtils {

    private static final String AUTHORIZATION_HEADER = "Authorization";

    private static final String BEARER_PREFIX = "Bearer ";

    /**
     * Extract JWT token from Authorization header
     *
     * Header format:
     * Authorization: Bearer <token>
     */
    public static String extractTokenFromRequest(
            HttpServletRequest request
    ) {

        String bearerToken =
                request.getHeader(AUTHORIZATION_HEADER);

        if (StringUtils.hasText(bearerToken)
                && bearerToken.startsWith(BEARER_PREFIX)) {

            return bearerToken.substring(BEARER_PREFIX.length());
        }

        return null;
    }

    /**
     * Check if Authorization header exists
     */
    public static boolean hasAuthorizationHeader(
            HttpServletRequest request
    ) {

        return StringUtils.hasText(
                request.getHeader(AUTHORIZATION_HEADER)
        );
    }

    /**
     * Validate Bearer token format
     */
    public static boolean isBearerToken(String token) {

        return StringUtils.hasText(token)
                && token.startsWith(BEARER_PREFIX);
    }

    /**
     * Extract raw token from Bearer token
     */
    public static String extractBearerToken(String bearerToken) {

        if (isBearerToken(bearerToken)) {
            return bearerToken.substring(BEARER_PREFIX.length());
        }

        return null;
    }
}