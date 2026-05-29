package com.ecommerce.auth.service;

import com.ecommerce.auth.dto.request.LoginRequest;
import com.ecommerce.auth.dto.request.RefreshTokenRequest;
import com.ecommerce.auth.dto.request.RegisterRequest;

import com.ecommerce.auth.dto.response.ApiResponse;
import com.ecommerce.auth.dto.response.JwtResponse;

public interface AuthService {

    ApiResponse<JwtResponse> register(
            RegisterRequest request
    );

    ApiResponse<JwtResponse> login(
            LoginRequest request
    );

    ApiResponse<JwtResponse> refreshToken(
            RefreshTokenRequest request
    );

    ApiResponse<String> logout(
            String token
    );
}