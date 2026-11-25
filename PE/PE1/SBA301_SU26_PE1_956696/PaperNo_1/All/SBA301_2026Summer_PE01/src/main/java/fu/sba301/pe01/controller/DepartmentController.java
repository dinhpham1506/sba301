package fu.sba301.pe01.controller;

import fu.sba301.pe01.dto.DepartmentDto;
import fu.sba301.pe01.service.DepartmentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
@RequiredArgsConstructor
@Tag(name = "Department", description = "APIs for managing departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    @GetMapping
    @Operation(summary = "Get all departments")
    @ApiResponse(responseCode = "200", description = "List retrieved successfully")
    public List<DepartmentDto> getAll() {
        return departmentService.getAll();
    }
}
