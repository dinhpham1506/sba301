import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createRoom } from "../api/room";
import { getRoomType } from "../api/roomType";
import { MS03, MS04, MS06 } from "../messages";
import { EMPTY_FORM, FIELDS, toRequest, validateForm } from "../utils/roomValidation";

export default function AddRoom() {
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY_FORM);
  const [roomType, setRoomType] = useState([]); // dropdown Room Type lấy từ server: ["Single","Double",...]
  const [errors, setErrors] = useState({}); // lỗi đỏ dưới từng ô
  const [msg, setMsg] = useState(""); // MS04 xanh
  const [error, setError] = useState(""); // MS03 / MS06 đỏ

  useEffect(() => {
    getRoomType().then(setRoomType).catch(() => setError(MS06));
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave(e) {
    e.preventDefault();
    setMsg("");
    setError("");

    // 1 + 2. Validate phía React, còn lỗi thì dừng, không gọi API
    const errs = validateForm(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    // 3. Gọi POST /api/rooms
    try {
      await createRoom(toRequest(form)); // 201
      setMsg(MS04);
      setForm(EMPTY_FORM); // xoá trắng form
    } catch (err) {
      const status = err.response?.status;
      const body = err.response?.data;
      if (status === 400 && body?.errors) {
        // [{ field, message }] -> gắn vào đúng ô (trùng phòng: field "roomNumber")
        setErrors(Object.fromEntries(body.errors.map((x) => [x.field, x.message])));
      } else if (status === 400) {
        setError(MS03); // sai định dạng ngày / enum
      } else {
        setError(MS06); // 500 / mất kết nối
      }
    }
  }

  // Vẽ 1 ô theo cấu hình trong FIELDS
  function renderInput(f) {
    const props = { size: "sm", name: f.name, value: form[f.name], onChange: handleChange, isInvalid: !!errors[f.name] };
    if (f.type === "select") {
      const opts = f.server ? roomType : f.options;
      return (
        <Form.Select {...props}>
          <option value="">-- Select --</option>
          {opts.map((o) => <option key={o} value={o}>{o}</option>)}
        </Form.Select>
      );
    }
    if (f.type === "date") return <Form.Control type="date" {...props} />;
    if (f.type === "textarea") return <Form.Control as="textarea" rows={3} {...props} />;
    return <Form.Control placeholder={f.placeholder} {...props} />;
  }

  return (
    <>
      <h6 className="page-title">Add New Room</h6>
      {msg && <Alert variant="success" className="py-2">{msg}</Alert>}
      {error && <Alert variant="danger" className="py-2">{error}</Alert>}

      <Form onSubmit={handleSave} noValidate>
        <Row className="g-3 mb-3">
          {FIELDS.map((f) => (
            <Col md={f.col || 6} key={f.name}>
              <Form.Label className="small fw-semibold mb-1">{f.text || f.label}{f.required && " *"}</Form.Label>
              {renderInput(f)}
              {errors[f.name] && <div className="text-danger small mt-1">{errors[f.name]}</div>}
            </Col>
          ))}
        </Row>
        <Button type="submit" size="sm" className="btn-main px-3 me-3">Save</Button>
        <Button size="sm" className="btn-light-box" onClick={() => navigate("/")}>Back</Button>
      </Form>
    </>
  );
}
