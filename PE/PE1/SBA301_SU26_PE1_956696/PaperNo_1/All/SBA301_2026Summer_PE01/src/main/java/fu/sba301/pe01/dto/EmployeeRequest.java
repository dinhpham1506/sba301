package fu.sba301.pe01.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class EmployeeRequest {

    @NotBlank(message = "Full Name is required")
    @Size(max = 100, message = "Full Name must not exceed 100 characters")
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email is invalid format")
    @Size(max = 100, message = "Email must not exceed 100 characters")
    private String email;

    @NotBlank(message = "Phone is required")
    @Pattern(regexp = "\\d{9,11}", message = "Phone must contain only digits (9-11 characters)")
    private String phone;

    @NotBlank(message = "Position is required")
    @Size(max = 100, message = "Position must not exceed 100 characters")
    private String position;

    @NotNull(message = "Date of Birth is required")
    private LocalDate dateOfBirth;

    @NotNull(message = "Start Date is required")
    @PastOrPresent(message = "Start Date must not be in the future")
    private LocalDate startDate;

    @NotNull(message = "Salary is required")
    @Min(value = 1_000_000, message = "Salary must be between 1,000,000 and 100,000,000")
    @Max(value = 100_000_000, message = "Salary must be between 1,000,000 and 100,000,000")
    private Long salary;

    @NotNull(message = "Department ID is required")
    @Positive(message = "Department ID must be a positive number")
    private Long departmentId;

    // Employee must be at least 18 years old at the time of entry
    @AssertTrue(message = "Employee must be at least 18 years old")
    private boolean isAtLeast18() {
        if (dateOfBirth == null) return true;
        return !dateOfBirth.isAfter(LocalDate.now().minusYears(18));
    }
}
