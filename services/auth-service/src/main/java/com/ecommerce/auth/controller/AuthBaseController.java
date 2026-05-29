package com.ecommerce.auth.controller;

import com.ecommerce.auth.dto.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthBaseController {

    /**
     * Get Auth Service Info
     */
    @GetMapping
    public ApiResponse<String> getAuthInfo() {
        return ApiResponse.<String>builder()
                .success(true)
                .message("Authentication Service")
                .data("API endpoints: POST /api/auth/register, POST /api/auth/login, POST /api/auth/refresh-token, POST /api/auth/logout")
                .build();
    }
}
