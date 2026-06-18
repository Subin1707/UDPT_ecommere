package com.ecommere.order.client;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestClientResponseException;

@Component
public class ProductInventoryClient {

    private final RestClient restClient;

    public ProductInventoryClient(
            RestClient.Builder restClientBuilder,
            @Value("${product-service.url:http://localhost:8082}") String productServiceUrl
    ) {
        this.restClient = restClientBuilder
                .baseUrl(productServiceUrl)
                .build();
    }

    public void decreaseStock(Long productId, Integer quantity) {
        try {
            restClient.post()
                    .uri(uriBuilder -> uriBuilder
                            .path("/api/inventory/{productId}/decrease")
                            .queryParam("quantity", quantity)
                            .build(productId))
                    .retrieve()
                    .toBodilessEntity();
        } catch (RestClientResponseException ex) {
            if (ex.getStatusCode() == HttpStatus.CONFLICT) {
                throw new IllegalStateException("OUT_OF_STOCK");
            }

            throw ex;
        }
    }
}
