package com.fpt.mtb.entity;

import com.fpt.mtb.enums.AgeRating;
import com.fpt.mtb.enums.MovieStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "Movies")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 150, columnDefinition = "NVARCHAR(150)")
    private String title;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "genre_id", nullable = false)
    private Genre genre;

    @Column(nullable = false, length = 100, columnDefinition = "NVARCHAR(100)")
    private String director;

    /** minutes */
    @Column(nullable = false)
    private Integer duration;

    /** VND */
    @Column(nullable = false)
    private Integer ticketPrice;

    @Column(nullable = false)
    private LocalDate releaseDate;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 10)
    private AgeRating ageRating;

    @Column(nullable = false, length = 50, columnDefinition = "NVARCHAR(50)")
    private String language;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private MovieStatus status;
}
