import { Button, Modal } from "react-bootstrap";

// Hộp xác nhận xóa. employee = dòng đang hỏi xóa (null thì ẩn hộp)
export default function DeleteEmployeeModal({ employee, onYes, onClose }) {
  return (
    <Modal show={employee !== null} onHide={onClose} centered>
      <Modal.Body className="px-5">
        <h6 className="fw-bold text-center mb-4">Confirmation</h6>
        <p>Are you sure you want to delete the employee "{employee?.employeeName}"?</p>
        <div className="d-flex justify-content-around mt-4">
          <Button className="btn-gray" onClick={onYes}>Yes</Button>
          <Button className="btn-gray" onClick={onClose}>Close</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
