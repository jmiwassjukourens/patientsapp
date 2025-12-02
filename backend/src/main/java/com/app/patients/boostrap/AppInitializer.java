package com.app.patients.boostrap;


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
import com.app.patients.repositories.PatientRepository;
import com.app.patients.repositories.RoleRepository;
import com.app.patients.repositories.UserRepository;
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

    @Override
    public void run(String... args) {

        Role adminRole = createRoleIfNotExists("ROLE_ADMIN");
        Role userRole = createRoleIfNotExists("ROLE_USER");

        List<Role> roles = Arrays.asList(adminRole, userRole);

        User testUser = createTestUserIfNotExists(roles);

        createDefaultPatientsIfNotExists(testUser);
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

        if (patientRepository.findByUser(user).size() > 0) {
            return;
        }


        Patient p1 = new Patient(
                "Juan Perez",
                "12345678",
                "juan@example.com",
                "1133445566",
                user
        );

        Session s1 = new Session();
        s1.setFecha(LocalDateTime.now().minusDays(10));
        s1.setPrecio(5000.0);
        s1.setEstado(SessionStatus.PAGADO);
        s1.setFechaDePago(LocalDateTime.now().minusDays(9));
        s1.setPatient(p1);

        Session s2 = new Session();
        s2.setFecha(LocalDateTime.now().minusDays(5));
        s2.setPrecio(5000.0);
        s2.setEstado(SessionStatus.PAGADO);
        s2.setFechaDePago(LocalDateTime.now().minusDays(4));
        s2.setPatient(p1);

        Session s3 = new Session();
        s3.setFecha(LocalDateTime.now().minusDays(2));
        s3.setPrecio(4500.0);
        s3.setEstado(SessionStatus.PAGADO);
        s3.setFechaDePago(LocalDateTime.now().minusDays(1));
        s3.setPatient(p1);

        p1.getSessions().addAll(Arrays.asList(s1, s2, s3));
        p1.setDebt(0.0);



        Patient p2 = new Patient(
                "María Gómez",
                "87654321",
                "maria@example.com",
                "1122334455",
                user
        );

        Session s4 = new Session();
        s4.setFecha(LocalDateTime.now().minusDays(7));
        s4.setPrecio(6000.0);
        s4.setEstado(SessionStatus.PENDIENTE);
        s4.setPatient(p2);

        Session s5 = new Session();
        s5.setFecha(LocalDateTime.now().minusDays(3));
        s5.setPrecio(6000.0);
        s5.setEstado(SessionStatus.PENDIENTE);
        s5.setPatient(p2);

        Session s6 = new Session();
        s6.setFecha(LocalDateTime.now().minusDays(1));
        s6.setPrecio(6000.0);
        s6.setEstado(SessionStatus.PENDIENTE);
        s6.setPatient(p2);

        p2.getSessions().addAll(Arrays.asList(s4, s5, s6));
        p2.setDebt(6000.0 * 3); // 18k de deuda


        Patient p3 = new Patient(
                "Carlos Díaz",
                "45678912",
                "carlos@example.com",
                "1199887766",
                user
        );

        Session s7 = new Session();
        s7.setFecha(LocalDateTime.now().minusDays(12));
        s7.setPrecio(4000.0);
        s7.setEstado(SessionStatus.PAGADO);
        s7.setFechaDePago(LocalDateTime.now().minusDays(11));
        s7.setPatient(p3);

        Session s8 = new Session();
        s8.setFecha(LocalDateTime.now().minusDays(4));
        s8.setPrecio(4000.0);
        s8.setEstado(SessionStatus.PENDIENTE);
        s8.setPatient(p3);

        Session s9 = new Session();
        s9.setFecha(LocalDateTime.now().minusDays(2));
        s9.setPrecio(4000.0);
        s9.setEstado(SessionStatus.PENDIENTE);
        s9.setPatient(p3);

        p3.getSessions().addAll(Arrays.asList(s7, s8, s9));
        p3.setDebt(4000.0 * 2); // 8k de deuda



        patientRepository.save(p1);
        patientRepository.save(p2);
        patientRepository.save(p3);

        System.out.println("📌 Pacientes iniciales creados con sesiones pagadas, impagas y mixtas.");
    }
}