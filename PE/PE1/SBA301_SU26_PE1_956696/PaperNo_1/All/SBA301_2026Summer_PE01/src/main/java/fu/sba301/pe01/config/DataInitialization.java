package fu.sba301.pe01.config;

import fu.sba301.pe01.entity.Department;
import fu.sba301.pe01.entity.Employee;
import fu.sba301.pe01.repository.DepartmentRepository;
import fu.sba301.pe01.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitialization implements CommandLineRunner {

    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public void run(String... args) {
        seedDepartments();
        seedEmployees();
    }

    private void seedDepartments() {
        List<String> defaults = List.of(
                "IT", "HR", "Finance", "Marketing",
                "Sales", "Legal", "R&D", "Operations"
        );
        defaults.forEach(name -> {
            if (!departmentRepository.existsByDepartmentName(name)) {
                departmentRepository.save(new Department(null, name));
            }
        });
    }

    private void seedEmployees() {
        List<Department> departments = departmentRepository.findAll();
        if (departments.isEmpty()) return;

        // {fullName, email, phone, position, dob, startDate, salary, departmentName}
        List<Object[]> data = List.of(
                new Object[]{"Alice Nguyen",  "alice@fu.edu",   "0912345678", "Software Engineer", LocalDate.of(1995, 4, 20), LocalDate.of(2022, 6, 1),  25_000_000L, "IT"},
                new Object[]{"Bob Tran",      "bob@fu.edu",     "0923456789", "HR Specialist",     LocalDate.of(1992, 9, 12), LocalDate.of(2021, 3, 15), 18_000_000L, "HR"},
                new Object[]{"Carol Le",      "carol@fu.edu",   "0934567890", "Accountant",        LocalDate.of(1990, 1, 5),  LocalDate.of(2020, 8, 10), 20_000_000L, "Finance"},
                new Object[]{"David Pham",    "david@fu.edu",   "0945678901", "Marketing Lead",    LocalDate.of(1988, 11, 3), LocalDate.of(2019, 2, 28), 30_000_000L, "Marketing"},
                new Object[]{"Eva Hoang",     "eva@fu.edu",     "0956789012", "Sales Executive",   LocalDate.of(1996, 7, 22), LocalDate.of(2023, 1, 9),  16_000_000L, "Sales"},
                new Object[]{"Frank Vo",      "frank@fu.edu",   "0967890123", "Legal Counsel",     LocalDate.of(1985, 5, 18), LocalDate.of(2018, 4, 2),  35_000_000L, "Legal"},
                new Object[]{"Grace Do",      "grace@fu.edu",   "0978901234", "Research Scientist",LocalDate.of(1993, 3, 30), LocalDate.of(2021, 11, 1), 28_000_000L, "R&D"},
                new Object[]{"Henry Bui",     "henry@fu.edu",   "0989012345", "Operations Manager",LocalDate.of(1987, 8, 14), LocalDate.of(2017, 6, 20), 32_000_000L, "Operations"},
                new Object[]{"Ivy Dang",      "ivy@fu.edu",     "0990123456", "QA Engineer",       LocalDate.of(1997, 12, 8), LocalDate.of(2023, 9, 5),  17_000_000L, "IT"}
        );

        data.forEach(row -> {
            String fullName = (String) row[0];
            if (employeeRepository.existsByFullName(fullName)) return;

            String deptName = (String) row[7];
            Department dept = departments.stream()
                    .filter(d -> d.getDepartmentName().equals(deptName))
                    .findFirst().orElse(departments.get(0));

            Employee e = new Employee();
            e.setFullName(fullName);
            e.setEmail((String) row[1]);
            e.setPhone((String) row[2]);
            e.setPosition((String) row[3]);
            e.setDateOfBirth((LocalDate) row[4]);
            e.setStartDate((LocalDate) row[5]);
            e.setSalary((Long) row[6]);
            e.setDepartment(dept);
            employeeRepository.save(e);
        });
    }
}
