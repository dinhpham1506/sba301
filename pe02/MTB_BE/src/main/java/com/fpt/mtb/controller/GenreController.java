package com.fpt.mtb.controller;

import com.fpt.mtb.dto.GenreResponse;
import com.fpt.mtb.service.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/genres")
@RequiredArgsConstructor
public class GenreController {

    private final GenreService genreService;

    /** GET /api/genres -> [{"id":1,"name":"Action"}, ...] (dropdown on FE) */
    @GetMapping
    public ResponseEntity<List<GenreResponse>> getGenres() {
        return ResponseEntity.ok(genreService.getAll());
    }
}
