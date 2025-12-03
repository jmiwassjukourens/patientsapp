package com.app.patients.services.implementations;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.patients.entities.Patient;
import com.app.patients.entities.Session;
import com.app.patients.entities.SessionStatus;
import com.app.patients.entities.User;
import com.app.patients.entities.dto.PeriodicRequest;
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

    public SessionDTO markAsPaid(Long id, String fechaDePagoStr) {
        Session s = getOwnedSessionOrThrow(id);
        s.setEstado(SessionStatus.PAGADO);

        if (fechaDePagoStr != null && !fechaDePagoStr.isBlank()) {
            LocalDateTime fecha;
            try {
               
                fecha = LocalDateTime.parse(fechaDePagoStr);
            } catch (DateTimeParseException ex1) {
                
                try {
                    fecha = OffsetDateTime.parse(fechaDePagoStr).toLocalDateTime();
                } catch (DateTimeParseException ex2) {
                   
                    fecha = LocalDateTime.now();
                }
            }
            s.setFechaDePago(fecha);
        } else {
            s.setFechaDePago(LocalDateTime.now());
        }

        return SessionMapper.toDTO(sessionRepository.save(s));
    }



    public void deleteSession(Long id) {
        Session s = getOwnedSessionOrThrow(id);
        sessionRepository.delete(s);
    }

    public List<SessionDTO> createPeriodicSessions(Long patientId, PeriodicRequest dto) {
    Patient p = getOwnedPatientOrThrow(patientId);
    List<SessionDTO> created = new ArrayList<>();

    if (dto.periodic == null) {
        Session s = new Session();
        s.setFecha(parseLocalDateTimeSafe(dto.getFecha().toString()));
        s.setFechaDePago(dto.getFechaDePago().toString() != null ? parseLocalDateTimeSafe(dto.getFechaDePago().toString()) : null);
        s.setEstado(SessionStatus.valueOf(dto.getEstado().toString()));
        s.setPrecio(dto.getPrecio());
        s.setPatient(p);
        created.add(SessionMapper.toDTO(sessionRepository.save(s)));
        return created;
    }

    // lógica periódica (ejemplo simple: WEEKLY)
    PeriodicRequest pr = dto.periodic;
    LocalDateTime start = parseLocalDateTimeSafe(dto.getFecha().toString());
    LocalDate end = LocalDate.parse(pr.endDate); // yyyy-MM-dd
    int every = pr.every != null ? pr.every : 1;

    LocalDateTime current = start;
    while (!current.toLocalDate().isAfter(end)) {
        Session s = new Session();
        s.setFecha(current);
        s.setFechaDePago(null);
        s.setEstado(SessionStatus.valueOf(dto.estado));
        s.setPrecio(dto.precio);
        s.setPatient(p);
        created.add(SessionMapper.toDTO(sessionRepository.save(s)));

        // sumar semanas
        current = current.plusWeeks(every);
    }

    return created;
}

private LocalDateTime parseLocalDateTimeSafe(String s) {
    if (s == null) return null;
    try {
        return LocalDateTime.parse(s);
    } catch (DateTimeParseException ex) {
        // intentar quitar milisegundos extra o parsear como Offset
        String normalized = s.endsWith("Z") ? s.substring(0, s.length()-1) : s;
        // truncar microsegundos: keep up to 3 decimals
        Matcher m = Pattern.compile("^(\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2})(?:\\.(\\d{1,6}))?$").matcher(normalized);
        if (m.find()) {
            String base = m.group(1);
            String frac = m.group(2) != null ? m.group(2).substring(0, Math.min(3, m.group(2).length())) : "000";
            return LocalDateTime.parse(base + "." + frac);
        }
        // fallback
        return LocalDateTime.now();
    }
}

}
