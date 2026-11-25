import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Alert, Button, Col, Row } from "react-bootstrap";

const API = "http://localhost:8080";

function showDate(value) {
  if (!value) return "-";
  const text = String(value).split("T")[0];
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) {
    const [year, month, day] = text.split("-");
    return `${day}/${month}/${year}`;
  }
  return text;
}

export default function ShoeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shoe, setShoe] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get(`${API}/api/shoes/${id}`)
      .then((response) => setShoe(response.data?.data ?? response.data))
      .catch(() => setError("Cannot load shoe details."));
  }, [id]);

  const type = shoe?.category?.categoryName ?? shoe?.category?.name ??
    shoe?.categoryName ?? (typeof shoe?.category === "string" ? shoe.category : "");

  const fields = shoe ? [
    ["Shoes Name:", shoe.shoesName ?? shoe.name],
    ["Manufacturer:", shoe.manufacturer ?? shoe.manufacture],
    ["Type:", type],
    ["Price (đ):", shoe.price],
    ["Production date:", showDate(shoe.productionDate)],
    ["Import Date:", showDate(shoe.importDate)]
  ] : [];

  return (
    <>
      <h3>VIEW DETAILS</h3>
      {error && <Alert variant="danger">{error}</Alert>}
      {!shoe && !error && <p>Loading...</p>}
      {shoe && (
        <div className="details-box mx-auto">
          {fields.map(([label, value]) => (
            <Row key={label} className="mb-3">
              <Col sm={5} className="fw-bold text-sm-end">{label}</Col>
              <Col sm={7}>{value ?? "-"}</Col>
            </Row>
          ))}
          <div className="text-center mt-4">
            <Button onClick={() => navigate("/")}>Quay Lai</Button>
          </div>
        </div>
      )}
    </>
  );
}
