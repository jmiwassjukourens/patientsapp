package com.app.patients.entities.dto;

import java.util.List;

public class AnnualReportDTO {
    private Integer year;
    private List<MonthlyReportDTO> monthlyData;

    public AnnualReportDTO(Integer year, List<MonthlyReportDTO> monthlyData) {
        this.year = year;
        this.monthlyData = monthlyData;
    }

    public AnnualReportDTO() {
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public List<MonthlyReportDTO> getMonthlyData() {
        return monthlyData;
    }

    public void setMonthlyData(List<MonthlyReportDTO> monthlyData) {
        this.monthlyData = monthlyData;
    }

    


}

