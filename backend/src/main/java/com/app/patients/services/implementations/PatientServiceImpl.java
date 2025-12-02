package com.app.patients.services.implementations;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.patients.entities.Patient;
import com.app.patients.entities.Session;
import com.app.patients.entities.User;
import com.app.patients.entities.dto.DebtNotificationDTO;
import com.app.patients.entities.dto.PatientRequestDTO;
import com.app.patients.entities.dto.PatientResponseDTO;
import com.app.patients.repositories.PatientRepository;
import com.app.patients.repositories.SessionRepository;

import com.app.patients.services.EmailService;
import com.app.patients.services.PatientService;
import com.app.patients.services.UserService;

import jakarta.transaction.Transactional;

@Service
public class PatientServiceImpl implements PatientService {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserService userService;


    @Override
    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }

    @Override
    public PatientResponseDTO updatePatient(Long id, PatientRequestDTO dto) {
        Patient p = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        p.setName(dto.getName());
        p.setDni(dto.getDni());
        p.setEmail(dto.getEmail());
        p.setPhone(dto.getPhone());
        p.setDebt(dto.getDebt());

        Patient updated = patientRepository.save(p);
        return toResponseDTO(updated);
    }

    @Override
    public DebtNotificationDTO notifyDebt(Long patientId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        List<Session> pending = sessionRepository.findPendingSessionsByPatientId(patientId);

        if (pending.isEmpty()) {
            throw new RuntimeException("This patient has no pending debt.");
        }

        Double total = pending.stream().mapToDouble(Session::getPrecio).sum();

        // build email body
        StringBuilder sb = new StringBuilder();
        sb.append("Hola ").append(patient.getName()).append(",\n\n");
        sb.append("Esto es un recordatorio automatico. Aún tiene sesiones pendientes de pago:\n\n");

        for (Session s : pending) {
            sb.append("- Fecha sesión: ")
                .append(s.getFecha())
                .append(" | Monto: $")
                .append(s.getPrecio())
                .append("\n");
        }

        sb.append("\nTotal: $").append(total);
        sb.append("\n\nGracias.");

        // send email
        emailService.sendEmail(patient.getEmail(), "Sesiones Pendientes de pago", sb.toString());

        // build DTO response
        DebtNotificationDTO dto = new DebtNotificationDTO();
        dto.setPatientName(patient.getName());
        dto.setPatientEmail(patient.getEmail());
        dto.setTotalDebt(total);

        List<DebtNotificationDTO.SessionDebtItem> items = pending.stream().map(s -> {
            DebtNotificationDTO.SessionDebtItem it = new DebtNotificationDTO.SessionDebtItem();
            it.setSessionDate(s.getFecha());
            it.setPrice(s.getPrecio());
            return it;
        }).toList();

        dto.setSessions(items);

        return dto;
    }

public List<PatientResponseDTO> getMyPatients() {
        User authUser = userService.getAuthenticatedUser();
        return patientRepository.findByUser(authUser)
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public PatientResponseDTO createPatient(PatientRequestDTO dto) {
        User authUser = userService.getAuthenticatedUser();

        Patient patient = new Patient();
        patient.setName(dto.getName());
        patient.setDni(dto.getDni());
        patient.setEmail(dto.getEmail());
        patient.setPhone(dto.getPhone());
        patient.setDebt(0.0);
        patient.setUser(authUser);

        Patient saved = patientRepository.save(patient);

        return toResponseDTO(saved);
    }

    private PatientResponseDTO toResponseDTO(Patient p) {
        return new PatientResponseDTO(
                p.getId(),
                p.getName(),
                p.getDni(),
                p.getEmail(),
                p.getPhone(),
                p.getDebt()
        );
    }

    @Override
    @Transactional
    public List<DebtNotificationDTO> notifyDebtToAll() {

        User user = userService.getAuthenticatedUser();  

        List<Patient> patients = patientRepository.findByUser(user);

        List<DebtNotificationDTO> results = new ArrayList<>();

        for (Patient p : patients) {

            List<Session> pending = sessionRepository.findPendingSessionsByPatientId(p.getId());

            if (!pending.isEmpty()) {
                DebtNotificationDTO dto = notifyDebt(p.getId());
                results.add(dto);
            }
        }

        if (results.isEmpty()) {
            throw new RuntimeException("No patients with pending debt found.");
        }

        return results;
    }

}

