import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getEmployees } from "../api/employeeApi";
import { getAllDepartments } from "../api/departmentApi";
import EmployeeFilter from "../components/EmployeeFilter";
import EmployeeList from "./EmployeeList";
import EmployeeDelete from "../components/EmployeeDelete";

export default function EmployeesPage() {
  const [departments, setDepartments] = useState([]);
  const [selected, setSelected] = useState(null);
  const [success, setSuccess] = useState("");
  const [data, setData] = useState({ content: [], totalPages: 0, totalElements: 0 });
  // ĐỔI PHÂN TRANG: page bắt đầu từ 0; size là số dòng/trang (Filter bên dưới cũng có size).
  const [query, setQuery] = useState({ page: 0, size: 5 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Bỏ qua kết quả cũ nếu đã chuyển trang.
    let active = true;
    // Hai API dùng chung một thông báo lỗi dưới tiêu đề.
    Promise.all([getEmployees(query), getAllDepartments()])
      .then(([employees, departments]) => {
        if (active) {
          // ĐỔI JSON: hiện API trả { content, totalPages, totalElements }.
          // Nếu trả { data: { content, ... } } thì dùng setData(employees.data).
          setData(employees);
          setDepartments(departments);
        }
      })
      .catch(() => {
        if (active) setError("Internal system error, please contact the administrator.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [query]);

  function search(nextQuery) {
    setLoading(true);
    setError("");
    setSuccess("");
    setQuery(nextQuery);
  }

  function handleDeleted() {
    setSelected(null);
    // Nếu vừa xóa dòng cuối trang, quay về trang trước.
    const page = data.content.length === 1 ? Math.max(0, query.page - 1) : query.page;
    search({ ...query, page });
    // ĐỔI THÔNG BÁO: điền đúng câu MS08 của đề.
    setSuccess("Deleted employee successfully.");
  }

  function handleDeleteError(message) {
    setSelected(null);
    setSuccess("");
    setError(message);
  }

  return (
    <>
      {/* ĐỔI LAYOUT LIST: di chuyển Add New/Filter/phân trang trong phần JSX này. */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="page-title">Employee List</h3>
        <Button as={Link} to="/employees/new">+ Add New</Button>
      </div>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      {/* Dùng lại Filter có sẵn; đổi ô lọc trong components/EmployeeFilter.jsx. */}
      <EmployeeFilter departments={departments} disabled={loading}
        onFilter={(filters) => search({ ...filters, page: 0, size: 5 })} />
      {loading ? <p>Loading...</p> : (
        <EmployeeList employees={data.content} page={query.page} size={query.size} onDelete={setSelected} />
      )}
      {!loading && !error && data.content.length === 0 && <p>No records found.</p>}
      {!error && data.totalPages > 1 && (
        <div className="d-flex gap-3 align-items-center">
          <Button disabled={loading || query.page === 0}
            onClick={() => search({ ...query, page: query.page - 1 })}>Previous</Button>
          <span>Page {query.page + 1} / {data.totalPages} ({data.totalElements} records)</span>
          <Button disabled={loading || query.page >= data.totalPages - 1}
            onClick={() => search({ ...query, page: query.page + 1 })}>Next</Button>
        </div>
      )}
      {/* Dùng lại Delete có sẵn, không viết modal lần nữa trong List. */}
      {selected && (
        <EmployeeDelete employee={selected} onClose={() => setSelected(null)}
          onSuccess={handleDeleted} onError={handleDeleteError} />
      )}
    </>
  );
}
