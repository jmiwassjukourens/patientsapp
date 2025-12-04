# 🧠 PatientApp — Clinical Session & Patient Management System

---

**PatientApp** is a complete management system designed for psychologists, therapists, and independent health professionals.  
It centralizes patient data, sessions, debts, notifications, and financial statistics, providing a smart and modern workflow.

Built as a **full-stack project using React and Spring Boot**, the platform implements real authentication, notifications, dashboards, and full CRUD management.

---

## 🌍 Problem Statement

Independent professionals often rely on manual tools (Excel, WhatsApp, paper notebooks) to manage:

- Session scheduling  
- Pending payments  
- Patient data  
- Notifications and reminders  
- Daily workflow  

These disconnected tools lead to **errors, forgotten payments, double bookings, or loss of information**.

**PatientApp** solves this by offering a **unified, automated, and modern clinical management platform**.

---

## 🎯 Main Objectives

- Centralize patient management  
- Automate reminders and notifications  
- Track sessions (past & upcoming)  
- Monitor pending payments and income  
- Provide a financial dashboard for informed decisions  
- Improve workflow through real-time updates and alerts  

---

## 🧱 System Architecture

### Frontend Layer (React)

- React + Hooks  
- Context API for global state management  
- Custom hooks (notifications, sessions, authentication)  
- Protected routes using JWT  
- Fetch wrapper with interceptor (`apiFetch`)  
- Responsive UI (mobile-first design)  

### Backend Layer (Spring Boot)

- Spring Security (JWT authentication & validation)  
- RESTful API — MVC architecture  
- JPA + Hibernate  
- DTO mapping  
- Notification system  
- Ready for schedulers / background jobs  
- MySQL relational database  

---

## 📸 Architecture Diagram

> _(Replace when the image is available)_

---

## 🖥️ Features Overview

### ✅ Patient Management

Create, edit, archive, delete, and search patients efficiently.

> _(Screenshot — Patients Dashboard)_

---

### ✅ Session Calendar & Scheduling

View upcoming sessions, past appointments, and track unpaid sessions.

> _(Screenshot — Sessions Calendar)_

---

### ✅ Financial Dashboard

Monitor:

- Total income  
- Pending debts  
- Monthly analytics  
- Performance indicators  

> _(Screenshot — Financial Dashboard)_

---

### ✅ Smart Notifications (Automatically Generated)

The backend generates notifications for:

- Sessions scheduled for today  
- Pending payments  
- Newly added patients  
- System reminders  

Users can mark notifications as **read** or **delete them** (individually or all at once).

> _(Screenshot — Notifications Panel)_

---

### ✅ Patient Debt & Reminders

Send individual or bulk reminders for unpaid sessions with a single click.

> _(Screenshot — Debt Tools)_

---

## 📱 Responsive Design

The application is fully responsive and optimized for:

- Desktop
- Tablet
- Mobile

> _(Screenshots — Mobile UI)_

---

## ⭐ Tech Stack

### Frontend

- React  
- Context API  
- Custom Hooks  
- JavaScript / TypeScript  
- Fetch API wrapper (`apiFetch`)  
- React Router  
- CSS Modules / Styled Components  

### Backend

- Spring Boot  
- Spring Security (JWT)  
- Java  
- JPA + Hibernate  
- MySQL  
- DTOs & Mappers  
- Custom Filters (`JwtAuthenticationFilter`, `JwtValidationFilter`)  
- Notification Service & Repository  

---

## 🚀 Project Value

This project demonstrates:

- Full-stack development skills  
- Authentication & Authorization workflow with JWT  
- Clean layered architecture (Controllers, Services, Repositories)  
- State management in React using Context & Hooks  
- Real-time logic for notifications and UI synchronization  
- A fully functional **CRUD + Dashboard system** ready for production  

---

## 📌 Future Improvements

- Appointment booking by patients  
- Email & WhatsApp integration  
- Advanced statistics & reports (PDF/Excel export)  
- Multi-user / multi-clinic support  
- Online payments integration
