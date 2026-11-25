
import { useEffect, useState } from "react";
import { Container, Table, Form, Button, Alert, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { getAllDepartments } from "../api/departmentApi";
import { getEmployees, deleteEmployee } from "../api/employeeApi";

// Lấy mảng dữ liệu từ API
const toList = (data) =>
  Array.isArray(data) ? data : data?.content ?? data?.data ?? [];

function EmployeeList() {
  const navigate = useNavigate();

  // 1. STATE - Lưu dữ liệu
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [filters, setFilters] = useState({ name: "", departmentId: "" });
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  const pageSize = 5;

  // 2. GET API - Chạy khi mở trang
  useEffect(() => {
    const fetchData = async () => {
      try {
        const emp = await getEmployees();
        console.log("Employees:", emp);
        const dep = await getAllDepartments();
        console.log("Departments:", dep);

        setEmployees(toList(emp));
        setDepartments(toList(dep));
      } catch (error) {
        console.error(error);
        setMessage("Internal system error, please contact the administrator.");
      }
    };
    fetchData();
  }, []);

  // 3. FILTER - Nhấn Filter mới lọc
  const handleFilter = () => {
    setFilters({ name: name.trim(), departmentId });
    setPage(1);
  };

  const filtered = employees
    .filter((emp) =>
      (emp.fullName ?? "").toLowerCase()
        .includes(filters.name.toLowerCase()) &&
      (filters.departmentId === "" ||
        String(emp.department?.id ?? emp.departmentId) === filters.departmentId)
    )
    .sort((a, b) =>
      (a.fullName ?? "").localeCompare(b.fullName ?? "")
    );

  // 4. PAGINATION - Chia trang
  const totalPages = Math.ceil(filtered.length / pageSize);
  const currentEmployees = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  // 5. DELETE - Nhấn Yes mới gọi API
  const handleDelete = async () => {
    if (!selected || deleting) return;

    setDeleting(true);
    try {
      console.log("Deleting employee:", selected);
      await deleteEmployee(selected.id);
      setEmployees(toList(await getEmployees()));
      setSuccess("Deleted successfully.");
      setMessage("");
      setSelected(null);
      setPage(1);
    } catch (error) {
      console.error(error);
      setMessage("Internal system error, please contact the administrator.");
      setSelected(null);
    } finally {
      setDeleting(false);
    }
  };

  // Màu phòng ban
  const colors = {
    IT: ["#dcecff", "#245987"],
    HR: ["#e2f2d9", "#3d7439"],
    Finance: ["#fff0d2", "#986b22"],
    Marketing: ["#f3e2fa", "#8749a1"],
    Sales: ["#d7f5e9", "#248064"]
  };

  // 6. UI - Hiển thị giao diện
  return (
    <Container className="mt-3">
      <h3 className="page-title">Employee List</h3>

      {message && <Alert variant="danger">{message}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {/* FILTER */}
      <div className="d-flex flex-wrap gap-3 align-items-end mb-3">
        <Form.Group>
          <Form.Label>Employee Name</Form.Label>
          <Form.Control
            value={name}
            maxLength={100}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Department</Form.Label>
          <Form.Select
            value={departmentId}
            onChange={(e) => setDepartmentId(e.target.value)}
          >
            <option value="">-- All --</option>
            {departments.map((dep) => (
              <option key={dep.id} value={dep.id}>
                {dep.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button onClick={handleFilter}>Filter</Button>

        <Button
          className="ms-auto"
          variant="outline-secondary"
          onClick={() => navigate("/employees/new")}
        >
          + Add New
        </Button>
      </div>

      {/* TABLE */}
      <Table striped bordered hover responsive className="ems-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Full Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {currentEmployees.map((emp, index) => {
            const dep = emp.department?.name ?? emp.departmentName ?? "";
            const [bg, color] = colors[dep] ?? ["#e9ecef", "#495057"];

            return (
              <tr key={emp.id}>
                <td>{(page - 1) * pageSize + index + 1}</td>
                <td>{emp.fullName}</td>
                <td>
                  <span style={{
                    backgroundColor: bg, color,
                    padding: "4px 10px",
                    borderRadius: 20,
                    whiteSpace: "nowrap"
                  }}>
                    {dep}
                  </span>
                </td>
                <td>{emp.position}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>
                  <Button variant="link" size="sm"
                    onClick={() => navigate(`/employees/${emp.id}`)}>
                    View
                  </Button>
                  |
                  <Button variant="link" size="sm" className="text-danger"
                    onClick={() => setSelected(emp)}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {!message && filtered.length === 0 && <p>No records found.</p>}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center">
          <span>Page {page} / {totalPages} ({filtered.length} records)</span>

          <div>
            <Button size="sm" disabled={page === 1}
              onClick={() => setPage(page - 1)}>
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => (
              <Button key={i} size="sm" className="mx-1"
                variant={page === i + 1 ? "primary" : "outline-primary"}
                onClick={() => setPage(i + 1)}>
                {i + 1}
              </Button>
            ))}

            <Button size="sm" disabled={page === totalPages}
              onClick={() => setPage(page + 1)}>
              Next
            </Button>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      <Modal show={!!selected} onHide={() => !deleting && setSelected(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure you want to delete employee {selected?.fullName}?
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" disabled={deleting}
            onClick={() => setSelected(null)}>
            Close
          </Button>
          <Button variant="danger" disabled={deleting} onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default EmployeeList;
