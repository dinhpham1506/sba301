package fu.sba301.ems.controller;

import fu.sba301.ems.dto.DepartmentDto;
import fu.sba301.ems.service.EmployeeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@RequiredArgsConstructor
@Tag(name = "Department", description = "APIs for departments")
public class DepartmentController {

    private final EmployeeService employeeService;

    @GetMapping
    @Operation(summary = "Get all departments")
    public List<DepartmentDto> getAll() {
        return employeeService.getDepartments();
    }
}
