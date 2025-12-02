package com.app.patients.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // financiera / sesion / analitica / cliente
    @Column(nullable = false)
    private String tipo;

    @Column(nullable = false, length = 500)
    private String mensaje;

    @Column(nullable = false)
    private boolean leida = false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id") 
    @JsonIgnoreProperties({"notifications", "hibernateLazyInitializer"})
    private User user;

    public Notification(Long id, String tipo, String mensaje, boolean leida, User user) {
        this.id = id;
        this.tipo = tipo;
        this.mensaje = mensaje;
        this.leida = leida;
        this.user = user;
    } 
    //constructor
    public Notification() {
    }
}
