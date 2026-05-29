package com.ecommerce.auth.util;

public final class PasswordUtil {

    private PasswordUtil() {
    }

    public static boolean isStrongPassword(
            String password
    ) {

        return password != null
                && password.length() >= 8
                && password.matches(".*[A-Z].*")
                && password.matches(".*[a-z].*")
                && password.matches(".*\\d.*")
                && password.matches(".*[@#$%^&+=!].*");
    }
}