package com.ecommerce.auth.controller;

import com.ecommerce.auth.dto.request.UserCreateRequest;
import com.ecommerce.auth.dto.response.ApiResponse;
import com.ecommerce.auth.dto.response.UserResponse;
import com.ecommerce.auth.entity.Role;
import com.ecommerce.auth.entity.User;
import com.ecommerce.auth.entity.enums.RoleName;
import com.ecommerce.auth.exception.AuthException;
import com.ecommerce.auth.mapper.UserMapper;
import com.ecommerce.auth.repository.RoleRepository;
import com.ecommerce.auth.repository.UserRepository;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/users")
@RequiredArgsConstructor
public class UserAdminController {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @GetMapping
    public ApiResponse<List<UserResponse>> getUsers() {
        return ApiResponse.success(
                "Users loaded",
                userRepository.findAll().stream().map(UserMapper::toResponse).toList()
        );
    }

    @GetMapping("/shippers")
    public ApiResponse<List<UserResponse>> getShippers() {
        return ApiResponse.success(
                "Shippers loaded",
                userRepository.findAll().stream()
                        .map(UserMapper::toResponse)
                        .filter(user -> "SHIPPER".equals(user.getRole()))
                        .toList()
        );
    }

    @PostMapping
    public ApiResponse<UserResponse> createUser(@Valid @RequestBody UserCreateRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new AuthException("Username already exists");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AuthException("Email already exists");
        }

        Role role = roleRepository.findByName(RoleName.valueOf("ROLE_" + request.getRole()))
                .orElseThrow(() -> new AuthException("Role not found"));

        User user = new User();
        user.setFullName(request.getFullName());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setEnabled(true);
        user.setRoles(Set.of(role));

        return ApiResponse.success("User created", UserMapper.toResponse(userRepository.save(user)));
    }

    @PutMapping("/{id}/status")
    public ApiResponse<UserResponse> updateStatus(@PathVariable UUID id, @RequestBody StatusRequest request) {
        User user = userRepository.findById(id).orElseThrow(() -> new AuthException("User not found"));
        user.setEnabled("ACTIVE".equals(request.status()));
        return ApiResponse.success("User status updated", UserMapper.toResponse(userRepository.save(user)));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteUser(@PathVariable UUID id) {
        User user = userRepository.findById(id).orElseThrow(() -> new AuthException("User not found"));
        if (user.getRoles().stream().anyMatch(role -> role.getName() == RoleName.ROLE_ADMIN)) {
            throw new AuthException("Cannot delete admin user");
        }
        userRepository.delete(user);
        return ApiResponse.success("User deleted", "OK");
    }

    public record StatusRequest(String status) {
    }
}
