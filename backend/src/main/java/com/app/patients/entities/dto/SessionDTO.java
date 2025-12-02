package com.app.patients.entities.dto;

import java.time.LocalDateTime;

public class SessionDTO {
    private Long id;
    private LocalDateTime fecha;
    private LocalDateTime fechaDePago;
    private String estado;
    private Double precio;
    private PatientMiniDTO patient;

    public SessionDTO(Long id, LocalDateTime fecha, LocalDateTime fechaDePago, 
                      String estado, Double precio, PatientMiniDTO patient) {
        this.id = id;
        this.fecha = fecha;
        this.fechaDePago = fechaDePago;
        this.estado = estado;
        this.precio = precio;
        this.patient = patient;
    }

    public SessionDTO()  {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public LocalDateTime getFechaDePago() {
        return fechaDePago;
    }

    public void setFechaDePago(LocalDateTime fechaDePago) {
        this.fechaDePago = fechaDePago;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public PatientMiniDTO getPatient() {
        return patient;
    }

    public void setPatient(PatientMiniDTO patient) {
        this.patient = patient;
    }

    

}
