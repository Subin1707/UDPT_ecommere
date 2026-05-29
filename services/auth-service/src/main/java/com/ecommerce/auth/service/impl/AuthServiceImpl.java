package com.ecommerce.auth.service.impl;

import com.ecommerce.auth.dto.request.LoginRequest;
import com.ecommerce.auth.dto.request.RefreshTokenRequest;
import com.ecommerce.auth.dto.request.RegisterRequest;

import com.ecommerce.auth.dto.response.ApiResponse;
import com.ecommerce.auth.dto.response.JwtResponse;

import com.ecommerce.auth.entity.Role;
import com.ecommerce.auth.entity.User;

import com.ecommerce.auth.exception.AuthException;

import com.ecommerce.auth.repository.RoleRepository;
import com.ecommerce.auth.repository.UserRepository;

import com.ecommerce.auth.security.jwt.JwtProvider;

import com.ecommerce.auth.service.AuthService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.core.Authentication;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

import com.ecommerce.auth.entity.enums.RoleName;@Service
@RequiredArgsConstructor
@Transactional
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtProvider jwtProvider;

    @Override
    public ApiResponse<JwtResponse> register(
            RegisterRequest request
    ) {

        if (userRepository.existsByUsername(request.getUsername())) {

            throw new AuthException("Username already exists");
        }

        if (userRepository.existsByEmail(request.getEmail())) {

            throw new AuthException("Email already exists");
        }

        Role customerRole = roleRepository
                .findByName(RoleName.ROLE_CUSTOMER)
                .orElseThrow(() ->
                        new AuthException("Default role not found")
                );

        User user = new User();

        user.setUsername(request.getUsername());

        user.setEmail(request.getEmail());

        user.setFullName(request.getFullName());

        user.setPassword(
                passwordEncoder.encode(
                        request.getPassword()
                )
        );

        user.setEnabled(true);

        user.setRoles(Set.of(customerRole));

        userRepository.save(user);

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getUsername(),
                                request.getPassword()
                        )
                );

        String accessToken =
                jwtProvider.generateAccessToken(authentication);

        String refreshToken =
                jwtProvider.generateRefreshToken(authentication);

        JwtResponse jwtResponse =
                JwtResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .tokenType("Bearer")
                        .build();

        return ApiResponse.<JwtResponse>builder()
                .success(true)
                .message("Register successful")
                .data(jwtResponse)
                .build();
    }

    @Override
    public ApiResponse<JwtResponse> login(
            LoginRequest request
    ) {

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                request.getUsernameOrEmail(),
                                request.getPassword()
                        )
                );

        String accessToken =
                jwtProvider.generateAccessToken(authentication);

        String refreshToken =
                jwtProvider.generateRefreshToken(authentication);

        JwtResponse jwtResponse =
                JwtResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .tokenType("Bearer")
                        .build();

        return ApiResponse.<JwtResponse>builder()
                .success(true)
                .message("Login successful")
                .data(jwtResponse)
                .build();
    }

    @Override
    public ApiResponse<JwtResponse> refreshToken(
            RefreshTokenRequest request
    ) {

        if (!jwtProvider.validateToken(
                request.getRefreshToken()
        )) {

            throw new AuthException("Invalid refresh token");
        }

        String username =
                jwtProvider.getUsernameFromToken(
                        request.getRefreshToken()
                );

        Authentication authentication =
                authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(
                                username,
                                null
                        )
                );

        String accessToken =
                jwtProvider.generateAccessToken(authentication);

        String refreshToken =
                jwtProvider.generateRefreshToken(authentication);

        JwtResponse jwtResponse =
                JwtResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .tokenType("Bearer")
                        .build();

        return ApiResponse.<JwtResponse>builder()
                .success(true)
                .message("Token refreshed")
                .data(jwtResponse)
                .build();
    }

    @Override
    public ApiResponse<String> logout(
            String token
    ) {

        return ApiResponse.<String>builder()
                .success(true)
                .message("Logout successful")
                .data(null)
                .build();
    }
}