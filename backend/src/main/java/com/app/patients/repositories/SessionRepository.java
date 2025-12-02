package com.app.patients.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.patients.entities.Session;
import com.app.patients.entities.User;

@Repository
public interface SessionRepository extends CrudRepository<Session, Long> {

    @Query("SELECT s FROM Session s WHERE s.patient.id = :patientId AND s.estado = 'PENDIENTE'")
    List<Session> findPendingSessionsByPatientId(@Param("patientId") Long patientId);
    
    List<Session> findByPatientUser(User user);

    List<Session> findByPatientId(Long patientId);
}
