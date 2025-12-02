package com.app.patients.exceptions;

import java.time.LocalDateTime;


public class ErrorDTO {

    private String errorCode;
    private String message;
    private int status;
    private String path;
    private LocalDateTime timestamp;

    public ErrorDTO(String errorCode, String message, int status, String path) {
        this.errorCode = errorCode;
        this.message = message;
        this.status = status;
        this.path = path;
        this.timestamp = LocalDateTime.now();
    }

    public String getErrorCode() { return errorCode; }
    public String getMessage() { return message; }
    public int getStatus() { return status; }
    public String getPath() { return path; }
    public LocalDateTime getTimestamp() { return timestamp; }
}