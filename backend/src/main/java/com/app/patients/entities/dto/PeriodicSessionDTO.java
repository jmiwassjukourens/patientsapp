package com.app.patients.entities.dto;

import java.time.DayOfWeek;
import java.time.LocalDate;

public class PeriodicSessionDTO {

    private SessionCreateDTO basePayload;

    private PeriodicData periodic;

    public static class PeriodicData {
        private String frequency; 
        private Integer every;    
        private DayOfWeek dayOfWeek;
        private LocalDate endDate;
        public String getFrequency() {
            return frequency;
        }
        public void setFrequency(String frequency) {
            this.frequency = frequency;
        }
        public Integer getEvery() {
            return every;
        }
        public void setEvery(Integer every) {
            this.every = every;
        }
        public DayOfWeek getDayOfWeek() {
            return dayOfWeek;
        }
        public void setDayOfWeek(DayOfWeek dayOfWeek) {
            this.dayOfWeek = dayOfWeek;
        }
        public LocalDate getEndDate() {
            return endDate;
        }
        public void setEndDate(LocalDate endDate) {
            this.endDate = endDate;
        }

        
    }

    public PeriodicSessionDTO(SessionCreateDTO basePayload, PeriodicData periodic) {
        this.basePayload = basePayload;
        this.periodic = periodic;
    }

    public PeriodicSessionDTO(){}

    public SessionCreateDTO getBasePayload() {
        return basePayload;
    }

    public void setBasePayload(SessionCreateDTO basePayload) {
        this.basePayload = basePayload;
    }

    public PeriodicData getPeriodic() {
        return periodic;
    }

    public void setPeriodic(PeriodicData periodic) {
        this.periodic = periodic;
    }

    
}
