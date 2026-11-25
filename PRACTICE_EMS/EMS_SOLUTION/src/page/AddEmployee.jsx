import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createEmployee, getEmployeeStatuses } from "../api/employee";
import { getDepartments } from "../api/department";
import { MS01, MS02, MS03, MS04, MS05, MS06, MS07 } from "../messages";

const EMPTY = {
  employeeName: "",
  email: "",
  salary: "",
  departmentId: "",
  status: "ACTIVE",
  hireDate: "",
};

export default function AddEmployee() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const today = new Date().toLocaleDateString("en-CA");

  useEffect(() => {
    getDepartments().then(setDepartments).catch(() => setError(MS05));
    getEmployeeStatuses().then(setStatuses).catch(() => setError(MS05));
  }, []);

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const e = {};
    const salary = Number(form.salary);

    if (!form.employeeName.trim()) e.employeeName = MS01("Employee name");

    if (!form.email.trim()) e.email = MS01("Email");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = MS03("email");

    if (!form.salary) e.salary = MS01("Salary");
    else if (!Number.isInteger(salary) || salary < 3000000 || salary > 100000000)
      e.salary = MS02("Salary", 3000000, 100000000);

    if (!form.departmentId) e.departmentId = MS01("Department");

    if (!form.status) e.status = MS01("Status");

    if (!form.hireDate) e.hireDate = MS01("Hire Date");
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(form.hireDate) || isNaN(new Date(form.hireDate)))
      e.hireDate = MS03("date");
    else if (form.hireDate > today) e.hireDate = MS06;

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSave() {
    setError("");
    setSuccess("");
    if (!validate()) return;
    try {
      await createEmployee({ ...form, salary: Number(form.salary), departmentId: Number(form.departmentId) });
      setSuccess(MS04);
      setForm(EMPTY);
    } catch (err) {
      // API trả 400 + message "Employee name already exists" khi trùng tên
      if (err.response?.status === 400 && err.response.data?.message === "Employee name already exists")
        setErrors({ employeeName: MS07 });
      else setError(MS05);
    }
  }

  return (
    <>
      <h6 className="fw-bold mt-2 ms-5">Add New Employee</h6>
      {success && <Alert variant="success" className="py-2">{success}</Alert>}
      {error && <Alert variant="danger" className="py-2">{error}</Alert>}

      <Form className="mt-4">
        <Form.Group as={Row} className="align-items-center mb-3">
          <Form.Label column xs={4} className="text-end">Employee name:</Form.Label>
          <Col xs={6}>
            <Form.Control name="employeeName" maxLength={100} value={form.employeeName} onChange={change} isInvalid={!!errors.employeeName} />
            <Form.Control.Feedback type="invalid">{errors.employeeName}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="align-items-center mb-3">
          <Form.Label column xs={4} className="text-end">Email:</Form.Label>
          <Col xs={6}>
            <Form.Control name="email" maxLength={100} value={form.email} onChange={change} isInvalid={!!errors.email} />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="align-items-center mb-3">
          <Form.Label column xs={4} className="text-end">Salary (đ):</Form.Label>
          <Col xs={3}>
            <Form.Control name="salary" maxLength={9} value={form.salary} onChange={change} isInvalid={!!errors.salary} />
            <Form.Control.Feedback type="invalid">{errors.salary}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="align-items-center mb-3">
          <Form.Label column xs={4} className="text-end">Department:</Form.Label>
          <Col xs={3}>
            <Form.Select name="departmentId" value={form.departmentId} onChange={change} isInvalid={!!errors.departmentId}>
              <option value=""></option>
              {departments.map((d) => (
                <option key={d.departmentId} value={d.departmentId}>{d.departmentName}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.departmentId}</Form.Control.Feedback>
          </Col>
          <Form.Label column xs={1} className="text-end">Status:</Form.Label>
          <Col xs={3}>
            <Form.Select name="status" value={form.status} onChange={change} isInvalid={!!errors.status}>
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.status}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="align-items-center mb-3">
          <Form.Label column xs={4} className="text-end">Hire Date (yyyy-MM-dd):</Form.Label>
          <Col xs={3}>
            <Form.Control name="hireDate" maxLength={10} placeholder="yyyy-MM-dd" value={form.hireDate} onChange={change} isInvalid={!!errors.hireDate} />
            <Form.Control.Feedback type="invalid">{errors.hireDate}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Row>
          <Col xs={{ span: 6, offset: 4 }}>
            <Button className="btn-box me-4" onClick={handleSave}>Save</Button>
            <Button className="btn-box" onClick={() => navigate("/")}>Back</Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
