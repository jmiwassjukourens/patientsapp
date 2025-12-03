package com.app.patients.services.implementations;


import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.patients.entities.Patient;
import com.app.patients.entities.Session;
import com.app.patients.entities.SessionStatus;
import com.app.patients.entities.User;
import com.app.patients.entities.dto.PeriodicSessionDTO;
import com.app.patients.entities.dto.SessionCreateDTO;
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

      @Override
    public List<SessionDTO> getMySessions() {
        User auth = userService.getAuthenticatedUser();

        return sessionRepository.findByPatientUser(auth)
                .stream()
                .map(SessionMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public SessionDTO createSingle(Long patientId, SessionCreateDTO dto) {
        Patient p = getOwnedPatientOrThrow(patientId);

        Session s = new Session();
        s.setFecha(dto.getFecha());
        s.setPrecio(dto.getPrecio());
        s.setEstado(SessionStatus.valueOf(dto.getEstado()));
        s.setFechaDePago(dto.getFechaDePago());
        s.setPatient(p);

        return SessionMapper.toDTO(sessionRepository.save(s));
    }

    @Override
    public List<SessionDTO> createPeriodic(Long patientId, PeriodicSessionDTO dto) {

        Patient p = getOwnedPatientOrThrow(patientId);

        List<Session> sesiones = new ArrayList<>();

        SessionCreateDTO base = dto.getBasePayload();
        LocalDateTime baseDate = base.getFecha();
        LocalDate limite = dto.getPeriodic().getEndDate();
        DayOfWeek dia = dto.getPeriodic().getDayOfWeek();

        LocalDateTime cursor = baseDate;

        while (cursor.getDayOfWeek() != dia) cursor = cursor.plusDays(1);

        while (!cursor.toLocalDate().isAfter(limite)) {
            Session s = new Session();
            s.setPatient(p);
            s.setFecha(cursor);
            s.setPrecio(base.getPrecio());
            s.setEstado(SessionStatus.valueOf(base.getEstado()));
            sesiones.add(s);

            cursor = cursor.plusWeeks(1);
        }

        return StreamSupport.stream(sessionRepository.saveAll(sesiones).spliterator(), false)
                .map(SessionMapper::toDTO)
                .collect(Collectors.toList());

    }

    @Override
    public SessionDTO update(Long id, SessionCreateDTO dto) {
        Session s = getOwnedSessionOrThrow(id);

        s.setFecha(dto.getFecha());
        s.setFechaDePago(dto.getFechaDePago());
        s.setPrecio(dto.getPrecio());
        s.setEstado(SessionStatus.valueOf(dto.getEstado()));

        return SessionMapper.toDTO(sessionRepository.save(s));
    }

    @Override
    public void delete(Long id) {
        Session s = getOwnedSessionOrThrow(id);
        sessionRepository.delete(s);
    }

    @Override
    public SessionDTO markAsPaid(Long id, LocalDateTime fechaDePago) {
        Session s = getOwnedSessionOrThrow(id);

        s.setEstado(SessionStatus.PAGADO);
        s.setFechaDePago(
                fechaDePago != null ? fechaDePago : LocalDateTime.now()
        );

        return SessionMapper.toDTO(sessionRepository.save(s));
    }

    @Override
    public SessionDTO reschedule(Long id, LocalDateTime nuevaFecha) {
        Session s = getOwnedSessionOrThrow(id);
        s.setFecha(nuevaFecha);
        return SessionMapper.toDTO(sessionRepository.save(s));
    }

    @Override
    public void cancel(Long id, boolean paid) {
        Session s = getOwnedSessionOrThrow(id);

        if (paid) {
            s.setEstado(SessionStatus.PAGADO);
            s.setFechaDePago(LocalDateTime.now());
            sessionRepository.save(s);
        } else {
            sessionRepository.delete(s);
        }
    }
    
}
