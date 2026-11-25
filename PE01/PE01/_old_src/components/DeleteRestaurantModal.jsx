import { useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import { deleteRestaurant } from "../api/restaurant";
import "./DeleteRestaurantModal.css";

// Phần xác nhận và gọi API xóa nằm riêng, không trộn vào giao diện list.
export default function DeleteRestaurantModal({ restaurant, onClose, onDeleted }) {
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");

  function handleClose() {
    if (deleting) return;
    setMessage("");
    onClose();
  }

  async function handleDelete() {
    if (!restaurant || deleting) return;
    setDeleting(true);
    setMessage("");
    try {
      await deleteRestaurant(restaurant.restaurantId);
      onDeleted();
    } catch {
      setMessage("Cannot delete the restaurant. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Modal show={!!restaurant} onHide={handleClose} backdrop={deleting ? "static" : true}
      centered className="restaurant-delete-modal" keyboard={!deleting}
      aria-labelledby="delete-restaurant-title" aria-describedby="delete-restaurant-message">
      <Modal.Header>
        <Modal.Title id="delete-restaurant-title">Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && <Alert variant="danger">{message}</Alert>}
        <p id="delete-restaurant-message" className="mb-0">
          Are you sure you want to delete the restaurant &quot;{restaurant?.restaurantName}&quot;?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" disabled={deleting} onClick={handleDelete}>
          {deleting ? "Deleting..." : "Yes"}
        </Button>
        <Button variant="secondary" autoFocus disabled={deleting} onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
