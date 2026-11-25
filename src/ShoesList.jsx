import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Alert, Button, Col, Form, Modal, Pagination, Row, Table } from "react-bootstrap";

const API = "http://localhost:8080";
const PAGE_SIZE = 5;

// Supports either a plain JSON array or a common Spring Boot response wrapper.
const getArray = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.data?.content)) return data.data.content;
  return [];
};

const shoeId = (shoe) => shoe.id ?? shoe.shoesId;
const shoeName = (shoe) => shoe.shoesName ?? shoe.name ?? "";
const categoryName = (item) =>
  item.category?.categoryName ?? item.category?.name ??
  item.categoryName ?? (typeof item.category === "string" ? item.category : "") ?? "";
const categoryId = (item) => item.categoryId ?? item.category?.id ?? item.category?.categoryId;

export default function ShoesList() {
  const location = useLocation();
  const [shoes, setShoes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("");
  const [filter, setFilter] = useState({ name: "", category: "" });
  const [page, setPage] = useState(1);
  const [selectedShoe, setSelectedShoe] = useState(null);
  const [message, setMessage] = useState(location.state?.message || "");
  const [error, setError] = useState("");

  async function loadShoes(name = "", category = "") {
    try {
      const response = await axios.get(`${API}/api/shoes/search`, {
        // Rename these query keys if your backend search API uses other names.
        params: { shoesName: name || undefined, categoryId: category || undefined }
      });
      setShoes(getArray(response.data));
      setError("");
    } catch {
      setError("Cannot load shoes. Check the API on port 8080.");
    }
  }

  useEffect(() => {
    loadShoes();
    axios.get(`${API}/api/categories`)
      .then((response) => setCategories(getArray(response.data)))
      .catch(() => setError("Cannot load categories."));
  }, []);

  function handleFilter(event) {
    event.preventDefault();
    setFilter({ name: nameInput.trim().toLowerCase(), category: categoryInput });
    setPage(1);
    loadShoes(nameInput.trim(), categoryInput); // Query the API on Filter.
  }

  const selectedCategory = categories.find(
    (item) => String(item.id ?? item.categoryId) === filter.category
  );
  const selectedCategoryName = selectedCategory
    ? String(selectedCategory.categoryName ?? selectedCategory.name ?? "").toLowerCase()
    : "";

  const filteredShoes = shoes.filter((shoe) => {
    const matchName = shoeName(shoe).toLowerCase().includes(filter.name);
    const matchCategory = !filter.category ||
      String(categoryId(shoe)) === filter.category ||
      (selectedCategoryName && categoryName(shoe).toLowerCase() === selectedCategoryName);
    return matchName && matchCategory;
  });

  const totalPages = Math.ceil(filteredShoes.length / PAGE_SIZE);
  const visibleShoes = filteredShoes.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  async function handleDelete() {
    try {
      await axios.delete(`${API}/api/shoes/${shoeId(selectedShoe)}`);
      setSelectedShoe(null);
      setMessage("Deleted successfully");
      setPage(1);
      await loadShoes();
    } catch (err) {
      setSelectedShoe(null);
      setError(err.response?.data?.message || "Delete failed.");
    }
  }

  return (
    <>
      <h3>Shoes List</h3>
      {message && <Alert variant="success" dismissible onClose={() => setMessage("")}>{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleFilter} className="mb-4">
        <Row className="g-3 align-items-end">
          <Col md={4}>
            <Form.Label>Category:</Form.Label>
            <Form.Select value={categoryInput} onChange={(e) => setCategoryInput(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map((item) => (
                <option key={item.id ?? item.categoryId} value={item.id ?? item.categoryId}>
                  {item.categoryName ?? item.name ?? item.type}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Label>Shoes Name:</Form.Label>
            <Form.Control value={nameInput} onChange={(e) => setNameInput(e.target.value)} />
          </Col>
          <Col md={4} className="d-flex gap-2">
            <Button type="submit">Filter</Button>
            <Button as={Link} to="/shoes/add" variant="success">Add New</Button>
          </Col>
        </Row>
      </Form>

      <h5>Shoes List</h5>
      <Table bordered striped responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Shoes Name</th>
            <th>Category</th>
            <th>Manufacturer</th>
            <th>Price(đ)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {visibleShoes.length === 0 ? (
            <tr><td colSpan={6} className="text-center">No records found</td></tr>
          ) : visibleShoes.map((shoe, index) => (
            <tr key={shoeId(shoe)}>
              <td>{(page - 1) * PAGE_SIZE + index + 1}</td>
              <td>{shoeName(shoe)}</td>
              <td>{categoryName(shoe)}</td>
              <td>{shoe.manufacturer ?? shoe.manufacture}</td>
              <td>{shoe.price}</td>
              <td>
                <Button variant="link" className="p-0 me-2" onClick={() => setSelectedShoe(shoe)}>Delete</Button>
                | <Link to={`/shoes/${shoeId(shoe)}`} className="ms-2">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
        <span>Show {visibleShoes.length} of {filteredShoes.length} records</span>
        {totalPages > 1 && (
          <Pagination className="mb-0">
            <Pagination.Prev disabled={page === 1} onClick={() => setPage(page - 1)} />
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item key={index} active={page === index + 1} onClick={() => setPage(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next disabled={page === totalPages} onClick={() => setPage(page + 1)} />
          </Pagination>
        )}
      </div>

      <Modal show={!!selectedShoe} onHide={() => setSelectedShoe(null)} centered>
        <Modal.Header closeButton><Modal.Title>Confirmation</Modal.Title></Modal.Header>
        <Modal.Body>Are you sure you want to delete shoes "{selectedShoe && shoeName(selectedShoe)}"?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>Yes</Button>
          <Button variant="secondary" onClick={() => setSelectedShoe(null)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
