package fu.sba301.pe01.controller;

import fu.sba301.pe01.dto.EmployeeRequest;
import fu.sba301.pe01.dto.EmployeeResponse;
import fu.sba301.pe01.dto.PageDTO;
import fu.sba301.pe01.service.EmployeeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employees")
@RequiredArgsConstructor
@Tag(name = "Employee", description = "APIs for managing employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping
    @Operation(summary = "Get list of employees",
            description = "Filter by name and/or department with pagination, sorted by fullName ASC")
    @ApiResponse(responseCode = "200", description = "List retrieved successfully")
    public PageDTO<EmployeeResponse> getList(
            @Parameter(description = "Filter by employee name (partial match)") @RequestParam(required = false) String name,
            @Parameter(description = "Filter by department ID")                @RequestParam(required = false) Long departmentId,
            @Parameter(description = "Page number (0-based)")                  @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size")                              @RequestParam(defaultValue = "5") int size) {
        return employeeService.getList(name, departmentId, PageRequest.of(page, size, Sort.by("fullName")));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get employee by ID")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Employee found"),
            @ApiResponse(responseCode = "404", description = "Employee not found")
    })
    public ResponseEntity<EmployeeResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(employeeService.getById(id));
    }

    @PostMapping
    @Operation(summary = "Create a new employee")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Employee created"),
            @ApiResponse(responseCode = "400", description = "Invalid request / duplicate full name or email"),
            @ApiResponse(responseCode = "409", description = "duplicate full name"),
            @ApiResponse(responseCode = "226", description = "duplicate email")
    })
    public ResponseEntity<EmployeeResponse> create(@Valid @RequestBody EmployeeRequest request) {
        try {
            return ResponseEntity.ok(employeeService.create(request));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update an existing employee")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Employee updated"),
            @ApiResponse(responseCode = "400", description = "Invalid request body"),
            @ApiResponse(responseCode = "404", description = "Employee not found"),
            @ApiResponse(responseCode = "409", description = "duplicate full name"),
            @ApiResponse(responseCode = "226", description = "duplicate email")
    })
    public ResponseEntity<EmployeeResponse> update(@PathVariable Long id,
                                                   @Valid @RequestBody EmployeeRequest request) {
        return ResponseEntity.ok(employeeService.update(id, request));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete an employee")
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Employee deleted"),
            @ApiResponse(responseCode = "404", description = "Employee not found")
    })
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        employeeService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
