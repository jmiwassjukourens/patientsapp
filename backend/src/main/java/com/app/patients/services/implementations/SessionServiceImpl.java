package com.app.patients.services.implementations;


import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.patients.entities.Patient;
import com.app.patients.entities.Session;
import com.app.patients.entities.SessionStatus;
import com.app.patients.entities.User;
import com.app.patients.entities.dto.SessionDTO;
import com.app.patients.entities.dto.SessionMapper;
import com.app.patients.exceptions.ApiException;
import com.app.patients.exceptions.ErrorCode;
import com.app.patients.repositories.PatientRepository;
import com.app.patients.repositories.SessionRepository;
import com.app.patients.services.SessionService;
import com.app.patients.services.UserService;

@Service
public class SessionServiceImpl implements SessionService {

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private UserService userService;

    private Patient getOwnedPatientOrThrow(Long patientId) {
        User auth = userService.getAuthenticatedUser();

        return patientRepository.findById(patientId)
                .filter(p -> p.getUser().getId().equals(auth.getId()))
                .orElseThrow(() -> new ApiException(ErrorCode.UNAUTHORIZED_ACTION));
    }

    private Session getOwnedSessionOrThrow(Long sessionId) {
        User auth = userService.getAuthenticatedUser();

        return sessionRepository.findById(sessionId)
                .filter(s -> s.getPatient().getUser().getId().equals(auth.getId()))
                .orElseThrow(() -> new ApiException(ErrorCode.UNAUTHORIZED_ACTION));
    }

    // GET todas las sesiones del usuario logueado (DEVUELVE DTO)
    public List<SessionDTO> getMySessions() {
        User auth = userService.getAuthenticatedUser();

        return sessionRepository.findByPatientUser(auth)
                .stream()
                .map(SessionMapper::toDTO)
                .collect(Collectors.toList());
    }

    public SessionDTO createSession(Long patientId, Session dto) {
        Patient p = getOwnedPatientOrThrow(patientId);

        Session s = new Session();
        s.setFecha(dto.getFecha());
        s.setFechaDePago(dto.getFechaDePago());
        s.setEstado(dto.getEstado());
        s.setPrecio(dto.getPrecio());
        s.setPatient(p);

        return SessionMapper.toDTO(sessionRepository.save(s));
    }

    public SessionDTO updateSession(Long id, Session dto) {
        Session s = getOwnedSessionOrThrow(id);

        s.setFecha(dto.getFecha());
        s.setFechaDePago(dto.getFechaDePago());
        s.setEstado(dto.getEstado());
        s.setPrecio(dto.getPrecio());

        return SessionMapper.toDTO(sessionRepository.save(s));
    }

    public SessionDTO markAsPaid(Long id) {
        Session s = getOwnedSessionOrThrow(id);
        s.setEstado(SessionStatus.PAGADO);
        s.setFechaDePago(LocalDateTime.now());
        return SessionMapper.toDTO(sessionRepository.save(s));
    }

    public void deleteSession(Long id) {
        Session s = getOwnedSessionOrThrow(id);
        sessionRepository.delete(s);
    }
}
