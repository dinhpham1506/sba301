import { useEffect, useState } from "react";
import { Table, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById } from "../api/employeeApi";

function EmployeeDetails() {
  // 1. STATE
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");

  // 2. GET BY ID
  useEffect(() => {
    // Bỏ qua kết quả cũ nếu đã chuyển trang.
    let active = true;
    getEmployeeById(id)
      .then((data) => {
        if (active) setEmployee(data);
      })
      .catch((err) => {
        if (active) setError(err.response?.status === 404
          ? "Employee not found."
          : "Internal system error, please contact the administrator.");
      });

    return () => {
      active = false;
    };
  }, [id]);

  // ĐỔI VIEW: chỉ sửa JSX dưới đây, giữ phần lấy ID và gọi API ở trên.
  // Dạng bảng: thêm một tr gồm th (nhãn), td (giá trị) cho mỗi thông tin.
  // Dạng 2 cột: thay Table bằng div className="row g-3", mỗi khối className="col-md-6".
  // Dạng 1 cột: mỗi khối className="col-12".
  // Nhãn trên giá trị: strong + div. Nhãn ngang: div className="d-flex gap-3".
  // Nếu bỏ Table thì bỏ Table khỏi import. Mẫu đầy đủ có trong DOI_DE_NHANH.md.
  // 3. UI
  return (
    <>
      <h3 className="page-title">Employee Details</h3>
      {error && <Alert variant="danger">{error}</Alert>}

      {!employee && !error && <p>Loading...</p>}
      {employee && (
        // Đổi bố cục hiển thị ở đây; giữ nguyên phần gọi API phía trên.
        <Table>
          <tbody>
            <tr>
              <th>Full Name</th>
              <td>{employee.fullName}</td>
            </tr>
            <tr>
              <th>Employee ID</th>
              <td>{employee.employeeId}</td>
            </tr>
            <tr>
              <th>Department</th>
              <td>{employee.departmentName}</td>
            </tr>
            <tr>
              <th>Position</th>
              <td>{employee.position}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{employee.email}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{employee.phone}</td>
            </tr>
            <tr>
              <th>Date of Birth</th>
              <td>{employee.dateOfBirth}</td>
            </tr>
            <tr>
              <th>Start Date</th>
              <td>{employee.startDate}</td>
            </tr>
            <tr>
              <th>Salary (VND)</th>
              <td>{employee.salary?.toLocaleString("en-US")}</td>
            </tr>
          </tbody>
        </Table>
      )}

      <Button onClick={() => navigate("/employees")}>Back</Button>
    </>
  );
}

export default EmployeeDetails;
