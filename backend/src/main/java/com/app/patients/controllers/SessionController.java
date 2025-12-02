package com.app.patients.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.patients.entities.Session;
import com.app.patients.entities.dto.SessionDTO;
import com.app.patients.services.SessionService;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @GetMapping
    public List<SessionDTO> getMySessions() {
        return sessionService.getMySessions();
    }

    @PostMapping("/{patientId}")
    public SessionDTO create(@PathVariable Long patientId, @RequestBody Session dto) {
        return sessionService.createSession(patientId, dto);
    }

    @PutMapping("/{id}")
    public SessionDTO update(@PathVariable Long id, @RequestBody Session dto) {
        return sessionService.updateSession(id, dto);
    }

    @PutMapping("/{id}/paid")
    public SessionDTO markAsPaid(@PathVariable Long id) {
        return sessionService.markAsPaid(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        sessionService.deleteSession(id);
    }
}