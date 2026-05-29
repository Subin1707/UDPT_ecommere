package com.ecommerce.auth.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Data
@Builder
public class UserResponse {

    private UUID id;

    private String username;

    private String email;

    private String fullName;

    private String phone;

    private Set<String> roles;

    private Boolean enabled;

    private LocalDateTime createdAt;
}