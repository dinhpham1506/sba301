package fu.sba301.ems.dto;

import fu.sba301.ems.entity.EmployeeStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class StatusRequest {
    @NotNull(message = "Status is required")
    private EmployeeStatus status;
}
