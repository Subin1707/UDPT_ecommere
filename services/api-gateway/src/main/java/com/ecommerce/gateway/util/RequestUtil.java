package com.ecommerce.gateway.util;

import org.springframework.web.server.ServerWebExchange;

public class RequestUtil {

    private RequestUtil() {
    }

    public static String getRequestPath(
            ServerWebExchange exchange
    ) {

        return exchange.getRequest()
                .getURI()
                .getPath();
    }

    public static String getMethod(
            ServerWebExchange exchange
    ) {

        return exchange.getRequest()
                .getMethod()
                .name();
    }
}
