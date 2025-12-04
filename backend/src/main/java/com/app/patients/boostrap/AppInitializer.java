package com.app.patients.boostrap;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.app.patients.entities.Patient;
import com.app.patients.entities.Role;
import com.app.patients.entities.Session;
import com.app.patients.entities.SessionStatus;
import com.app.patients.entities.User;
import com.app.patients.repositories.NotificationRepository;
import com.app.patients.repositories.PatientRepository;
import com.app.patients.repositories.RoleRepository;
import com.app.patients.repositories.UserRepository;
import com.app.patients.services.NotificationService;
@Component
public class AppInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private NotificationRepository notificationRepository;

    @Override
    public void run(String... args) {

        Role adminRole = createRoleIfNotExists("ROLE_ADMIN");
        Role userRole = createRoleIfNotExists("ROLE_USER");

        List<Role> roles = Arrays.asList(adminRole, userRole);

        User testUser = createTestUserIfNotExists(roles);

        createDefaultPatientsIfNotExists(testUser);

        createInitialNotifications(testUser);
    }

    private Role createRoleIfNotExists(String roleName) {
        return roleRepository.findByName(roleName)
                .orElseGet(() -> roleRepository.save(new Role(roleName)));
    }

    private User createTestUserIfNotExists(List<Role> roles) {
        return userRepository.findByUsername("test123")
                .orElseGet(() -> {
                    User user = new User();
                    user.setUsername("test123");
                    user.setPassword(passwordEncoder.encode("test123"));
                    user.setName("Test");
                    user.setSurname("User");
                    user.setEnabled(true);
                    user.setRoles(roles);
                    return userRepository.save(user);
                });
    }

    private void createDefaultPatientsIfNotExists(User user) {

        if (!patientRepository.findByUser(user).isEmpty()) {
            return;
        }

        int currentYear = LocalDate.now().getYear();

        // ============================================================
        // PATIENTE 1 — JUAN PEREZ
        // ============================================================
        Patient p1 = new Patient(
                "Juan Perez",
                "12345678",
                "juan@example.com",
                "1133445566",
                user
        );

        List<Session> p1Sessions = Arrays.asList(
                createPaidSession(currentYear, 1, 10, 5000, p1),
                createPaidSession(currentYear, 2, 5, 5000, p1),
                createPendingSession(currentYear, 3, 14, 5000, p1),
                createPaidSession(currentYear, 4, 20, 5200, p1),
                createPendingSession(currentYear, 5, 11, 5200, p1),
                createPaidSession(currentYear, 6, 18, 5400, p1),
                createPendingSession(currentYear, 7, 7, 5400, p1),
                createPaidSession(currentYear, 8, 25, 5600, p1),
                createPendingSession(currentYear, 9, 9, 5600, p1),
                createPaidSession(currentYear, 10, 2, 5800, p1),
                createPendingSession(currentYear, 11, 17, 5800, p1),
                createPaidSession(currentYear, 12, 22, 6000, p1)
        );

        p1.getSessions().addAll(p1Sessions);
        p1.setDebt(
            p1Sessions.stream()
                .filter(s -> s.getEstado() == SessionStatus.PENDIENTE)
                .mapToDouble(Session::getPrecio)
                .sum()
        );

        // ============================================================
        // PATIENTE 2 — MARÍA GÓMEZ
        // ============================================================
        Patient p2 = new Patient(
                "María Gómez",
                "87654321",
                "maria@example.com",
                "1122334455",
                user
        );

        List<Session> p2Sessions = Arrays.asList(
                createPendingSession(currentYear, 1, 3, 6000, p2),
                createPaidSession(currentYear, 2, 7, 6000, p2),
                createPendingSession(currentYear, 3, 15, 6000, p2),
                createPaidSession(currentYear, 4, 19, 6200, p2),
                createPendingSession(currentYear, 5, 27, 6200, p2),
                createPaidSession(currentYear, 6, 8, 6400, p2),
                createPendingSession(currentYear, 7, 12, 6400, p2),
                createPaidSession(currentYear, 8, 30, 6600, p2),
                createPendingSession(currentYear, 9, 4, 6600, p2),
                createPaidSession(currentYear, 10, 16, 6800, p2),
                createPendingSession(currentYear, 11, 21, 6800, p2),
                createPaidSession(currentYear, 12, 29, 7000, p2)
        );

        p2.getSessions().addAll(p2Sessions);
        p2.setDebt(
            p2Sessions.stream()
                .filter(s -> s.getEstado() == SessionStatus.PENDIENTE)
                .mapToDouble(Session::getPrecio)
                .sum()
        );

        // ============================================================
        // PATIENTE 3 — CARLOS DÍAZ
        // ============================================================
        Patient p3 = new Patient(
                "Carlos Díaz",
                "45678912",
                "carlos@example.com",
                "1199887766",
                user
        );

        List<Session> p3Sessions = Arrays.asList(
                createPaidSession(currentYear, 1, 13, 4000, p3),
                createPendingSession(currentYear, 2, 24, 4000, p3),
                createPaidSession(currentYear, 3, 28, 4200, p3),
                createPendingSession(currentYear, 4, 6, 4200, p3),
                createPaidSession(currentYear, 5, 15, 4400, p3),
                createPendingSession(currentYear, 6, 23, 4400, p3),
                createPaidSession(currentYear, 7, 4, 4600, p3),
                createPendingSession(currentYear, 8, 11, 4600, p3),
                createPaidSession(currentYear, 9, 20, 4800, p3),
                createPendingSession(currentYear, 10, 27, 4800, p3),
                createPaidSession(currentYear, 11, 9, 5000, p3),
                createPendingSession(currentYear, 12, 18, 5000, p3)
        );

        p3.getSessions().addAll(p3Sessions);
        p3.setDebt(
            p3Sessions.stream()
                .filter(s -> s.getEstado() == SessionStatus.PENDIENTE)
                .mapToDouble(Session::getPrecio)
                .sum()
        );

        // ============================================================
        // GUARDAR PACIENTES
        // ============================================================
        patientRepository.save(p1);
        patientRepository.save(p2);
        patientRepository.save(p3);

        System.out.println("📌 Pacientes con sesiones realistas creados.");
    }

    // ============================================================
    // HELPERS PARA CREAR SESIONES
    // ============================================================

    private Session createPaidSession(int year, int month, int day, double price, Patient patient) {
        Session s = new Session();
        s.setFecha(LocalDateTime.of(year, month, day, 10, 0));
        s.setPrecio(price);
        s.setEstado(SessionStatus.PAGADO);
        s.setFechaDePago(s.getFecha().plusDays(1));
        s.setPatient(patient);
        return s;
    }

    private Session createPendingSession(int year, int month, int day, double price, Patient patient) {
        Session s = new Session();
        s.setFecha(LocalDateTime.of(year, month, day, 10, 0));
        s.setPrecio(price);
        s.setEstado(SessionStatus.PENDIENTE);
        s.setPatient(patient);
        return s;
    }

    // ============================================================

    private void createInitialNotifications(User user) {

        if (!notificationRepository.findByUser(user).isEmpty()) {
            return;
        }

        notificationService.createNotification(
                "financiera",
                "💰 Tenés nuevas sesiones pendientes de pago.",
                user
        );

        notificationService.createNotification(
                "analitica",
                "📊 Tu facturación anual está creciendo de forma estable.",
                user
        );

        notificationService.createNotification(
                "cliente",
                "🧾 Recordatorio: algunos clientes tienen sesiones sin pagar.",
                user
        );

        System.out.println("🔔 Notificaciones iniciales creadas.");
    }
}
