package com.fpt.mtb.dto;

import com.fpt.mtb.entity.Genre;

public record GenreResponse(Long id, String name) {
    public static GenreResponse from(Genre g) {
        return new GenreResponse(g.getId(), g.getName());
    }
}
