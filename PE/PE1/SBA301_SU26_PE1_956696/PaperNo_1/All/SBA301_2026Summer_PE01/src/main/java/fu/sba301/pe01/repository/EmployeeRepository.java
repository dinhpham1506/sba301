package fu.sba301.pe01.repository;

import fu.sba301.pe01.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query("SELECT e FROM Employee e WHERE " +
           "(:name IS NULL OR LOWER(e.fullName) LIKE LOWER(CONCAT('%', :name, '%'))) AND " +
           "(:departmentId IS NULL OR e.department.departmentId = :departmentId)")
    Page<Employee> findByFilters(@Param("name") String name,
                                 @Param("departmentId") Long departmentId,
                                 Pageable pageable);

    boolean existsByFullName(String fullName);

    boolean existsByEmail(String email);
    boolean existsByEmailAndEmployeeIdNot(String email, Long employeeId);
    boolean existsByFullNameAndEmployeeIdNot(String fullName, Long employeeId);
}
