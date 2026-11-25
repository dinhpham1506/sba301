package com.fpt.mtb.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Arrays;

public enum MovieStatus {
    UPCOMING("Upcoming"),
    SHOWING("Showing"),
    ENDED("Ended");

    private final String label;

    MovieStatus(String label) {
        this.label = label;
    }

    @JsonValue
    public String getLabel() {
        return label;
    }

    @JsonCreator
    public static MovieStatus from(String value) {
        if (value == null) return null;
        String v = value.trim();
        return Arrays.stream(values())
                .filter(s -> s.label.equalsIgnoreCase(v) || s.name().equalsIgnoreCase(v))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid status: " + value));
    }
}
