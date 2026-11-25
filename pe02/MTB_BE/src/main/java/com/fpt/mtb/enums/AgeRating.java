package com.fpt.mtb.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

import java.util.Arrays;

public enum AgeRating {
    P, C13, C16, C18;

    @JsonValue
    public String getLabel() {
        return name();
    }

    @JsonCreator
    public static AgeRating from(String value) {
        if (value == null) return null;
        String v = value.trim();
        return Arrays.stream(values())
                .filter(a -> a.name().equalsIgnoreCase(v))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid age rating: " + value));
    }
}
