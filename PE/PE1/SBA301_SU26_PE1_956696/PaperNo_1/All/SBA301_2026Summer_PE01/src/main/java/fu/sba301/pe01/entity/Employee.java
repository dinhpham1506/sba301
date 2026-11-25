package fu.sba301.pe01.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "Employees")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "employee_id")
    private Long employeeId;

    @Column(name = "full_name", length = 100, nullable = false, unique = true)
    private String fullName; // No duplicate -> unique = true

    @Column(name = "email", length = 100, nullable = false, unique = true)
    private String email; // Must be unique

    @Column(name = "phone", length = 11, nullable = false)
    private String phone;

    @Column(name = "position", length = 100, nullable = false)
    private String position;

    @Column(name = "date_of_birth", nullable = false)
    private LocalDate dateOfBirth;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    @Column(name = "salary", nullable = false)
    private Long salary; // VND

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;
}
