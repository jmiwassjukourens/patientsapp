package com.app.patients.entities.dto;

import java.time.LocalDateTime;

public class SessionCreateDTO {
    
    private LocalDateTime fecha;
    private LocalDateTime fechaDePago;
    private Double precio;
    private String estado;
    private Long patientId;

    public SessionCreateDTO(LocalDateTime fecha, LocalDateTime fechaDePago, Double precio, String estado,
            Long patientId) {
        this.fecha = fecha;
        this.fechaDePago = fechaDePago;
        this.precio = precio;
        this.estado = estado;
        this.patientId = patientId;
    }

    public SessionCreateDTO(){}

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

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    


}
