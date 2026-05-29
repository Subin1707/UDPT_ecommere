package com.ecommerce.auth.event;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserLoggedInEvent {

    private UUID userId;

    private String username;

    private String email;

    private LocalDateTime loginAt;

    private String ipAddress;
}