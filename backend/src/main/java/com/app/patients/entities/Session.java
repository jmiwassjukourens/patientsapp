package com.app.patients.entities;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Sessions")
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDateTime fecha;

    private LocalDateTime fechaDePago;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SessionStatus estado;

    @Column(nullable = false)
    private Double precio;

    private String adjunto; 

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    @JsonIgnoreProperties({"sessions", "hibernateLazyInitializer"})
    private Patient patient;

    public Session() {
    }

    public Session(Long id, LocalDateTime fecha, LocalDateTime fechaDePago, SessionStatus estado, Double precio,
            String adjunto, Patient patient) {
        this.id = id;
        this.fecha = fecha;
        this.fechaDePago = fechaDePago;
        this.estado = estado;
        this.precio = precio;
        this.adjunto = adjunto;
        this.patient = patient;
    }
    // Getters and Setters
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

    public SessionStatus getEstado() {
        return estado;
    }

    public void setEstado(SessionStatus estado) {
        this.estado = estado;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public String getAdjunto() {
        return adjunto;
    }

    public void setAdjunto(String adjunto) {
        this.adjunto = adjunto;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    

    

    
}

