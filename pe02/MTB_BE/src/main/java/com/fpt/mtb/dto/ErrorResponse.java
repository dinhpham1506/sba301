package com.fpt.mtb.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Error body, e.g.
 * { "timestamp": "2026-11-01T12:15:37.8595364", "status": 400, "error": "Bad Request",
 *   "message": "Movie Title already exists: string" }
 * For validation errors an extra "errors" list is added.
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public record ErrorResponse(
        LocalDateTime timestamp,
        int status,
        String error,
        String message,
        List<FieldError> errors
) {
    public record FieldError(String field, String message) {
    }
}
