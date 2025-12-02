package com.app.patients.services.implementations;

import org.springframework.stereotype.Service;

import com.app.patients.services.EmailService;

@Service
public class EmailServiceImpl implements EmailService {
    /*
    @Autowired
    private JavaMailSender mailSender;
nder.send(message);
    } */

          @Override
    public void sendEmail(String to, String subject, String body) {
        System.out.println("Sending email to: " + to);
        System.out.println("Subject: " + subject);
        System.out.println("Body: " + body);
    }
}
