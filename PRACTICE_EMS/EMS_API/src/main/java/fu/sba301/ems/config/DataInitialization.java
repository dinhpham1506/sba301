package fu.sba301.ems.config;

import fu.sba301.ems.entity.Department;
import fu.sba301.ems.entity.Employee;
import fu.sba301.ems.entity.EmployeeStatus;
import fu.sba301.ems.repository.DepartmentRepository;
import fu.sba301.ems.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

// Tạo dữ liệu mẫu lần đầu chạy (chạy lại không tạo trùng)
@Component
@RequiredArgsConstructor
public class DataInitialization implements CommandLineRunner {

    private final DepartmentRepository departmentRepository;
    private final EmployeeRepository employeeRepository;

    @Override
    public void run(String... args) {
        List.of("Human Resources", "Information Technology", "Finance", "Marketing", "Sales").forEach(name -> {
            if (!departmentRepository.existsByDepartmentName(name)) {
                departmentRepository.save(new Department(null, name));
            }
        });
        List<Department> deps = departmentRepository.findAll();

        Object[][] data = {
                {"Nguyen Van An", "an.nv@fpt.edu.vn", 15000000, "2021-03-15", EmployeeStatus.ACTIVE, "Information Technology"},
                {"Tran Thi Bich", "bich.tt@fpt.edu.vn", 12000000, "2020-07-01", EmployeeStatus.ON_LEAVE, "Human Resources"},
                {"Le Hoang Cuong", "cuong.lh@fpt.edu.vn", 25000000, "2018-01-10", EmployeeStatus.ACTIVE, "Finance"},
                {"Pham Minh Duc", "duc.pm@fpt.edu.vn", 9000000, "2023-09-20", EmployeeStatus.RESIGNED, "Sales"},
                {"Hoang Thu Ha", "ha.ht@fpt.edu.vn", 18000000, "2019-11-05", EmployeeStatus.ACTIVE, "Marketing"},
                {"Vo Quoc Khanh", "khanh.vq@fpt.edu.vn", 30000000, "2016-04-12", EmployeeStatus.ACTIVE, "Information Technology"},
                {"Dang Thi Lan", "lan.dt@fpt.edu.vn", 11000000, "2022-02-28", EmployeeStatus.ON_LEAVE, "Sales"},
                {"Bui Van Minh", "minh.bv@fpt.edu.vn", 8500000, "2024-06-03", EmployeeStatus.ACTIVE, "Human Resources"},
                {"Do Thanh Nam", "nam.dt@fpt.edu.vn", 22000000, "2017-08-17", EmployeeStatus.RESIGNED, "Finance"},
                {"Ngo Bao Ngoc", "ngoc.nb@fpt.edu.vn", 14000000, "2021-12-01", EmployeeStatus.ACTIVE, "Marketing"},
                {"Truong Gia Phat", "phat.tg@fpt.edu.vn", 40000000, "2015-05-25", EmployeeStatus.ACTIVE, "Information Technology"},
                {"Ly My Quyen", "quyen.lm@fpt.edu.vn", 10500000, "2025-01-08", EmployeeStatus.ON_LEAVE, "Finance"},
        };
        for (Object[] row : data) {
            String name = (String) row[0];
            if (employeeRepository.existsByEmployeeName(name)) continue;
            Employee e = new Employee();
            e.setEmployeeName(name);
            e.setEmail((String) row[1]);
            e.setSalary((Integer) row[2]);
            e.setHireDate(LocalDate.parse((String) row[3]));
            e.setStatus((EmployeeStatus) row[4]);
            e.setDepartment(deps.stream().filter(d -> d.getDepartmentName().equals(row[5])).findFirst().orElse(deps.get(0)));
            employeeRepository.save(e);
        }
    }
}
