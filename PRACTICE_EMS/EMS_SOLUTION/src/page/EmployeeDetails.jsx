import { useEffect, useState } from "react";
import { Alert, Button, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById } from "../api/employee";
import { MS05 } from "../messages";
import StatusBadge from "../components/StatusBadge";

export default function EmployeeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getEmployeeById(id).then(setEmployee).catch(() => setError(MS05));
  }, [id]);

  return (
    <>
      <h6 className="fw-bold mt-4 ms-5">VIEW DETAILS</h6>
      {error && <Alert variant="danger" className="py-2">{error}</Alert>}

      {employee && (
        <Table borderless size="sm" className="w-auto mx-auto my-3">
          <tbody>
            <tr><td className="text-end">Employee Name:</td><td>{employee.employeeName}</td></tr>
            <tr><td className="text-end">Email:</td><td>{employee.email}</td></tr>
            <tr><td className="text-end">Department:</td><td>{employee.departmentName}</td></tr>
            <tr><td className="text-end">Salary (đ):</td><td>{employee.salary.toLocaleString("en-US")}</td></tr>
            <tr><td className="text-end">Hire Date:</td><td>{employee.hireDate}</td></tr>
            <tr><td className="text-end">Status:</td><td><StatusBadge status={employee.status} /></td></tr>
          </tbody>
        </Table>
      )}

      <div className="text-center">
        <Button className="btn-box" onClick={() => navigate("/")}>Back</Button>
      </div>
    </>
  );
}
