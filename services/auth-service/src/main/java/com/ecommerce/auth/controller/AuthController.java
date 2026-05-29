package com.ecommerce.auth.controller;

import com.ecommerce.auth.dto.request.LoginRequest;
import com.ecommerce.auth.dto.request.RefreshTokenRequest;
import com.ecommerce.auth.dto.request.RegisterRequest;

import com.ecommerce.auth.dto.response.ApiResponse;
import com.ecommerce.auth.dto.response.JwtResponse;

import com.ecommerce.auth.service.AuthService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    /**
     * Get Auth Service Info
     */
    @GetMapping
    public ApiResponse<String> getAuthInfo() {
        return ApiResponse.<String>builder()
                .success(true)
                .message("Authentication Service")
                .data("Available endpoints: POST /register, POST /login, POST /refresh-token, POST /logout")
                .build();
    }

    /**
     * Register
     */
    @PostMapping("/register")
    public ApiResponse<JwtResponse> register(
            @Valid @RequestBody RegisterRequest request
    ) {

        return authService.register(request);
    }

    /**
     * Login
     */
    @PostMapping("/login")
    public ApiResponse<JwtResponse> login(
            @Valid @RequestBody LoginRequest request
    ) {

        return authService.login(request);
    }

    /**
     * Refresh Token
     */
    @PostMapping("/refresh-token")
    public ApiResponse<JwtResponse> refreshToken(
            @Valid @RequestBody RefreshTokenRequest request
    ) {

        return authService.refreshToken(request);
    }

    /**
     * Logout
     */
    @PostMapping("/logout")
    public ApiResponse<String> logout(
            @RequestHeader("Authorization") String token
    ) {

        return authService.logout(token);
    }
}