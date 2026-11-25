import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById, getEmployeeStatuses, updateEmployeeStatus } from "../api/employee";
import { MS05, MS10, MS11 } from "../messages";
import StatusBadge from "../components/StatusBadge";

export default function UpdateEmployeeStatus() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [statuses, setStatuses] = useState([]);
  const [newStatus, setNewStatus] = useState("");
  const [statusError, setStatusError] = useState(""); // lỗi đỏ dưới dropdown (MS10)
  const [error, setError] = useState(""); // MS05 dưới tiêu đề
  const [success, setSuccess] = useState(""); // MS11 dưới tiêu đề

  useEffect(() => {
    getEmployeeById(id)
      .then((data) => { setEmployee(data); setNewStatus(data.status); })
      .catch(() => setError(MS05));
    getEmployeeStatuses().then(setStatuses).catch(() => setError(MS05));
  }, [id]);

  async function handleUpdate() {
    setSuccess("");
    setError("");
    if (newStatus === employee.status) {
      setStatusError(MS10);
      return;
    }
    setStatusError("");
    try {
      const updated = await updateEmployeeStatus(id, newStatus);
      setEmployee(updated); // Current Status đổi theo
      setSuccess(MS11);
    } catch {
      setError(MS05);
    }
  }

  return (
    <>
      <h6 className="fw-bold mt-2 ms-5">Update Employee Status</h6>
      {success && <Alert variant="success" className="py-2">{success}</Alert>}
      {error && <Alert variant="danger" className="py-2">{error}</Alert>}

      {employee && (
        <Form className="mt-4">
          <Row className="mb-2">
            <Col xs={4} className="text-end">Employee Name:</Col>
            <Col>{employee.employeeName}</Col>
          </Row>
          <Row className="mb-2">
            <Col xs={4} className="text-end">Department:</Col>
            <Col>{employee.departmentName}</Col>
          </Row>
          <Row className="mb-3">
            <Col xs={4} className="text-end">Current Status:</Col>
            <Col><StatusBadge status={employee.status} /></Col>
          </Row>
          <Form.Group as={Row} className="align-items-center mb-3">
            <Form.Label column xs={4} className="text-end">New Status:</Form.Label>
            <Col xs={3}>
              <Form.Select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} isInvalid={!!statusError}>
                {statuses.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{statusError}</Form.Control.Feedback>
            </Col>
            {/* Xem trước màu của trạng thái vừa chọn */}
            <Col xs="auto"><StatusBadge status={newStatus} /></Col>
          </Form.Group>
          <Row>
            <Col xs={{ span: 6, offset: 4 }}>
              <Button className="btn-box me-4" onClick={handleUpdate}>Update</Button>
              <Button className="btn-box" onClick={() => navigate("/")}>Back</Button>
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
}
