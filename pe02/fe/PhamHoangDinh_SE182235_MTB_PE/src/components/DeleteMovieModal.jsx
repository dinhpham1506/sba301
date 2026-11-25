import { Button, Modal } from "react-bootstrap";

// Hộp xác nhận xóa. item = dòng đang hỏi xóa (null thì ẩn hộp)
export default function DeleteMovieModal({ item, onYes, onClose }) {
  return (
    <Modal show={item !== null} onHide={onClose} centered>
      <Modal.Body className="px-5">
        <h6 className="fw-bold text-center mb-4">Confirmation</h6>
        {/* ===== SỬA 3: câu hỏi xóa (đổi "restaurant" + field tên) ===== */}
        <p>Are you sure you want to delete the movie "{item?.title}"?</p>
        <div className="d-flex justify-content-around mt-4">
          {/* btn-gray = nút xám (index.css) */}
          <Button className="btn-gray" onClick={onYes}>Yes</Button>
          <Button className="btn-gray" onClick={onClose}>Close</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
