package com.app.patients.repositories;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.app.patients.entities.Notification;
import com.app.patients.entities.User;

@Repository
public interface NotificationRepository extends CrudRepository<Notification, Long> {
   
    List<Notification>  findByUserIdOrderByIdDesc(Long userId);

    Notification findByIdAndUserId(Long id, Long userId);

    List<Notification> findByUserId(Long userId);

    void deleteByIdAndUserId(Long id, Long userId);

    void deleteAllByUserId(Long userId);   

    long countByUserIdAndLeidaFalse(Long userId);

    List<Notification> findByUser(User user);



}

