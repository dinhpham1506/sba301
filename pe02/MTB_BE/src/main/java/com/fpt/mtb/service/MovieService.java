package com.fpt.mtb.service;

import com.fpt.mtb.dto.MovieRequest;
import com.fpt.mtb.dto.MovieResponse;
import com.fpt.mtb.dto.PageResponse;
import com.fpt.mtb.entity.Genre;
import com.fpt.mtb.entity.Movie;
import com.fpt.mtb.enums.MovieStatus;
import com.fpt.mtb.exception.DuplicateResourceException;
import com.fpt.mtb.exception.ResourceNotFoundException;
import com.fpt.mtb.repository.GenreRepository;
import com.fpt.mtb.repository.MovieRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class MovieService {

    public static final int DEFAULT_PAGE_SIZE = 5;

    private final MovieRepository movieRepository;
    private final GenreRepository genreRepository;

    @Transactional(readOnly = true)
    public PageResponse<MovieResponse> search(String title, Long genreId, int page, int size) {
        String t = StringUtils.hasText(title) ? title.trim() : null;
        int safePage = Math.max(page, 0);
        int safeSize = size > 0 ? size : DEFAULT_PAGE_SIZE;

        Pageable pageable = PageRequest.of(safePage, safeSize, Sort.by(Sort.Direction.ASC, "title"));
        return PageResponse.from(movieRepository.search(t, genreId, pageable).map(MovieResponse::from));
    }

    @Transactional(readOnly = true)
    public MovieResponse getById(Long id) {
        return MovieResponse.from(findOrThrow(id));
    }

    @Transactional
    public MovieResponse create(MovieRequest req) {
        if (movieRepository.existsByTitleIgnoreCase(req.getTitle())) {
            throw new DuplicateResourceException("Movie Title already exists: " + req.getTitle());
        }
        Movie movie = new Movie();
        apply(movie, req);
        return MovieResponse.from(movieRepository.save(movie));
    }

    @Transactional
    public MovieResponse update(Long id, MovieRequest req) {
        Movie movie = findOrThrow(id);
        if (movieRepository.existsByTitleIgnoreCaseAndIdNot(req.getTitle(), id)) {
            throw new DuplicateResourceException("Movie Title already exists: " + req.getTitle());
        }
        apply(movie, req);
        return MovieResponse.from(movieRepository.save(movie));
    }

    @Transactional
    public void delete(Long id) {
        Movie movie = findOrThrow(id);
        movieRepository.delete(movie);
    }

    // ---------- helpers ----------

    private Movie findOrThrow(Long id) {
        return movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found: " + id));
    }

    /** unknown genreId in body -> 400 */
    private Genre findGenreOrThrow(Long genreId) {
        return genreRepository.findById(genreId)
                .orElseThrow(() -> new IllegalArgumentException("Genre not found: " + genreId));
    }

    private void apply(Movie m, MovieRequest req) {
        m.setTitle(req.getTitle());
        m.setGenre(findGenreOrThrow(req.getGenreId()));
        m.setDirector(req.getDirector());
        m.setDuration(req.getDuration());
        m.setTicketPrice(req.getTicketPrice());
        m.setReleaseDate(req.getReleaseDate());
        m.setAgeRating(req.getAgeRating());
        m.setLanguage(req.getLanguage());
        m.setStatus(req.getStatus() != null ? req.getStatus() : deriveStatus(req.getReleaseDate()));
    }

    private MovieStatus deriveStatus(LocalDate releaseDate) {
        return releaseDate.isAfter(LocalDate.now()) ? MovieStatus.UPCOMING : MovieStatus.SHOWING;
    }
}
