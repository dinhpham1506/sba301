package fu.sba301.pe01.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class EmployeeResponse {
    private Long employeeId;
    private String employeeCode; // e.g. EMP-001, derived from employeeId
    private String fullName;
    private String email;
    private String phone;
    private String position;
    private LocalDate dateOfBirth;
    private LocalDate startDate;
    private Long salary;
    private Long departmentId;
    private String departmentName;
}
