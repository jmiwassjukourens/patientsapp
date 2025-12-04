package com.app.patients.services.implementations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.patients.entities.Notification;
import com.app.patients.entities.Patient;
import com.app.patients.entities.User;
import com.app.patients.repositories.NotificationRepository;
import com.app.patients.repositories.PatientRepository;
import com.app.patients.services.NotificationService;
import com.app.patients.services.UserService;

import jakarta.transaction.Transactional;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private UserService userService;


    @Override
    @Transactional 
    public void notifyAllDebts() {
        User user = userService.getAuthenticatedUser();

        List<Patient> patients = patientRepository.findByUser(user);

        patients.forEach(p -> {
            if (p.getDebt() != null && p.getDebt() > 0) {
                String mensaje = "El paciente " + p.getName() +
                        " posee una deuda pendiente de $" + p.getDebt();

                createNotification("DEUDA", mensaje, user);
            }
        });
    }

    @Override
    @Transactional 
    public List<Notification> getNotificationsByLoggedUser() {
        Long userId = userService.getAuthenticatedUser().getId();
        return notificationRepository.findByUserIdOrderByIdDesc(userId);
    }

    @Override
    @Transactional 
    public long getUnreadCountForLoggedUser() {
        Long userId = userService.getAuthenticatedUser().getId();
        return notificationRepository.countByUserIdAndLeidaFalse(userId);
    }

    @Override
    @Transactional 
    public Notification markAsReadForLoggedUser(Long id) {
        Long userId = userService.getAuthenticatedUser().getId();
        Notification n = notificationRepository.findByIdAndUserId(id, userId);
        n.setLeida(true);
        return notificationRepository.save(n);
    }

    @Override
    @Transactional 
    public void markAllAsReadForLoggedUser() {
        Long userId = userService.getAuthenticatedUser().getId();
        List<Notification> notis = notificationRepository.findByUserId(userId);
        notis.forEach(n -> n.setLeida(true));
        notificationRepository.saveAll(notis);
    }

    @Override
    @Transactional 
    public void deleteForLoggedUser(Long id) {
        Long userId = userService.getAuthenticatedUser().getId();
        notificationRepository.deleteByIdAndUserId(id, userId);
    }

    @Override
    @Transactional 
    public void deleteAllForLoggedUser() {
        Long userId = userService.getAuthenticatedUser().getId();
        notificationRepository.deleteAllByUserId(userId);
    }

    @Override
    @Transactional 
    public Notification createNotification(String tipo, String mensaje, User user) {
        Notification n = new Notification();
        n.setTipo(tipo);    
        n.setMensaje(mensaje);
        n.setUser(user);
        n.setLeida(false);
        return notificationRepository.save(n);
    }


}
