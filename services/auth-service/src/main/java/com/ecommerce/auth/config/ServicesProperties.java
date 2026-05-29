package com.ecommerce.auth.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "services")
@Getter
@Setter
public class ServicesProperties {

    private UserService userService;

    @Getter
    @Setter
    public static class UserService {
        private String url;
    }
}
