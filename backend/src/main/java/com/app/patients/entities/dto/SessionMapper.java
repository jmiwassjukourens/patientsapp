package com.app.patients.entities.dto;

import com.app.patients.entities.Patient;
import com.app.patients.entities.Session;

public class SessionMapper {

    public static SessionDTO toDTO(Session s) {
        Patient p = s.getPatient();

        PatientMiniDTO pMini = new PatientMiniDTO(
            p.getId(),
            p.getName(),
            p.getDni(),
            p.getEmail(),
            p.getPhone(),
            p.getDebt()
        );

        return new SessionDTO(
            s.getId(),
            s.getFecha(),
            s.getFechaDePago(),
            s.getEstado().name(),
            s.getPrecio(),
            pMini
        );
    }
}