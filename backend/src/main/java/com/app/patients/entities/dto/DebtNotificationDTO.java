package com.app.patients.entities.dto;

import java.time.LocalDateTime;
import java.util.List;

public class DebtNotificationDTO {
    private String patientName;
    private String patientEmail;
    private Double totalDebt;
    private List<SessionDebtItem> sessions;

    public static class SessionDebtItem {
    private LocalDateTime sessionDate;
    private Double price;
    public LocalDateTime getSessionDate() {
        return sessionDate;
    }
    public void setSessionDate(LocalDateTime sessionDate) {
        this.sessionDate = sessionDate;
    }
    public Double getPrice() {
        return price;
    }
    public void setPrice(Double price) {
        this.price = price;
    }
}

    public DebtNotificationDTO() {
    }

    public DebtNotificationDTO(String patientName, String patientEmail, Double totalDebt, List<SessionDebtItem> sessions) {
        this.patientName = patientName;
        this.patientEmail = patientEmail;
        this.totalDebt = totalDebt;
        this.sessions = sessions;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public String getPatientEmail() {
        return patientEmail;
    }

    public void setPatientEmail(String patientEmail) {
        this.patientEmail = patientEmail;
    }

    public Double getTotalDebt() {
        return totalDebt;
    }

    public void setTotalDebt(Double totalDebt) {
        this.totalDebt = totalDebt;
    }

    public List<SessionDebtItem> getSessions() {
        return sessions;
    }

    public void setSessions(List<SessionDebtItem> sessions) {
        this.sessions = sessions;
    }
    
    
}
