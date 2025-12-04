package com.app.patients.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.patients.entities.Notification;
import com.app.patients.services.implementations.NotificationServiceImpl;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationServiceImpl notificationService;


    @PostMapping("/notify-debt/all")
    public ResponseEntity<String> notifyAllDebts() {
        notificationService.notifyAllDebts();
        return ResponseEntity.ok("Debt notifications generated.");
    }

    @GetMapping
    public List<Notification> getNotifications() {
        return notificationService.getNotificationsByLoggedUser();
    }

    @GetMapping("/unread/count")
    public long unreadCount() {
        return notificationService.getUnreadCountForLoggedUser();
    }

    @PutMapping("/{id}/read")
    public Notification markAsRead(@PathVariable Long id) {
        return notificationService.markAsReadForLoggedUser(id);
    }

    @PutMapping("/read/all")
    public void markAllAsRead() {
        notificationService.markAllAsReadForLoggedUser();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        notificationService.deleteForLoggedUser(id);
    }

    @DeleteMapping
    public void deleteAll() {
        notificationService.deleteAllForLoggedUser();
    }
}
