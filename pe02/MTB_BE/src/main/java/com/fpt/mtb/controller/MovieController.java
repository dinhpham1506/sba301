package com.fpt.mtb.controller;

import com.fpt.mtb.dto.MovieRequest;
import com.fpt.mtb.dto.MovieResponse;
import com.fpt.mtb.dto.PageResponse;
import com.fpt.mtb.service.MovieService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;

    /**
     * GET /api/movies?title=star&genreId=5&page=0&size=5
     * Paginated, filtered (title partial, genreId exact), sorted by title ASC. page is 0-based.
     */
    @GetMapping("/movies")
    public ResponseEntity<PageResponse<MovieResponse>> getMovies(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) Long genreId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "" + MovieService.DEFAULT_PAGE_SIZE) int size) {
        return ResponseEntity.ok(movieService.search(title, genreId, page, size));
    }

    /** GET /api/movies/{id} -> 200 or 404 */
    @GetMapping("/movies/{id}")
    public ResponseEntity<MovieResponse> getMovie(@PathVariable Long id) {
        return ResponseEntity.ok(movieService.getById(id));
    }

    /** POST /api/movies -> 200 with created movie, or 400 */
    @PostMapping("/movies")
    public ResponseEntity<MovieResponse> createMovie(@Valid @RequestBody MovieRequest request) {
        return ResponseEntity.ok(movieService.create(request));
    }

    /** PUT /api/movies/{id} -> 200, 400 or 404 */
    @PutMapping("/movies/{id}")
    public ResponseEntity<MovieResponse> updateMovie(@PathVariable Long id,
                                                     @Valid @RequestBody MovieRequest request) {
        return ResponseEntity.ok(movieService.update(id, request));
    }

    /** DELETE /api/movies/{id} -> 204 or 404 */
    @DeleteMapping("/movies/{id}")
    public ResponseEntity<Void> deleteMovie(@PathVariable Long id) {
        movieService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
