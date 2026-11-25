package fu.sba301.ems.repository;

import fu.sba301.ems.entity.Employee;
import fu.sba301.ems.entity.EmployeeStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query("SELECT e FROM Employee e WHERE " +
           "(:name IS NULL OR LOWER(e.employeeName) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
           "(:departmentId IS NULL OR e.department.departmentId = :departmentId) AND " +
           "(:status IS NULL OR e.status = :status)")
    Page<Employee> findByFilters(@Param("name") String name,
                                 @Param("departmentId") Long departmentId,
                                 @Param("status") EmployeeStatus status,
                                 Pageable pageable);

    boolean existsByEmployeeName(String employeeName);
}
