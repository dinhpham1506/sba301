import { Button, Modal } from "react-bootstrap";

// Hộp xác nhận xoá. item = dòng đang hỏi xoá (null thì ẩn)
export default function DeleteRomModal({ item, onYes, onClose }) {
  return (
    <Modal show={item !== null} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title as="h6" className="fw-bold">Confirmation</Modal.Title>
      </Modal.Header>
      {/* SỬA: câu hỏi theo đề */}
      {/* [CLAUDE SỬA] item?.title -> item?.roomNumber (Room không có field title -> câu hỏi bị trống) */}
      <Modal.Body>Are you sure you want to delete "{item?.roomNumber}"?</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" size="sm" onClick={onYes}>Yes</Button>
        <Button variant="secondary" size="sm" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}