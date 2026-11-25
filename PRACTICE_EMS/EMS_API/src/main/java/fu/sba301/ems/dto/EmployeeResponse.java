package fu.sba301.ems.dto;

import fu.sba301.ems.entity.EmployeeStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class EmployeeResponse {
    private Long employeeId;
    private String employeeName;
    private String email;
    private Integer salary;
    private LocalDate hireDate;
    private EmployeeStatus status;
    private Long departmentId;
    private String departmentName;
}
