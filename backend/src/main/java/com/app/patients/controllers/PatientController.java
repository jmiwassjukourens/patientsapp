package com.app.patients.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
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


    // CREATE
    @PostMapping
    public ResponseEntity<PatientResponseDTO> createPatient(@RequestBody PatientRequestDTO dto) {
        return ResponseEntity.ok(patientService.createPatient(dto));
    }


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
}

