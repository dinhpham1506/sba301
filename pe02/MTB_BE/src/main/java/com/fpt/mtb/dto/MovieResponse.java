package com.fpt.mtb.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fpt.mtb.entity.Movie;
import com.fpt.mtb.enums.AgeRating;
import com.fpt.mtb.enums.MovieStatus;

import java.time.LocalDate;

public record MovieResponse(
        Long id,
        String title,
        GenreResponse genre,
        String director,
        Integer duration,
        Integer ticketPrice,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd") LocalDate releaseDate,
        AgeRating ageRating,
        String language,
        MovieStatus status
) {
    public static MovieResponse from(Movie m) {
        return new MovieResponse(
                m.getId(), m.getTitle(), GenreResponse.from(m.getGenre()), m.getDirector(),
                m.getDuration(), m.getTicketPrice(), m.getReleaseDate(),
                m.getAgeRating(), m.getLanguage(), m.getStatus());
    }
}
