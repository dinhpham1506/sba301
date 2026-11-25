package fu.sba301.pe01.service;

import fu.sba301.pe01.dto.DepartmentDto;
import fu.sba301.pe01.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Override
    public List<DepartmentDto> getAll() {
        return departmentRepository.findAll().stream()
                .map(d -> new DepartmentDto(d.getDepartmentId(), d.getDepartmentName()))
                .toList();
    }
}
