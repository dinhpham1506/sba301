package fu.sba301.ems.dto;

import fu.sba301.ems.entity.EmployeeStatus;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class EmployeeRequest {
    @NotBlank(message = "Employee name is required")
    @Size(max = 100, message = "Employee name must not exceed 100 characters")
    private String employeeName;

    @NotBlank(message = "Email is required")
    @Email(message = "Email is invalid")
    @Size(max = 100, message = "Email must not exceed 100 characters")
    private String email;

    @NotNull(message = "Salary is required")
    @Min(value = 3000000, message = "Salary must be greater than or equal 3000000")
    @Max(value = 100000000, message = "Salary must be less than or equal 100000000")
    private Integer salary;

    @NotNull(message = "Hire date is required")
    @PastOrPresent(message = "Hire date must not be in the future")
    private LocalDate hireDate;

    @NotNull(message = "Status is required")
    private EmployeeStatus status;

    @NotNull(message = "Department is required")
    private Long departmentId;
}
