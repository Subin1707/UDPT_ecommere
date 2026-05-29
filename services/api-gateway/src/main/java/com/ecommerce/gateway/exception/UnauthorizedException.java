package com.ecommerce.gateway.exception;

public class UnauthorizedException
        extends RuntimeException {

    public UnauthorizedException(String message) {

        super(message);
    }
}
