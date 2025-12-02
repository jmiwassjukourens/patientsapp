package com.app.patients.services;

import com.app.patients.entities.dto.DebtNotificationDTO;
import com.app.patients.entities.dto.PatientRequestDTO;
import com.app.patients.entities.dto.PatientResponseDTO;

public interface PatientService {

    PatientResponseDTO createPatient(PatientRequestDTO dto);

    void deletePatient(Long id);

    PatientResponseDTO updatePatient(Long id, PatientRequestDTO dto);

    DebtNotificationDTO notifyDebt(Long patientId);
}