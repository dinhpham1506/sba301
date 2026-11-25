import { useEffect, useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createEmployee } from "../api/employeeApi";
import { getAllDepartments } from "../api/departmentApi";
import { validateEmployee } from "../utils/validateEmployee";

export default function EmployeeAdd() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getAllDepartments().then(setDepartments)
      .catch(() => setError("Internal system error, please contact the administrator."));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (saving) return;

    // Lấy dữ liệu theo name của từng ô trong form.
    const form = e.currentTarget.elements;
    // THÊM Ô: 1) Form.Group bên dưới  2) thuộc tính data ở đây  3) validateEmployee.js.
    // name của ô phải khớp form.tenO.value; khóa gửi đi phải khớp JSON backend.
    const data = {
      fullName: form.fullName.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      position: form.position.value.trim(),
      dateOfBirth: form.dateOfBirth.value,
      startDate: form.startDate.value,
      salary: Number(form.salary.value),
      departmentId: Number(form.departmentId.value),
    };

    setSuccess("");
    setError("");
    const fieldErrors = validateEmployee(data);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) return;

    setSaving(true);
    setError("");
    try {
      await createEmployee(data);
      // ĐỔI THÔNG BÁO: đúng MS04. Đề hiện tại yêu cầu ở lại Add sau khi lưu.
      setSuccess("Created new employee successfully.");
    } catch {
      setError("Internal system error, please contact the administrator.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <h3 className="page-title">Add New Employee</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form noValidate onSubmit={handleSubmit} className="employee-form">
        <fieldset disabled={saving}>
          {/* Bố cục: col-12 = cả hàng, col-md-6 = nửa hàng, col-md-4 = 1/3 hàng. */}
          <div className="row g-3 mb-3">
            {/* ĐỔI THỨ TỰ: di chuyển nguyên Form.Group. Ô cuối lẻ dùng col-12 nếu cần cả hàng. */}
            <Form.Group controlId="fullName" className="col-12">
              <Form.Label>Full Name *</Form.Label>
              <Form.Control name="fullName" type="text" isInvalid={!!errors.fullName} />
              <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="email" className="col-md-6">
              <Form.Label>Email *</Form.Label>
              <Form.Control name="email" type="email" isInvalid={!!errors.email} />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="phone" className="col-md-6">
              <Form.Label>Phone *</Form.Label>
              <Form.Control name="phone" type="tel" isInvalid={!!errors.phone} />
              <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="departmentId" className="col-md-6">
              <Form.Label>Department *</Form.Label>
              <Form.Select name="departmentId" defaultValue="" isInvalid={!!errors.departmentId}>
                <option value="">-- Select department --</option>
                {departments.map((dep) => (
                  <option key={dep.departmentId} value={dep.departmentId}>{dep.departmentName}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.departmentId}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="position" className="col-md-6">
              <Form.Label>Position *</Form.Label>
              <Form.Control name="position" type="text" isInvalid={!!errors.position} />
              <Form.Control.Feedback type="invalid">{errors.position}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="dateOfBirth" className="col-md-6">
              <Form.Label>Date of Birth *</Form.Label>
              <Form.Control name="dateOfBirth" type="date" isInvalid={!!errors.dateOfBirth} />
              <Form.Control.Feedback type="invalid">{errors.dateOfBirth}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="startDate" className="col-md-6">
              <Form.Label>Start Date *</Form.Label>
              <Form.Control name="startDate" type="date" isInvalid={!!errors.startDate} />
              <Form.Control.Feedback type="invalid">{errors.startDate}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="salary" className="col-md-6">
              <Form.Label>Salary (VND) *</Form.Label>
              <Form.Control name="salary" type="number" isInvalid={!!errors.salary} />
              <Form.Control.Feedback type="invalid">{errors.salary}</Form.Control.Feedback>
            </Form.Group>

          </div>
          <Button type="submit" disabled={!departments.length}>{saving ? "Saving..." : "Save"}</Button>{" "}
          <Button variant="outline-secondary" onClick={() => navigate("/employees")}>Back</Button>
        </fieldset>
      </Form>
    </>
  );
}
