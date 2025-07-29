/*package com.stock.config;

import com.stock.model.User;
import com.stock.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class UserDataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByUsername("admin").isEmpty()) {
            userRepository.save(new User(null, "admin", passwordEncoder.encode("admin123"), "ROLE_ADMIN"));
        }

        if (userRepository.findByUsername("user").isEmpty()) {
            userRepository.save(new User(null, "user", passwordEncoder.encode("user123"), "ROLE_USER"));
        }
    }
}*/
