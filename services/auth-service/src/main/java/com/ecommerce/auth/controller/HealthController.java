package com.ecommerce.auth.controller;

import com.ecommerce.auth.dto.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class HealthController {

    @GetMapping("/")
    public ResponseEntity<ApiResponse<String>> rootHome() {
        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .success(true)
                        .message("Auth Service - API Gateway for Authentication")
                        .data("Welcome!")
                        .build()
        );
    }

    @GetMapping("/api")
    public ResponseEntity<ApiResponse<String>> home() {
        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .success(true)
                        .message("Auth Service - API Gateway for Authentication")
                        .data("Welcome!")
                        .build()
        );
    }

    @GetMapping("/api/")
    public ResponseEntity<ApiResponse<String>> apiHome() {
        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .success(true)
                        .message("Auth Service - API Gateway for Authentication")
                        .data("Welcome!")
                        .build()
        );
    }

    @GetMapping("/api/health")
    public ResponseEntity<ApiResponse<String>> health() {
        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .success(true)
                        .message("Auth Service is running")
                        .data("OK")
                        .build()
        );
    }

    @GetMapping("/health")
    public ResponseEntity<ApiResponse<String>> rootHealth() {
        return ResponseEntity.ok(
                ApiResponse.<String>builder()
                        .success(true)
                        .message("Auth Service is running")
                        .data("OK")
                        .build()
        );
    }
}
