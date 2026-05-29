package com.ecommerce.auth.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {

    private JwtResponse tokens;

    private UserResponse user;
}