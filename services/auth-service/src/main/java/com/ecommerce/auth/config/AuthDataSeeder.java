package com.ecommerce.auth.config;

import com.ecommerce.auth.entity.Role;
import com.ecommerce.auth.entity.User;
import com.ecommerce.auth.entity.enums.RoleName;
import com.ecommerce.auth.repository.RoleRepository;
import com.ecommerce.auth.repository.UserRepository;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class AuthDataSeeder implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        Role adminRole = createRoleIfMissing(RoleName.ROLE_ADMIN);
        Role customerRole = createRoleIfMissing(RoleName.ROLE_CUSTOMER);
        Role shipperRole = createRoleIfMissing(RoleName.ROLE_SHIPPER);

        createUserIfMissing(
                "admin",
                "admin123",
                "Quản trị hệ thống",
                "admin@ecommerce.local",
                "0900000001",
                "Văn phòng điều hành Ecommerce",
                adminRole
        );

        createUserIfMissing(
                "customer",
                "customer123",
                "Phạm Văn Hoàng",
                "customer@ecommerce.local",
                "0901234567",
                "12 Nguyễn Trãi, Quận 1, TP. Hồ Chí Minh",
                customerRole
        );

        createUserIfMissing(
                "shipper",
                "shipper123",
                "Nguyễn Thị Kiều Trinh",
                "shipper@ecommerce.local",
                "0907654321",
                "Khu vực giao hàng trung tâm",
                shipperRole
        );

        for (int i = 1; i <= 24; i++) {
            String suffix = String.format("%02d", i);
            createUserIfMissing(
                    "customer" + suffix,
                    "customer123",
                    "Khách hàng mẫu " + suffix,
                    "customer" + suffix + "@ecommerce.local",
                    "09100000" + suffix,
                    "Địa chỉ khách hàng mẫu " + suffix + ", TP. Hồ Chí Minh",
                    customerRole
            );
        }

        for (int i = 1; i <= 23; i++) {
            String suffix = String.format("%02d", i);
            createUserIfMissing(
                    "shipper" + suffix,
                    "shipper123",
                    "Shipper mẫu " + suffix,
                    "shipper" + suffix + "@ecommerce.local",
                    "09200000" + suffix,
                    "Khu vực giao hàng mẫu " + suffix,
                    shipperRole
            );
        }
    }

    private Role createRoleIfMissing(RoleName roleName) {
        return roleRepository.findByName(roleName)
                .orElseGet(() -> {
                    Role role = new Role();
                    role.setName(roleName);
                    return roleRepository.save(role);
                });
    }

    private void createUserIfMissing(
            String username,
            String password,
            String fullName,
            String email,
            String phone,
            String address,
            Role role
    ) {
        if (userRepository.existsByUsername(username)) {
            return;
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setFullName(fullName);
        user.setEmail(email);
        user.setPhone(phone);
        user.setAddress(address);
        user.setEnabled(true);
        user.setRoles(Set.of(role));
        userRepository.save(user);
    }
}
