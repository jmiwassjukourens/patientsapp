package com.app.patients.services.implementations;

import java.time.Month;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.patients.entities.Session;
import com.app.patients.entities.SessionStatus;
import com.app.patients.entities.User;
import com.app.patients.entities.dto.AnnualReportDTO;
import com.app.patients.entities.dto.MonthlyReportDTO;
import com.app.patients.repositories.SessionRepository;
import com.app.patients.services.DashboardService;
import com.app.patients.services.UserService;

@Service
public class DashboardServiceImpl implements DashboardService{

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private UserService authService;


    public AnnualReportDTO getAnnualReport(Integer year) {

        User user = authService.getAuthenticatedUser();

        List<Session> sessions = sessionRepository.findByPatientUser(user);

        List<MonthlyReportDTO> monthlyList = new ArrayList<>();

        for (int month = 1; month <= 12; month++) {
            final int currentMonth = month;

            double collected = sessions.stream()
                    .filter(s -> s.getFechaDePago() != null
                            && s.getFechaDePago().getYear() == year
                            && s.getFechaDePago().getMonthValue() == currentMonth)
                    .mapToDouble(Session::getPrecio)
                    .sum();

            double pending = sessions.stream()
                    .filter(s -> s.getFecha().getYear() == year
                            && s.getFecha().getMonthValue() == currentMonth
                            && s.getEstado() == SessionStatus.PENDIENTE)
                    .mapToDouble(Session::getPrecio)
                    .sum();

            double total = collected + pending;

            monthlyList.add(
                    new MonthlyReportDTO(
                            Month.of(currentMonth).getDisplayName(TextStyle.FULL, Locale.forLanguageTag("es")),
                            total, collected, pending
                    )
            );
        }

        return new AnnualReportDTO(year, monthlyList);
    }

}
