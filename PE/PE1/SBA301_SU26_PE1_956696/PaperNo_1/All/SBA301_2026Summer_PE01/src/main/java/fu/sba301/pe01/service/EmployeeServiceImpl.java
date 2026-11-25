package fu.sba301.pe01.service;

import fu.sba301.pe01.dto.EmployeeRequest;
import fu.sba301.pe01.dto.EmployeeResponse;
import fu.sba301.pe01.dto.PageDTO;
import fu.sba301.pe01.entity.Department;
import fu.sba301.pe01.entity.Employee;
import fu.sba301.pe01.exception.PEFunctionalException;
import fu.sba301.pe01.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Override
    public PageDTO<EmployeeResponse> getList(String name, Long departmentId, Pageable pageable) {
        return PageDTO.from(
                employeeRepository.findByFilters(name, departmentId, pageable).map(this::toResponse));
    }

    @Override
    public EmployeeResponse getById(Long id) {
        return toResponse(findOrThrow(id));
    }

    @Override
    public EmployeeResponse create(EmployeeRequest request) {
        if (employeeRepository.existsByFullName(request.getFullName())) {
            throw new PEFunctionalException(PEFunctionalException.EMPLOYEE_NAME_ALREADY_EXISTS, "Full Name already exists: " + request.getFullName());
        }
        if (employeeRepository.existsByEmail(request.getEmail())) {
            throw new PEFunctionalException(PEFunctionalException.EMPLOYEE_EMAIL_ALREADY_EXISTS, "Email already exists: " + request.getEmail());
        }
        return toResponse(employeeRepository.save(toEntity(new Employee(), request)));
    }

    @Override
    public EmployeeResponse update(Long id, EmployeeRequest request) {
        Employee employee = findOrThrow(id);
        if (!employee.getFullName().equals(request.getFullName()) && employeeRepository.existsByFullName(request.getFullName())) {
            throw new PEFunctionalException(PEFunctionalException.EMPLOYEE_NAME_ALREADY_EXISTS, "Full name already exist" + request.getFullName());
        }
        if (!employee.getEmail().equals(request.getEmail()) && employeeRepository.existsByEmailAndEmployeeIdNot(request.getEmail(), id)) {
            throw new PEFunctionalException(PEFunctionalException.EMPLOYEE_EMAIL_ALREADY_EXISTS, "Email already exist" + request.getEmail());
        }
        return toResponse(employeeRepository.save(toEntity(employee, request)));
    }

    @Override
    public void delete(Long id) {
        findOrThrow(id);
        employeeRepository.deleteById(id);
    }

    private Employee findOrThrow(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found: " + id));
    }

    private Employee toEntity(Employee e, EmployeeRequest req) {
        e.setFullName(req.getFullName().trim());
        e.setEmail(req.getEmail().trim());
        e.setPhone(req.getPhone());
        e.setPosition(req.getPosition());
        e.setDateOfBirth(req.getDateOfBirth());
        e.setStartDate(req.getStartDate());
        e.setSalary(req.getSalary());
        Department department = new Department();
        department.setDepartmentId(req.getDepartmentId());
        e.setDepartment(department);
        return e;
    }

    private EmployeeResponse toResponse(Employee e) {
        EmployeeResponse res = new EmployeeResponse();
        res.setEmployeeId(e.getEmployeeId());
        res.setEmployeeCode(String.format("EMP-%03d", e.getEmployeeId()));
        res.setFullName(e.getFullName());
        res.setEmail(e.getEmail());
        res.setPhone(e.getPhone());
        res.setPosition(e.getPosition());
        res.setDateOfBirth(e.getDateOfBirth());
        res.setStartDate(e.getStartDate());
        res.setSalary(e.getSalary());
        res.setDepartmentId(e.getDepartment().getDepartmentId());
        res.setDepartmentName(e.getDepartment().getDepartmentName());
        return res;
    }
}
