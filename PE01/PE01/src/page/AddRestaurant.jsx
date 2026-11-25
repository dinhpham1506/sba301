import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { MS01, MS02, MS03, MS04, MS05 } from "../messages";



// ===== SỬA 5: tên field phải giống body POST của BE (xem Swagger) =====
const EMPTY = {
  title: "",
  priceFrom: "",
  priceTo: "",
  address: "",
  ownerName: "",
  categoryId: "",
  openDate: "",
};

export default function AddRestaurant() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({}); // lỗi đỏ dưới từng ô
  const [error, setError] = useState(""); // lỗi hệ thống (MS05) dưới tiêu đề
  const [success, setSuccess] = useState(""); // thông báo xanh (MS04) dưới tiêu đề
  const today = new Date().toLocaleDateString("en-CA"); // yyyy-MM-dd

  useEffect(() => {
    getCategories().then((data) => setCategories(data)).catch(() => setError(MS05));
  }, []);

  // Gõ vào ô nào thì cập nhật đúng field đó (dựa vào thuộc tính name của ô)
  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // ===== SỬA 5: kiểm tra dữ liệu theo bảng Screen Definition của đề =====
  function validate() {
    const e = {};
    const from = Number(form.priceFrom);
    const to = Number(form.priceTo);

    if (!form.restaurantName.trim()) e.restaurantName = MS01("Restaurant name");

    // "integer, greater than 1000 and less than 1000000" => từ 1001 đến 999999
    if (!form.priceFrom) e.priceFrom = MS01("Price from");
    else if (!Number.isInteger(from) || from < 1001 || from > 999999)
      e.priceFrom = MS02("Price from", 1001, 999999);

    if (!form.priceTo) e.priceTo = MS01("Price to");
    else if (!Number.isInteger(to) || to < 1001 || to > 999999)
      e.priceTo = MS02("Price to", 1001, 999999);
    else if (to <= from) e.priceTo = "Price to must be greater than Price from";

    if (!form.address.trim()) e.address = MS01("Address");

    if (!form.ownerName.trim()) e.ownerName = MS01("Owner name");

    if (!form.categoryId) e.categoryId = MS01("Category");

    // Ngày phải đúng dạng yyyy-MM-dd, là ngày có thật, và không ở tương lai
    if (!form.openDate) e.openDate = MS01("Open Date");
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(form.openDate) || isNaN(new Date(form.openDate)))
      e.openDate = MS03;
    else if (form.openDate > today) e.openDate = "Open Date must not be a future date";

    setErrors(e);
    return Object.keys(e).length === 0; // true = không có lỗi
  }

  async function handleSave() {
    setError("");
    setSuccess("");
    if (!validate()) return;
    try {
      await createRestaurant(form);
      setSuccess(MS04);
      setForm(EMPTY); // xóa trắng form để nhập tiếp
    } catch (err) {
      // BE này: trùng tên => 400 KHÔNG có nội dung; sai dữ liệu => 400 CÓ danh sách errors
      if (err.response?.status === 400 && !err.response.data) setErrors({ restaurantName: "Restaurant name already exists" });
      else setError(MS05);
    }
  }

  // isInvalid = ô có lỗi; Form.Control.Feedback = dòng chữ đỏ dưới ô (của Bootstrap)
  return (
    <>
      <h6 className="fw-bold mt-2 ms-5">Add New Restaurant</h6>
      {/* Đề: thông báo thành công / lỗi hệ thống hiện ngay dưới tiêu đề */}
      {success && <Alert variant="success" className="py-2">{success}</Alert>}
      {error && <Alert variant="danger" className="py-2">{error}</Alert>}

      {/* ===== SỬA 5: nhãn, name (= tên field), maxLength ===== */}
      <Form className="mt-4">
        <Form.Group as={Row} className="align-items-center mb-3">
          <Form.Label column xs={4} className="text-end">Restaurant name:</Form.Label>
          <Col xs={6}>
            <Form.Control name="restaurantName" maxLength={100} value={form.restaurantName} onChange={change} isInvalid={!!errors.restaurantName} />
            <Form.Control.Feedback type="invalid">{errors.restaurantName}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="align-items-center mb-3">
          <Form.Label column xs={4} className="text-end">Price from (đ):</Form.Label>
          <Col xs={2}>
            <Form.Control name="priceFrom" maxLength={7} value={form.priceFrom} onChange={change} isInvalid={!!errors.priceFrom} />
            <Form.Control.Feedback type="invalid">{errors.priceFrom}</Form.Control.Feedback>
          </Col>
          <Form.Label column xs={1} className="text-end">To:</Form.Label>
          <Col xs={2}>
            <Form.Control name="priceTo" maxLength={7} value={form.priceTo} onChange={change} isInvalid={!!errors.priceTo} />
            <Form.Control.Feedback type="invalid">{errors.priceTo}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="align-items-center mb-3">
          <Form.Label column xs={4} className="text-end">Address:</Form.Label>
          <Col xs={6}>
            <Form.Control name="address" maxLength={100} value={form.address} onChange={change} isInvalid={!!errors.address} />
            <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="align-items-center mb-3">
          <Form.Label column xs={4} className="text-end">Owner name:</Form.Label>
          <Col xs={6}>
            <Form.Control name="ownerName" maxLength={100} value={form.ownerName} onChange={change} isInvalid={!!errors.ownerName} />
            <Form.Control.Feedback type="invalid">{errors.ownerName}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="align-items-center mb-3">
          <Form.Label column xs={4} className="text-end">Category:</Form.Label>
          <Col xs={2}>
            <Form.Select name="categoryId" value={form.categoryId} onChange={change} isInvalid={!!errors.categoryId}>
              <option value=""></option>
              {categories.map((c) => (
                <option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.categoryId}</Form.Control.Feedback>
          </Col>
          <Form.Label column xs={3} className="text-end text-nowrap">Open Date (yyyy-MM-dd):</Form.Label>
          <Col xs={2}>
            <Form.Control name="openDate" maxLength={10} placeholder="yyyy-MM-dd" value={form.openDate} onChange={change} isInvalid={!!errors.openDate} />
            <Form.Control.Feedback type="invalid">{errors.openDate}</Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Row>
          <Col xs={{ span: 6, offset: 4 }}>
            <Button className="btn-box me-4" onClick={handleSave}>Save</Button>
            <Button className="btn-box" onClick={() => navigate("/")}>Back</Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
