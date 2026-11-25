import { Button, Modal } from "react-bootstrap";

// Giao diện modal dùng chung. Hàm gọi API nằm trong EmployeeDelete.
export default function DeleteModal({ onClose, onDelete, saving, children }) {
  function handleClose() {
    if (!saving) onClose();
  }

  return (
    <Modal show onHide={handleClose} centered>
      <Modal.Header>
        {/* ĐỔI TIÊU ĐỀ: theo ảnh đề. Modal chỉ hiển thị, không gọi API ở đây. */}
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>

      <Modal.Footer>
        <Button variant="outline-danger" disabled={saving} onClick={onDelete}>
          {saving ? "Deleting..." : "Yes"}
        </Button>
        <Button variant="outline-secondary" disabled={saving} onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
