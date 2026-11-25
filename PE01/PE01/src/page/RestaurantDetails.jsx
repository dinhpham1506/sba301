import { useEffect, useState } from "react";
import { Alert, Button, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { getRestaurantById } from "../api/restaurant";
import { MS05 } from "../messages";

export default function RestaurantDetails() {
  const { id } = useParams(); // lấy id trên đường dẫn /view/:id
  const navigate = useNavigate();
  const [item, setItem] = useState(null); // dữ liệu chi tiết
  const [error, setError] = useState("");

  // Gọi API GET /api/restaurants/{id}
  useEffect(() => {
    getRestaurantById(id)
      .then((data) => setItem(data))
      .catch(() => setError(MS05));
  }, [id]);

  return (
    <>
      <h6 className="fw-bold mt-4 ms-5">VIEW DETAILS</h6>
      {error && <Alert variant="danger" className="py-2">{error}</Alert>}

      {/* ===== SỬA 4: nhãn (cột trái) và field (cột phải) ===== */}
      {item && (
        <Table borderless size="sm" className="w-auto mx-auto my-3">
          <tbody>
            <tr><td className="text-end">Restaurant Name:</td><td>{item.restaurantName}</td></tr>
            <tr><td className="text-end">Owner name:</td><td>{item.ownerName}</td></tr>
            <tr><td className="text-end">Category:</td><td>{item.categoryName}</td></tr>
            <tr><td className="text-end">Price range (đ):</td><td>{item.priceFrom} – {item.priceTo}</td></tr>
            <tr><td className="text-end">Address:</td><td>{item.address}</td></tr>
            <tr><td className="text-end">Open Date:</td><td>{item.openDate}</td></tr>
          </tbody>
        </Table>
      )}

      <div className="text-center">
        <Button className="btn-box" onClick={() => navigate("/")}>Quay Lai</Button>
      </div>
    </>
  );
}
