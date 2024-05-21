package com.java08.quanlituyendung.exception;

public class CompanyException extends RuntimeException {

    public CompanyException(String message) {
        super(message);
    }

    public CompanyException(String message, Throwable cause) {
        super(message, cause);
    }

}
