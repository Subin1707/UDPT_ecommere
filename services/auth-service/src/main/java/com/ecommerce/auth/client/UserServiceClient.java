package com.ecommerce.auth.client;

import com.ecommerce.auth.dto.response.ApiResponse;
import com.ecommerce.auth.dto.response.UserResponse;

import org.springframework.cloud.openfeign.FeignClient;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.UUID;

@FeignClient(
        name = "user-service",
        url = "${services.user-service.url}"
)
public interface UserServiceClient {

    @GetMapping("/api/users/{id}")
    ApiResponse<UserResponse> getUserById(
            @PathVariable UUID id
    );
}