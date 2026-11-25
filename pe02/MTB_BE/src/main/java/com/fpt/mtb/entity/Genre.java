package com.fpt.mtb.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Genres")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Genre {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 50, columnDefinition = "NVARCHAR(50)")
    private String name;
}
