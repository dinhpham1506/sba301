package fu.sba301.ems.controller;

import fu.sba301.ems.dto.*;
import fu.sba301.ems.entity.EmployeeStatus;
import fu.sba301.ems.service.EmployeeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
@Tag(name = "Employee", description = "APIs for managing employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping
    @Operation(summary = "Get list of employees", description = "Filter by name, department and status with pagination")
    public PageDTO<EmployeeResponse> getList(
            @Parameter(description = "Filter by employee name (partial match)") @RequestParam(required = false) String name,
            @Parameter(description = "Filter by department ID") @RequestParam(required = false) Long departmentId,
            @Parameter(description = "Filter by status") @RequestParam(required = false) EmployeeStatus status,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort field") @RequestParam(defaultValue = "employeeName") String sortBy) {
        return employeeService.getList(name, departmentId, status, PageRequest.of(page, size, Sort.by(sortBy)));
    }

    @GetMapping("/statuses")
    @Operation(summary = "Get all employee statuses (enum values)")
    public List<EmployeeStatus> getStatuses() {
        return Arrays.asList(EmployeeStatus.values());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get employee by ID")
    public EmployeeResponse getById(@PathVariable Long id) {
        return employeeService.getById(id);
    }

    @PostMapping
    @Operation(summary = "Create a new employee", description = "Returns 400 with a message when the name is duplicated")
    public EmployeeResponse create(@Valid @RequestBody EmployeeRequest request) {
        return employeeService.create(request);
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Update the status of an employee")
    public EmployeeResponse updateStatus(@PathVariable Long id, @Valid @RequestBody StatusRequest request) {
        return employeeService.updateStatus(id, request.getStatus());
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete an employee")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        employeeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
