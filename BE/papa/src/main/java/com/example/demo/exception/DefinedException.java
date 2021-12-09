package com.example.demo.exception;

import com.example.demo.constant.ErrorCode;

public class DefinedException extends Exception {
    private ErrorCode errorCode;


    public DefinedException() {
        super();
    }

    public DefinedException(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }

    public DefinedException(ErrorCode errorCode, String errorMessage) {
        super(errorMessage);
        this.errorCode = errorCode;
    }

    public DefinedException(ErrorCode errorCode, String errorMessage, Throwable cause) {
        super(errorMessage, cause);
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(ErrorCode errorCode) {
        this.errorCode = errorCode;
    }

    public String getCode(){
        return errorCode.code();
    }
}
