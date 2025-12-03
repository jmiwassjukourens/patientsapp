package com.app.patients.services;

import java.util.List;
import com.app.patients.entities.Session;
import com.app.patients.entities.dto.SessionDTO;


public interface SessionService {

    public List<SessionDTO> getMySessions() ;

    public SessionDTO createSession(Long patientId, Session dto);

    public SessionDTO updateSession(Long id, Session dto) ;

    public SessionDTO markAsPaid(Long id,String fechaDePagoStr);

    public void deleteSession(Long id) ;
}
