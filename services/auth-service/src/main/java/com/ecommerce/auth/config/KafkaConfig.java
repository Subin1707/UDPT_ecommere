package com.ecommerce.auth.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KafkaConfig {

    /**
     * Topic: user registration
     */
    @Bean
    public NewTopic userRegisteredTopic() {

        return new NewTopic(
                "user-registered",
                1,
                (short) 1
        );
    }

    /**
     * Topic: user login
     */
    @Bean
    public NewTopic userLoginTopic() {

        return new NewTopic(
                "user-login",
                1,
                (short) 1
        );
    }
}