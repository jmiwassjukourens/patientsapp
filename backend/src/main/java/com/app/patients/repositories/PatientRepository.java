package com.app.patients.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.app.patients.entities.Patient;
import com.app.patients.entities.User;

@Repository
public interface PatientRepository extends CrudRepository<Patient, Long> {
    Optional<Patient> findByEmail(String email);

    List<Patient> findByUser(User user);

    long countByUserId(Long userId);

    @Query("SELECT SUM(p.debt) FROM Patient p WHERE p.user.id = :userId")
    Double sumDebtByUser(Long userId);

}
