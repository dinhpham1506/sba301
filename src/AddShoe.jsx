import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";

const API = "http://localhost:8080";
const initialForm = {
  shoesName: "", price: "", manufacturer: "",
  productionDate: "", importDate: "", categoryId: ""
};

const getArray = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.data?.content)) return data.data.content;
  return [];
};

function validDate(value) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!match) return false;
  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

// Spring Boot LocalDate commonly accepts yyyy-MM-dd in JSON.
function toApiDate(value) {
  return value ? value.split("/").reverse().join("-") : null;
}

export default function AddShoe() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios.get(`${API}/api/categories`)
      .then((response) => setCategories(getArray(response.data)))
      .catch(() => setError("Cannot load categories."));
  }, []);

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSave(event) {
    event.preventDefault();
    setError("");

    if (!form.shoesName.trim() || form.shoesName.trim().length > 100)
      return setError("Shoes Name is required (maximum 100 characters).");
    if (!form.price.trim() || !Number.isFinite(Number(form.price)) || Number(form.price) <= 0 || Number(form.price) >= 10000)
      return setError("Price must be greater than 0 and less than 10000.");
    if (!form.manufacturer.trim() || form.manufacturer.trim().length > 100)
      return setError("Manufacturer is required (maximum 100 characters).");
    if (!validDate(form.productionDate))
      return setError("Production Date must be a valid date (dd/MM/yyyy).");
    if (form.importDate && !validDate(form.importDate))
      return setError("Import Date must be a valid date (dd/MM/yyyy).");
    if (!form.categoryId)
      return setError("Please select a Category.");

    setSaving(true);
    try {
      // Check duplicate name before creating.
      const response = await axios.get(`${API}/api/shoes/search`);
      const duplicated = getArray(response.data).some(
        (shoe) => String(shoe.shoesName ?? shoe.name ?? "").trim().toLowerCase() === form.shoesName.trim().toLowerCase()
      );
      if (duplicated) {
        setError("Shoes Name already exists.");
        return;
      }

      // Adjust these JSON field names only if the provided backend uses a different DTO.
      await axios.post(`${API}/api/shoes`, {
        shoesName: form.shoesName.trim(),
        price: Number(form.price),
        manufacturer: form.manufacturer.trim(),
        productionDate: toApiDate(form.productionDate),
        importDate: toApiDate(form.importDate),
        categoryId: Number(form.categoryId)
      });
      navigate("/", { state: { message: "Created new shoes successfully" } });
    } catch (err) {
      setError(err.response?.data?.message || "Create shoes failed.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <h3 className="mb-4">Add New Shoes</h3>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSave}>
        <Row className="g-3">
          <Col md={6}>
            <Form.Label>Shoes name:</Form.Label>
            <Form.Control name="shoesName" maxLength={100} value={form.shoesName} onChange={updateField} />
          </Col>
          <Col md={6}>
            <Form.Label>Price:</Form.Label>
            <Form.Control name="price" type="number" min="0" step="any" value={form.price} onChange={updateField} />
          </Col>
          <Col md={6}>
            <Form.Label>Manufacture:</Form.Label>
            <Form.Control name="manufacturer" maxLength={100} value={form.manufacturer} onChange={updateField} />
          </Col>
          <Col md={6}>
            <Form.Label>Category:</Form.Label>
            <Form.Select name="categoryId" value={form.categoryId} onChange={updateField}>
              <option value="">-- Select Category --</option>
              {categories.map((item) => (
                <option key={item.id ?? item.categoryId} value={item.id ?? item.categoryId}>
                  {item.categoryName ?? item.name ?? item.type}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={6}>
            <Form.Label>Production Date:</Form.Label>
            <Form.Control name="productionDate" placeholder="dd/MM/yyyy" maxLength={10} value={form.productionDate} onChange={updateField} />
          </Col>
          <Col md={6}>
            <Form.Label>Import Date:</Form.Label>
            <Form.Control name="importDate" placeholder="dd/MM/yyyy (optional)" maxLength={10} value={form.importDate} onChange={updateField} />
          </Col>
        </Row>
        <div className="mt-4 d-flex gap-2 justify-content-center">
          <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
          <Button variant="secondary" onClick={() => navigate("/")}>Back</Button>
        </div>
      </Form>
    </>
  );
}
