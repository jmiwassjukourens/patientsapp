package com.app.patients.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorDTO> handleApiException(ApiException ex, HttpServletRequest req) {

        ErrorCode code = ex.getErrorCode();

        ErrorDTO dto = new ErrorDTO(
                code.name(),
                code.getMessage(),
                code.getStatus().value(),
                req.getRequestURI()
        );

        return ResponseEntity.status(code.getStatus()).body(dto);
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDTO> handleGeneral(Exception ex, HttpServletRequest req) {
        ErrorDTO dto = new ErrorDTO(
                "INTERNAL_ERROR",
                "Unexpected server error",
                500,
                req.getRequestURI()
        );

        return ResponseEntity.status(500).body(dto);
    }
}
