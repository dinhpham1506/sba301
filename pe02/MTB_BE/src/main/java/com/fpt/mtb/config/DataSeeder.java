package com.fpt.mtb.config;

import com.fpt.mtb.entity.Genre;
import com.fpt.mtb.entity.Movie;
import com.fpt.mtb.enums.AgeRating;
import com.fpt.mtb.enums.MovieStatus;
import com.fpt.mtb.repository.GenreRepository;
import com.fpt.mtb.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

/** First start: inserts 6 genres (if Genres is empty) and 15 sample movies (if Movies is empty). */
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private static final List<String> GENRES =
            List.of("Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Romance");

    private final GenreRepository genreRepository;
    private final MovieRepository movieRepository;

    @Override
    @Transactional
    public void run(String... args) {
        if (genreRepository.count() == 0) {
            genreRepository.saveAll(GENRES.stream()
                    .map(name -> Genre.builder().name(name).build())
                    .toList());
        }
        if (movieRepository.count() > 0) return;

        Map<String, Genre> g = genreRepository.findAll().stream()
                .collect(Collectors.toMap(Genre::getName, Function.identity()));

        movieRepository.saveAll(List.of(
                m("Beyond the Stars", g.get("Sci-Fi"), "Tran Minh", 150, 110000, "2027-01-10", AgeRating.C13, "English", MovieStatus.UPCOMING),
                m("City of Dreams", g.get("Drama"), "Le Thu Ha", 132, 95000, "2026-12-05", AgeRating.C16, "Vietnamese", MovieStatus.UPCOMING),
                m("Dragon Storm", g.get("Action"), "Pham Quang", 128, 95000, "2026-11-25", AgeRating.C13, "English", MovieStatus.UPCOMING),
                m("Funny Business", g.get("Comedy"), "Nguyen Hoa", 88, 72000, "2026-09-20", AgeRating.P, "Vietnamese", MovieStatus.ENDED),
                m("Galaxy Warriors", g.get("Sci-Fi"), "Linh Dang", 125, 90000, "2026-11-10", AgeRating.C13, "English", MovieStatus.SHOWING),
                m("Haunted Manor", g.get("Horror"), "Vo Thanh", 105, 85000, "2026-10-31", AgeRating.C18, "English", MovieStatus.SHOWING),
                m("Love in Hanoi", g.get("Romance"), "Do My Linh", 112, 80000, "2026-02-14", AgeRating.C13, "Vietnamese", MovieStatus.ENDED),
                m("Midnight Run", g.get("Action"), "Bui Duc", 118, 90000, "2026-11-15", AgeRating.C16, "English", MovieStatus.SHOWING),
                m("Ocean Whisper", g.get("Drama"), "Hoang Lan", 140, 100000, "2026-12-20", AgeRating.P, "Japanese", MovieStatus.UPCOMING),
                m("Pixel Panic", g.get("Comedy"), "Ngo Tuan", 95, 75000, "2026-08-01", AgeRating.P, "English", MovieStatus.ENDED),
                m("Red Moon", g.get("Horror"), "Dang Khoa", 99, 85000, "2027-02-02", AgeRating.C18, "Korean", MovieStatus.UPCOMING),
                m("Silent Echo", g.get("Sci-Fi"), "Mai Anh", 135, 105000, "2026-11-20", AgeRating.C13, "English", MovieStatus.SHOWING),
                m("Summer Letters", g.get("Romance"), "Truong Vy", 108, 78000, "2026-07-07", AgeRating.P, "Vietnamese", MovieStatus.ENDED),
                m("The Last Guardian", g.get("Action"), "Ly Hung", 145, 120000, "2026-12-24", AgeRating.C16, "English", MovieStatus.UPCOMING),
                m("Winter Tale", g.get("Drama"), "Phan Ngoc", 126, 88000, "2026-11-01", AgeRating.C13, "French", MovieStatus.SHOWING)
        ));
    }

    private Movie m(String title, Genre genre, String director, int duration, int price,
                    String releaseDate, AgeRating ageRating, String language, MovieStatus status) {
        return Movie.builder()
                .title(title).genre(genre).director(director)
                .duration(duration).ticketPrice(price)
                .releaseDate(LocalDate.parse(releaseDate))
                .ageRating(ageRating).language(language).status(status)
                .build();
    }
}
