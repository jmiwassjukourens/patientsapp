package com.app.patients.services;

import java.time.LocalDateTime;
import java.util.List;
import com.app.patients.entities.dto.PeriodicSessionDTO;
import com.app.patients.entities.dto.SessionCreateDTO;
import com.app.patients.entities.dto.SessionDTO;


public interface SessionService {

    List<SessionDTO> getMySessions();

    SessionDTO createSingle(Long patientId, SessionCreateDTO dto);

    List<SessionDTO> createPeriodic(Long patientId, PeriodicSessionDTO dto);

    SessionDTO update(Long id, SessionCreateDTO dto);

    void delete(Long id);

    SessionDTO markAsPaid(Long id, LocalDateTime fechaDePago);

    SessionDTO reschedule(Long id, LocalDateTime nuevaFecha);

    void cancel(Long id, boolean paid);
}
