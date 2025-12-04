package com.app.patients.jobs;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.app.patients.entities.User;
import com.app.patients.repositories.PatientRepository;
import com.app.patients.repositories.SessionRepository;
import com.app.patients.repositories.UserRepository;
import com.app.patients.services.NotificationService;

@Component
@EnableScheduling
public class MonthlyNotificationCron {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private NotificationService notificationService;


    @Scheduled(cron = "0 0 8 1 * *")
    public void generateMonthlyNotifications() {

        List<User> users = (List<User>) userRepository.findAll();

        for (User user : users) {
            Double deudaTotal = patientRepository.sumDebtByUser(user.getId());
            Double generadoMes = sessionRepository.sumPaidSessionsCurrentMonth(user.getId());
            Integer cantPendientes = sessionRepository.countPendingPayments(user.getId());
            Double montoPendiente = sessionRepository.sumPendingAmount(user.getId());

            notificationService.createNotification("financiera",
                    "Deuda acumulada de tus pacientes: $" + deudaTotal, user);

            notificationService.createNotification("financiera",
                    "Ingresos generados este mes: $" + generadoMes, user);

            notificationService.createNotification("financiera",
                    "Sesiones pendientes de pago: " + cantPendientes + " ($" + montoPendiente + ")", user);
        }
    }
}
