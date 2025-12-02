package com.app.patients.exceptions;

import org.springframework.http.HttpStatus;

public enum ErrorCode {

    PATIENT_NOT_FOUND("Patient not found", HttpStatus.NOT_FOUND),
    DELETE_NOT_FOUND("Cannot delete: patient does not exist", HttpStatus.NOT_FOUND),
    DEBT_EMPTY("This patient has no pending debt.", HttpStatus.BAD_REQUEST),
    UNAUTHORIZED_PATIENT_ACCESS("You do not have permission to access this patient.", HttpStatus.FORBIDDEN),
    USER_HAS_NO_DEBT("None of your patients have pending debt.", HttpStatus.BAD_REQUEST);

    private final String defaultMessage;
    private final HttpStatus status;

    ErrorCode(String msg, HttpStatus status) {
        this.defaultMessage = msg;
        this.status = status;
    }

    public String getMessage() {
        return defaultMessage;
    }

    public HttpStatus getStatus() {
        return status;
    }
}