package fu.sba301.ems.service;

import fu.sba301.ems.dto.*;
import fu.sba301.ems.entity.Department;
import fu.sba301.ems.entity.Employee;
import fu.sba301.ems.entity.EmployeeStatus;
import fu.sba301.ems.repository.DepartmentRepository;
import fu.sba301.ems.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;

    @Transactional(readOnly = true)
    public PageDTO<EmployeeResponse> getList(String name, Long departmentId, EmployeeStatus status, Pageable pageable) {
        String keyword = (name == null || name.isBlank()) ? null : name.trim();
        return PageDTO.from(employeeRepository.findByFilters(keyword, departmentId, status, pageable).map(this::toResponse));
    }

    @Transactional(readOnly = true)
    public EmployeeResponse getById(Long id) {
        return toResponse(findOrThrow(id));
    }

    public EmployeeResponse create(EmployeeRequest request) {
        if (employeeRepository.existsByEmployeeName(request.getEmployeeName().trim())) {
            throw new IllegalArgumentException("Employee name already exists");
        }
        Employee e = new Employee();
        e.setEmployeeName(request.getEmployeeName().trim());
        e.setEmail(request.getEmail().trim());
        e.setSalary(request.getSalary());
        e.setHireDate(request.getHireDate());
        e.setStatus(request.getStatus());
        e.setDepartment(departmentRepository.findById(request.getDepartmentId())
                .orElseThrow(() -> new IllegalArgumentException("Department not found")));
        return toResponse(employeeRepository.save(e));
    }

    public EmployeeResponse updateStatus(Long id, EmployeeStatus status) {
        Employee e = findOrThrow(id);
        e.setStatus(status);
        return toResponse(employeeRepository.save(e));
    }

    public void delete(Long id) {
        employeeRepository.delete(findOrThrow(id));
    }

    @Transactional(readOnly = true)
    public List<DepartmentDto> getDepartments() {
        return departmentRepository.findAll().stream()
                .map(d -> new DepartmentDto(d.getDepartmentId(), d.getDepartmentName()))
                .toList();
    }

    private Employee findOrThrow(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found: " + id));
    }

    private EmployeeResponse toResponse(Employee e) {
        EmployeeResponse r = new EmployeeResponse();
        r.setEmployeeId(e.getEmployeeId());
        r.setEmployeeName(e.getEmployeeName());
        r.setEmail(e.getEmail());
        r.setSalary(e.getSalary());
        r.setHireDate(e.getHireDate());
        r.setStatus(e.getStatus());
        Department d = e.getDepartment();
        r.setDepartmentId(d.getDepartmentId());
        r.setDepartmentName(d.getDepartmentName());
        return r;
    }
}
