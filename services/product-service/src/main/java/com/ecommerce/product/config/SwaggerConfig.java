package com.ecommerce.product.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI productServiceOpenAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("Product Service API")
                        .description("API quản lý sản phẩm cho hệ thống Ecommerce")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Ecommerce Team")
                                .email("admin@ecommerce.com"))
                        .license(new License()
                                .name("Apache 2.0")))
                .externalDocs(new ExternalDocumentation()
                        .description("Project Documentation")
                        .url("https://github.com/ecommerce/project"));
    }
}