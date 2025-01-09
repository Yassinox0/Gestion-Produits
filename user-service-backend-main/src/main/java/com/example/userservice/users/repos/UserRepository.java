package com.example.userservice.users.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.userservice.users.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {

		User findByUsername(String username);

}
