import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { createMovie } from "../api/movie";
import { getGenres } from "../api/genres";
import { MS03, MS04, MS06, MS09 } from "../../messages";
// Luật kiểm tra từng ô nằm ở đây, sửa theo bảng Screen Definition của đề
import { AGE_RATINGS, EMPTY_MOVIE, toMovieRequest, validateMovie } from "../utils/movieValidation";


export default function AddMovie() {
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY_MOVIE);
  const [genres, setGenres] = useState([]); // dropdown lấy từ server
  const [errors, setErrors] = useState({}); // lỗi từng ô (chữ đỏ dưới ô)
  const [msg, setMsg] = useState(""); // thông báo xanh (MS04)
  const [error, setError] = useState(""); // thông báo đỏ (MS06)

  useEffect(() => {
    getGenres().then(setGenres).catch(() => setError(MS06));
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave() {
    setMsg("");
    setError("");
    const errs = validateMovie(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    try {
      await createMovie(toMovieRequest(form));
      setMsg(MS04);
      setForm(EMPTY_MOVIE); // đề 1.1e: xoá hết ô sau khi tạo thành công
    } catch (err) {
      const body = err.response?.data;
      if (body?.errors) {
        // BE trả lỗi từng ô: [{ field, message }]
        setErrors(Object.fromEntries(body.errors.map((x) => [x.field, x.message])));
      } else if (body?.message?.includes("already exists")) {
        setErrors({ title: MS09("Movie Title") }); // trùng tên trong DB
      } else if (err.response?.status === 400) {
        setErrors({ releaseDate: MS03 }); // sai định dạng ngày / enum: hiện dưới ô ngày
      } else {
        setError(MS06);
      }
    }
  }

  // Nhãn có dấu * + chữ đỏ dưới ô
  const label = (text) => <Form.Label className="small fw-semibold mb-1">{text} *</Form.Label>;
  const errorText = (name) => errors[name] && <div className="text-danger small mt-1">{errors[name]}</div>;

  return (
    <>
      <h6 className="fw-bold mt-3 pb-2 border-bottom">Add New Movie</h6>
      {/* Đề: thông báo hệ thống hiện ngay dưới tiêu đề, xanh / đỏ */}
      {msg && <Alert variant="success" className="py-2">✓ {msg}</Alert>}
      {error && <Alert variant="danger" className="py-2">{error}</Alert>}

      <Form onSubmit={(e) => { e.preventDefault(); handleSave(); }} noValidate>
        <Form.Group className="mb-2">
          {label("Movie Title")}
          <Form.Control size="sm" name="title" maxLength={150} placeholder="Enter movie title"
            value={form.title} onChange={handleChange} isInvalid={!!errors.title} />
          {errorText("title")}
        </Form.Group>

        <Row className="g-3 mb-2">
          <Col md={6}>
            {label("Genre")}
            <Form.Select size="sm" name="genreId" value={form.genreId} onChange={handleChange} isInvalid={!!errors.genreId}>
              <option value="">-- Select --</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </Form.Select>
            {errorText("genreId")}
          </Col>
          <Col md={6}>
            {label("Director")}
            <Form.Control size="sm" name="director" maxLength={100}
              value={form.director} onChange={handleChange} isInvalid={!!errors.director} />
            {errorText("director")}
          </Col>
        </Row>

        <Row className="g-3 mb-2">
          <Col md={6}>
            {label("Duration (min)")}
            <Form.Control size="sm" name="duration" maxLength={3}
              value={form.duration} onChange={handleChange} isInvalid={!!errors.duration} />
            {errorText("duration")}
          </Col>
          <Col md={6}>
            {label("Ticket Price (đ)")}
            <Form.Control size="sm" name="ticketPrice" maxLength={8}
              value={form.ticketPrice} onChange={handleChange} isInvalid={!!errors.ticketPrice} />
            {errorText("ticketPrice")}
          </Col>
        </Row>

        <Row className="g-3 mb-2">
          <Col md={6}>
            {label("Age Rating")}
            <Form.Select size="sm" name="ageRating" value={form.ageRating} onChange={handleChange} isInvalid={!!errors.ageRating}>
              <option value="">-- Select --</option>
              {AGE_RATINGS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </Form.Select>
            {errorText("ageRating")}
          </Col>
          <Col md={6}>
            {label("Language")}
            <Form.Control size="sm" name="language" maxLength={50}
              value={form.language} onChange={handleChange} isInvalid={!!errors.language} />
            {errorText("language")}
          </Col>
        </Row>

        <Row className="g-3 mb-3">
          <Col md={6}>
            {label("Release Date")}
            <Form.Control size="sm" type="date" name="releaseDate"
              value={form.releaseDate} onChange={handleChange} isInvalid={!!errors.releaseDate} />
            {errorText("releaseDate")}
          </Col>
        </Row>

        <Button type="submit" size="sm" className="btn-search me-3">Save</Button>
        <Button size="sm" className="btn-add" onClick={() => navigate("/")}>Back</Button>
      </Form>
    </>
  );
}
