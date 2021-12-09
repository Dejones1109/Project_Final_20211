package com.example.demo.util;

import lombok.extern.slf4j.Slf4j;

import java.text.SimpleDateFormat;
import java.util.Date;

@Slf4j
public class DateUtil {
    public static Date fromString(String dateStr) {
        return fromString(dateStr, "yyyy-mm-dd HH:mm:ss");
    }

    public static Date fromString(String dateStr, String pattern) {
        try {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
            return simpleDateFormat.parse(dateStr);
        } catch (Exception e) {
            log.error("fail to parse dateStr: " + dateStr + " of pattern: " + pattern);
        }
        return null;
    }
}
