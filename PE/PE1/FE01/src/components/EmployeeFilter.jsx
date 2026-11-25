import { Button, Form } from "react-bootstrap";

export default function EmployeeFilter({ departments, onFilter, disabled }) {
  function handleFilter(e) {
    e.preventDefault();
    const form = e.currentTarget.elements;

    // THÊM BỘ LỌC: thêm ô nhập ở dưới và tham số ở đây; tên tham số đúng Swagger.
    onFilter({
      name: form.employeeName.value.trim(),
      departmentId: form.departmentId.value || undefined,
    });
  }

  return (
      // ĐỔI BỐ CỤC FILTER: className điều khiển ngang/dọc; flex-column để xếp dọc.
      <Form onSubmit={handleFilter} className="d-flex flex-wrap gap-3 align-items-end mb-3">
        <Form.Group controlId="filter-name">
          <Form.Label>Employee Name</Form.Label>
          <Form.Control name="employeeName" maxLength={100} />
        </Form.Group>
        <Form.Group controlId="filter-department">
          <Form.Label>Department</Form.Label>
          <Form.Select name="departmentId">
            <option value="">-- All --</option>
            {departments.map((dep) => (
              <option key={dep.departmentId} value={dep.departmentId}>{dep.departmentName}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button type="submit" disabled={disabled}>Filter</Button>
      </Form>
  );
}
