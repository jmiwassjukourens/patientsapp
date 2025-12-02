package com.app.patients.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.patients.entities.dto.DebtNotificationDTO;
import com.app.patients.entities.dto.PatientRequestDTO;
import com.app.patients.entities.dto.PatientResponseDTO;
import com.app.patients.services.PatientService;

@RestController
@RequestMapping("/api/patients")
public class PatientController {

    @Autowired
    private PatientService patientService;


    // DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return ResponseEntity.noContent().build();
    }


    // UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<PatientResponseDTO> updatePatient(
            @PathVariable Long id,
            @RequestBody PatientRequestDTO dto) {

        return ResponseEntity.ok(patientService.updatePatient(id, dto));
    }


    // DEBT NOTIFICATION
    @PostMapping("/{id}/notify-debt")
    public ResponseEntity<DebtNotificationDTO> notifyDebt(@PathVariable Long id) {
        DebtNotificationDTO dto = patientService.notifyDebt(id);
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public List<PatientResponseDTO> getMyPatients() {
        return patientService.getMyPatients();
    }

    @PostMapping
    public PatientResponseDTO createPatient(@RequestBody PatientRequestDTO dto) {
        return patientService.createPatient(dto);
    }

    @PostMapping("/notify-debt/all")
    public ResponseEntity<List<DebtNotificationDTO>> notifyDebtToAll() {
        List<DebtNotificationDTO> result = patientService.notifyDebtToAll();
        return ResponseEntity.ok(result);
    }

}

