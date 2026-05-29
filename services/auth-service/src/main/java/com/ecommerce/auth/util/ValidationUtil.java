package com.ecommerce.auth.util;

import java.util.regex.Pattern;

public final class ValidationUtil {

    private ValidationUtil() {
    }

    /**
     * Email regex pattern
     */
    private static final Pattern EMAIL_PATTERN =
            Pattern.compile(
                    "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$"
            );

    /**
     * Username regex pattern
     * 4-20 chars
     */
    private static final Pattern USERNAME_PATTERN =
            Pattern.compile(
                    "^[a-zA-Z0-9._-]{4,20}$"
            );

    /**
     * Validate email
     */
    public static boolean isValidEmail(
            String email
    ) {

        return email != null
                && EMAIL_PATTERN
                .matcher(email)
                .matches();
    }

    /**
     * Validate username
     */
    public static boolean isValidUsername(
            String username
    ) {

        return username != null
                && USERNAME_PATTERN
                .matcher(username)
                .matches();
    }

    /**
     * Check null or empty
     */
    public static boolean isNullOrEmpty(
            String value
    ) {

        return value == null
                || value.trim().isEmpty();
    }

    /**
     * Check minimum length
     */
    public static boolean hasMinLength(
            String value,
            int minLength
    ) {

        return value != null
                && value.length() >= minLength;
    }

    /**
     * Check maximum length
     */
    public static boolean hasMaxLength(
            String value,
            int maxLength
    ) {

        return value != null
                && value.length() <= maxLength;
    }
}