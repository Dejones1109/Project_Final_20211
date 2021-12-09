package com.example.demo.util;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.text.SimpleDateFormat;
import java.util.Date;

public class StringUtil {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static boolean isEmpty(String str) {
        return str == null || str.isEmpty();
    }

    public static String nvl(String str, String valueIfNull) {
        return str != null ? str : valueIfNull;
    }

    public static String toJsonString(Object object) {
        try {
            return objectMapper.writeValueAsString(object);
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }

    public static String fromDate(Date date, String pattern) {
        try {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern);
            return simpleDateFormat.format(date);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "";
    }
}