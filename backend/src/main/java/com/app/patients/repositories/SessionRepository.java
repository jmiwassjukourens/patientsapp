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

    @Query("SELECT SUM(s.precio) FROM Session s WHERE s.estado = 'PAGADO' AND MONTH(s.fechaDePago) = MONTH(CURRENT_DATE) AND s.patient.user.id = :userId")
    Double sumPaidSessionsCurrentMonth(Long userId);

    @Query("SELECT COUNT(s) FROM Session s WHERE s.estado = 'PENDIENTE' AND s.patient.user.id = :userId")
    Integer countPendingPayments(Long userId);

    @Query("SELECT SUM(s.precio) FROM Session s WHERE s.estado = 'PENDIENTE' AND s.patient.user.id = :userId")
    Double sumPendingAmount(Long userId);

    @Query(value = """
        SELECT COUNT(*) FROM "SESSIONS" s
        WHERE s.fecha::date = current_date
        AND s.patient_id IN (
            SELECT p.id FROM PATIENTS p WHERE p.user_id = :userId
        )
    """, nativeQuery = true)
    Long countSessionsForToday(@Param("userId") Long userId);



}
