package com.ecommerce.gateway.util;

import org.springframework.web.server.ServerWebExchange;

public class IpUtil {

    private IpUtil() {
    }

    public static String getClientIp(
            ServerWebExchange exchange
    ) {

        String xForwardedFor =
                exchange.getRequest()
                        .getHeaders()
                        .getFirst("X-Forwarded-For");

        if (xForwardedFor != null &&
                !xForwardedFor.isEmpty()) {

            return xForwardedFor.split(",")[0];
        }

        return exchange.getRequest()
                .getRemoteAddress()
                .getAddress()
                .getHostAddress();
    }
}
