package com.app.patients.entities.dto;

public class PatientRequestDTO {

    private String name;
    private String dni;
    private String email;
    private String phone;
    private Double debt;

    public PatientRequestDTO() {
    }
    public PatientRequestDTO(String name, String dni, String email, String phone, Double debt) {
        this.name = name;
        this.dni = dni;
        this.email = email;
        this.phone = phone;
        this.debt = debt;
    }
    public String getName() {
        return name;
    }
    public String getDni() {
        return dni;
    }
    public String getEmail() {
        return email;
    }
    public String getPhone() {
        return phone;
    }
    public Double getDebt() {
        return debt;
    }
    
}

