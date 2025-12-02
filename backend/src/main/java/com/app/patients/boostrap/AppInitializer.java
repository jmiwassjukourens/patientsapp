package com.app.patients.boostrap;


import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.app.patients.entities.Role;
import com.app.patients.entities.User;
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

    @Override
    public void run(String... args) {

        Role adminRole = createRoleIfNotExists("ROLE_ADMIN");
        Role userRole  = createRoleIfNotExists("ROLE_USER");

        List<Role> roles = Arrays.asList(adminRole, userRole);


        createTestUserIfNotExists(roles);
    }

    private Role createRoleIfNotExists(String roleName) {
        return roleRepository.findByName(roleName)
                .orElseGet(() -> {
                    Role role = new Role(roleName);
                    Role saved = roleRepository.save(role);
                    System.out.println("Role created: " + roleName);
                    return saved;
                });
    }

    private void createTestUserIfNotExists(List<Role> roles) {
        Optional<User> existing = userRepository.findByUsername("test123");

        if (existing.isPresent()) {
            return;
        }

        User user = new User();
        user.setUsername("test123");
        user.setPassword(passwordEncoder.encode("test123")); 
        user.setName("Test");
        user.setSurname("User");
        user.setEnabled(true);
        user.setRoles(roles);


        userRepository.save(user);


    }
}
