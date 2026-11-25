package fu.sba301.pe01.service;

import fu.sba301.pe01.dto.EmployeeRequest;
import fu.sba301.pe01.dto.EmployeeResponse;
import fu.sba301.pe01.dto.PageDTO;
import org.springframework.data.domain.Pageable;

public interface EmployeeService {

    PageDTO<EmployeeResponse> getList(String name, Long departmentId, Pageable pageable);

    EmployeeResponse getById(Long id);

    EmployeeResponse create(EmployeeRequest request);

    EmployeeResponse update(Long id, EmployeeRequest request);

    void delete(Long id);
}
