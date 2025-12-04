package com.app.patients.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.patients.entities.dto.AnnualReportDTO;
import com.app.patients.services.DashboardService;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/annual")
    public AnnualReportDTO getAnnualReport(@RequestParam Integer year) {
        return dashboardService.getAnnualReport(year);
    }
}

