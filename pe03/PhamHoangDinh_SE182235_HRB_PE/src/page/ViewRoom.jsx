import { useEffect, useState } from "react";
import { Alert, Badge, Button, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { MS06 } from "../messages";
import { BED_TYPE_COLOR, STATUS_COLOR } from "../utils/badgeColors";
import { getRoomById } from "../api/room";

export default function ViewRoom() {
  const { id } = useParams(); // lấy id trên đường dẫn /view/:id
  const navigate = useNavigate();
  const [item, setItem] = useState(null); // [CLAUDE SỬA] type -> item (JSX bên dưới dùng item)
  const [error, setError] = useState("");

  useEffect(() => {
    getRoomById(id)

      .then((data) => setItem(data))
      .catch(() => setError(MS06));
  }, [id]);

  return (
    <>
      <h6 className="fw-bold mt-3 pb-2 border-bottom">Room Details</h6>
      {error && <Alert variant="danger" className="py-2">{error}</Alert>}
      

      {item && (
        <Table className="mt-2">
          <tbody>
            <tr><td className="text-muted fw-semibold" style={{ width: "25%" }}>Room Number</td><td>{item.roomNumber}</td></tr>
            <tr><td className="text-muted fw-semibold">Room Type</td><td>{item.type}</td></tr>
            <tr><td className="text-muted fw-semibold">Floor</td><td>{item.floor}</td></tr>
            <tr><td className="text-muted fw-semibold">Capacity (min)</td><td>{item.capacity}</td></tr>
            <tr><td className="text-muted fw-semibold">Price per Night (đ)</td><td>{item.pricePerNight?.toLocaleString("vi-VN")}</td></tr>
            <tr><td className="text-muted fw-semibold">Bed Type</td><td><Badge bg={BED_TYPE_COLOR[item.bedType] || "secondary"}>{item.bedType}</Badge></td></tr>
            <tr><td className="text-muted fw-semibold">View</td><td>{item.view}</td></tr>
            <tr><td className="text-muted fw-semibold">Available From</td><td>{item.availableFrom.replaceAll("-", "/")}</td></tr>
            <tr><td className="text-muted fw-semibold">Status</td><td><Badge bg={STATUS_COLOR[item.status] || "secondary"}>{item.status}</Badge></td></tr>
            <tr><td className="text-muted fw-semibold">Description</td><td>{item.description}</td></tr>
          </tbody>
        </Table>
      )}

      <Button size="sm" className="btn-add mt-2" onClick={() => navigate("/")}>← Back</Button>
    </>
  );
}
