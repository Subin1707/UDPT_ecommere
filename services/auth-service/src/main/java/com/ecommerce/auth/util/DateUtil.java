package com.ecommerce.auth.util;

import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

public final class DateUtil {

    private DateUtil() {
    }

    public static final String DEFAULT_DATE_TIME_FORMAT =
            "yyyy-MM-dd HH:mm:ss";

    public static String format(
            LocalDateTime dateTime
    ) {

        return dateTime.format(
                DateTimeFormatter.ofPattern(
                        DEFAULT_DATE_TIME_FORMAT
                )
        );
    }

    public static LocalDateTime nowUtc() {

        return LocalDateTime.now(ZoneOffset.UTC);
    }
}