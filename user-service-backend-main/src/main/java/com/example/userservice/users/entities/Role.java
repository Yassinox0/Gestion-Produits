package com.example.userservice.users.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor
@Entity
@Table(name = "role")
public class Role {
	@Id 
	@GeneratedValue (strategy=GenerationType.IDENTITY) 
	private Long role_id;
	private String role;
}
