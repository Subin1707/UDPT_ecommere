package com.ecommerce.auth.mapper;

import com.ecommerce.auth.dto.response.UserResponse;
import com.ecommerce.auth.entity.Role;
import com.ecommerce.auth.entity.User;

import java.util.Set;
import java.util.stream.Collectors;

public class UserMapper {

    private UserMapper() {
    }

    /**
     * Convert User Entity -> UserResponse
     */
    public static UserResponse toResponse(User user) {

        Set<String> roles = user.getRoles()
                .stream()
                .map(Role::getName)
                .map(Enum::name)
                .collect(Collectors.toSet());

        return UserResponse.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .address(user.getAddress())
                .role(roles.stream()
                        .findFirst()
                        .map(role -> role.replace("ROLE_", ""))
                        .orElse("CUSTOMER"))
                .status(Boolean.TRUE.equals(user.getEnabled()) ? "ACTIVE" : "LOCKED")
                .enabled(user.getEnabled())
                .roles(roles)
                .createdAt(user.getCreatedAt())
                .build();
    }
}
