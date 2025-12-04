package com.app.patients.entities.dto;

public class MonthlyReportDTO {
    private String month;
    private Double totalIncome;
    private Double collectedIncome;
    private Double pendingIncome;

    public MonthlyReportDTO(String month, Double totalIncome, Double collectedIncome, Double pendingIncome) {
        this.month = month;
        this.totalIncome = totalIncome;
        this.collectedIncome = collectedIncome;
        this.pendingIncome = pendingIncome;
    }

    public MonthlyReportDTO() {
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public Double getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(Double totalIncome) {
        this.totalIncome = totalIncome;
    }

    public Double getCollectedIncome() {
        return collectedIncome;
    }

    public void setCollectedIncome(Double collectedIncome) {
        this.collectedIncome = collectedIncome;
    }

    public Double getPendingIncome() {
        return pendingIncome;
    }

    public void setPendingIncome(Double pendingIncome) {
        this.pendingIncome = pendingIncome;
    }

    
}
