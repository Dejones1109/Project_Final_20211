package com.example.demo.constant;

public enum ErrorCode {
    INVALID_INPUT("001"),
    NOT_FOUND("002");

    private final String code;

    ErrorCode(String code) {
        this.code = code;
    }

    public String code() {
        return code;
    }
}
