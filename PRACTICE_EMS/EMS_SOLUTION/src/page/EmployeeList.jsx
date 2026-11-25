import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { deleteEmployee, getEmployees, getEmployeeStatuses } from "../api/employee";
import { getDepartments } from "../api/department";
import { MS05, MS08, MS09 } from "../messages";
import DeleteEmployeeModal from "../components/DeleteEmployeeModal";
import Pagination from "../components/Pagination";
import StatusBadge from "../components/StatusBadge";

const SIZE = 5;
const SORT = "employeeName";

export default function EmployeeList() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [name, setName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [deleteItem, setDeleteItem] = useState(null);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  async function load(p) {
    try {
      const data = await getEmployees({
        name: name || null,
        departmentId: departmentId || null,
        status: status || null,
        page: p,
        size: SIZE,
        sortBy: SORT,
      });
      setEmployees(data.content);
      setTotalPages(data.totalPages);
      setTotal(data.totalElements);
      setPage(p);
      setError("");
    } catch {
      setError(MS05);
    }
  }

  useEffect(() => {
    load(0);
    getDepartments().then(setDepartments).catch(() => setError(MS05));
    getEmployeeStatuses().then(setStatuses).catch(() => setError(MS05));
  }, []);

  async function handleDelete() {
    try {
      await deleteEmployee(deleteItem.employeeId);
      setDeleteItem(null);
      setMsg(MS08);
      load(employees.length === 1 && page > 0 ? page - 1 : page);
    } catch {
      setDeleteItem(null);
      setError(MS05);
    }
  }

  return (
    <>
      <h6 className="fw-bold mt-2">Employee List</h6>
      {msg && <Alert variant="success" className="py-2">{msg}</Alert>}
      {error && <Alert variant="danger" className="py-2">{error}</Alert>}

      <Form.Group as={Row} className="align-items-center mt-4 mb-2">
        <Form.Label column xs={3} className="text-end">Department:</Form.Label>
        <Col xs={3} className="px-0">
          <Form.Select value={departmentId} onChange={(e) => setDepartmentId(e.target.value)}>
            <option value=""></option>
            {departments.map((d) => (
              <option key={d.departmentId} value={d.departmentId}>{d.departmentName}</option>
            ))}
          </Form.Select>
        </Col>
        <Form.Label column xs={2} className="text-end">Status:</Form.Label>
        <Col xs={2} className="px-0">
          <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value=""></option>
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Form.Select>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="align-items-center mb-5">
        <Form.Label column xs={3} className="text-end">Employee Name:</Form.Label>
        <Col xs={5} className="px-0">
          <Form.Control maxLength={100} value={name} onChange={(e) => setName(e.target.value)} />
        </Col>
        <Col xs={4} className="ps-4">
          <Button className="btn-box me-3" onClick={() => { setMsg(""); load(0); }}>Filter</Button>
          <Button className="btn-box" onClick={() => navigate("/employees/add")}>Add New</Button>
        </Col>
      </Form.Group>

      <h6 className="fw-bold mt-4">Employee List</h6>
      <div className="table-box">
        <Table borderless size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Employee Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Salary(đ)</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 && (
              <tr><td colSpan={7}>{MS09}</td></tr>
            )}
            {employees.map((e, i) => (
              <tr key={e.employeeId}>
                <td>{page * SIZE + i + 1}</td>
                <td>{e.employeeName}</td>
                <td>{e.departmentName}</td>
                <td>{e.email}</td>
                <td>{e.salary.toLocaleString("en-US")}</td>
                <td><StatusBadge status={e.status} /></td>
                <td className="text-nowrap">
                  <a href="#" className="fw-bold" onClick={(ev) => { ev.preventDefault(); setDeleteItem(e); }}>Delete</a>
                  {" | "}
                  <Link to={"/employees/" + e.employeeId} className="fw-bold">View</Link>
                  {" | "}
                  <Link to={"/employees/" + e.employeeId + "/status"} className="fw-bold">Status</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Pagination page={page} totalPages={totalPages} count={employees.length} total={total} onChange={load} />
      <DeleteEmployeeModal employee={deleteItem} onYes={handleDelete} onClose={() => setDeleteItem(null)} />
    </>
  );
}
