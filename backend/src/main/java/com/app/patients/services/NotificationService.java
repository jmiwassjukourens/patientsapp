package com.app.patients.services;

import java.util.List;

import com.app.patients.entities.Notification;
import com.app.patients.entities.User;

public interface NotificationService {


    List<Notification> getNotificationsByLoggedUser();


    Notification markAsReadForLoggedUser(Long id);


    void markAllAsReadForLoggedUser();


    void deleteForLoggedUser(Long id);


    void deleteAllForLoggedUser();


    long getUnreadCountForLoggedUser();


    Notification createNotification(String tipo, String mensaje, User user);


    void notifyAllDebts();
}


