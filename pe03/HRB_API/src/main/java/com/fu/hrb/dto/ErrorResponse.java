package com.fu.hrb.dto;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.LocalDateTime;
import java.util.List;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ErrorResponse(LocalDateTime timestamp, int status, String error, String message,
                            List<FieldError> errors) {

    public record FieldError(String field, String message) {
    }
}
