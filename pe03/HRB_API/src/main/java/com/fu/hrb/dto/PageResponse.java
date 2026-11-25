package com.fu.hrb.dto;

import org.springframework.data.domain.Page;

import java.util.List;

/** Stable JSON for paginated results: content, number (0-based page), size, totalElements, totalPages. */
public record PageResponse<T>(List<T> content, int number, int size, long totalElements, int totalPages) {
    public static <T> PageResponse<T> of(Page<T> page) {
        return new PageResponse<>(page.getContent(), page.getNumber(), page.getSize(),
                page.getTotalElements(), page.getTotalPages());
    }
}
