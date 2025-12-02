package com.app.patients.services;

public interface EmailService {
    void sendEmail(String to, String subject, String body);
}

