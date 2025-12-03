package com.app.patients.controllers;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.patients.entities.dto.PeriodicSessionDTO;
import com.app.patients.entities.dto.SessionCreateDTO;
import com.app.patients.entities.dto.SessionDTO;
import com.app.patients.services.SessionService;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    @Autowired
    private SessionService service;

    @GetMapping
    public List<SessionDTO> getMySessions() {
        return service.getMySessions();
    }

    @PostMapping("/{patientId}")
    public SessionDTO createSingle(
            @PathVariable Long patientId,
            @RequestBody SessionCreateDTO dto
    ) {
        return service.createSingle(patientId, dto);
    }

    @PostMapping("/{patientId}/periodic")
    public List<SessionDTO> createPeriodic(
            @PathVariable Long patientId,
            @RequestBody PeriodicSessionDTO dto
    ) {
        return service.createPeriodic(patientId, dto);
    }

    @PutMapping("/{id}")
    public SessionDTO update(@PathVariable Long id, @RequestBody SessionCreateDTO dto) {
        return service.update(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @PutMapping("/{id}/paid")
    public SessionDTO markAsPaid(
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, String> body
    ) {
        LocalDateTime fechaPago = null;
        if (body != null && body.containsKey("fechaDePago")) {
            fechaPago = LocalDateTime.parse(body.get("fechaDePago"));
        }
        return service.markAsPaid(id, fechaPago);
    }

    @PutMapping("/{id}/reschedule")
    public SessionDTO reschedule(@PathVariable Long id, @RequestBody Map<String, String> request) {
        LocalDateTime nuevaFecha = LocalDateTime.parse(request.get("fecha"));
        return service.reschedule(id, nuevaFecha);
    }

    @PutMapping("/{id}/cancel")
    public void cancel(@PathVariable Long id, @RequestParam boolean paid) {
        service.cancel(id, paid);
    }
}
