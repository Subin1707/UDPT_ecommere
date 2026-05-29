package com.ecommerce.gateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitFilter
        implements GlobalFilter, Ordered {

    private final ConcurrentHashMap<String, Integer>
            requestCounts = new ConcurrentHashMap<>();

    @Override
    public Mono<Void> filter(
            ServerWebExchange exchange,
            GatewayFilterChain chain
    ) {

        String ip =
                exchange.getRequest()
                        .getRemoteAddress()
                        .getAddress()
                        .getHostAddress();

        requestCounts.put(ip,
                requestCounts.getOrDefault(ip, 0) + 1);

        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return 1;
    }
}
