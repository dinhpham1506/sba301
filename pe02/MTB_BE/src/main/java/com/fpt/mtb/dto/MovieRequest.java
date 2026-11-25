package com.fpt.mtb.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fpt.mtb.enums.AgeRating;
import com.fpt.mtb.enums.MovieStatus;
import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

/**
 * Body for POST /api/movies and PUT /api/movies/{id}.
 * Messages follow the exam Message List: MS01 (required), MS02 (between), MS07 (release date past).
 */
@Getter
@Setter
@NoArgsConstructor
public class MovieRequest {

    @NotBlank(message = "Movie Title is required.")
    @Size(max = 150, message = "Movie Title must be at most 150 characters.")
    private String title;

    /** id from GET /api/genres */
    @NotNull(message = "Genre is required.")
    private Long genreId;

    @NotBlank(message = "Director is required.")
    @Size(max = 100, message = "Director must be at most 100 characters.")
    private String director;

    @NotNull(message = "Duration is required.")
    @Min(value = 30, message = "Duration must be between 30 and 300.")
    @Max(value = 300, message = "Duration must be between 30 and 300.")
    private Integer duration;

    @NotNull(message = "Ticket Price is required.")
    @Min(value = 30000, message = "Ticket Price must be between 30,000 and 500,000.")
    @Max(value = 500000, message = "Ticket Price must be between 30,000 and 500,000.")
    private Integer ticketPrice;

    @NotNull(message = "Age Rating is required.")
    private AgeRating ageRating;

    @NotBlank(message = "Language is required.")
    @Size(max = 50, message = "Language must be at most 50 characters.")
    private String language;

    @NotNull(message = "Release Date is required.")
    @FutureOrPresent(message = "Release Date must not be in the past.")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate releaseDate;

    /** Optional. If missing the server derives it from releaseDate (future -> Upcoming, today -> Showing). */
    private MovieStatus status;

    // trim text fields as required ("Trim whitespace")
    public void setTitle(String title) {
        this.title = title == null ? null : title.trim();
    }

    public void setDirector(String director) {
        this.director = director == null ? null : director.trim();
    }

    public void setLanguage(String language) {
        this.language = language == null ? null : language.trim();
    }
}
