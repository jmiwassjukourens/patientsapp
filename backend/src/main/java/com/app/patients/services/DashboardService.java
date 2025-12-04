package com.app.patients.services;

import com.app.patients.entities.dto.AnnualReportDTO;

public interface DashboardService {

    public AnnualReportDTO getAnnualReport(Integer year);

    
    
}
