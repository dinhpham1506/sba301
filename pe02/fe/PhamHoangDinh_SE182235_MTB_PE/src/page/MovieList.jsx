import { useEffect, useState } from "react";
import { Alert, Badge, Button, Col, Form, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getMovie, deleteMovie } from "../api/movie";
import { getGenres } from "../api/genres";
import { MS05,MS06,MS08 } from "../../messages";
import DeleteMovieModal from "../components/DeleteMovieModal";
import Pagination from "../components/Pagination";
import { GENRE_COLOR, STATUS_COLOR } from "../utils/badgeColors";


// ===== SỬA 3: số dòng mỗi trang =====
const SIZE = 5;


export default function MovieList() {
  const navigate = useNavigate(); // dùng để chuyển trang
  const [list, setList] = useState([]); // các dòng của trang hiện tại
  const [genres, setGenres] = useState([]); // dữ liệu cho dropdown
  const [name, setName] = useState(""); // ô nhập tên
  const [genreId, setGenreId] = useState(""); // dropdown đang chọn
  const [page, setPage] = useState(0); // trang hiện tại, BE đếm từ 0
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0); // tổng số dòng
  const [deleteItem, setDeleteItem] = useState(null); // dòng đang hỏi xóa
  const [msg, setMsg] = useState(""); // thông báo xanh (thành công)
  const [error, setError] = useState(""); // thông báo đỏ (MS05)



 // màu Status
  


  // Gọi API lấy danh sách của trang p
  async function load(p) {
    try {
      const data = await getMovie({
        // ===== SỬA 3: tên bên TRÁI dấu ":" phải giống @RequestParam của BE =====
        title: name.trim() || null,
        genreId: genreId || null,
        page: p,
        size: SIZE,
      });
      // ===== SỬA 3: tên field phân trang (Spring Page: content, totalPages, totalElements) =====
      setList(data.content);
      setTotalPages(data.totalPages);
      setTotal(data.totalElements);
      setPage(p);
      setError("");
    } catch {
      setError(MS06);
    }
  }

  // Chạy 1 lần khi mở trang: tải danh sách + dropdown
  useEffect(() => {
    load(0);
    getGenres().then((data) => setGenres(data)).catch(() => setError(MS06));
  }, []);

  async function handleDelete() {
    try {
      // ===== SỬA 3: tên field id =====
      await deleteMovie(deleteItem.id);
      setDeleteItem(null);
      setMsg(MS08);
      // Xóa dòng cuối cùng của trang thì lùi về trang trước
      load(list.length === 1 && page > 0 ? page - 1 : page);
    } catch {
      setDeleteItem(null);
      setError(MS06);
    }
  }

  return (
    <>
      {/* ===== SỬA 3: tiêu đề trang ===== */}
      <h6 className="fw-bold mt-2 pb-2 border-bottom">Movie List</h6>
      {/* Đề: thông báo thành công / lỗi hệ thống hiện ngay dưới tiêu đề */}
      {msg && <Alert variant="success" className="py-2">{msg}</Alert>}
      {error && <Alert variant="danger" className="py-2">{error}</Alert>}

      {/* ===== SỬA 3: ô lọc: nhãn + field dropdown (c.id, c.name) ===== */}
        <Row className="align-items-end g-3 mt-1 mb-3">
          <Col md={3}>
            <Form.Label className="small mb-1">Movie Title</Form.Label>
            <Form.Control size="sm" maxLength={100} value={name} onChange={(e) => setName(e.target.value)} />
          </Col>
          <Col md={3}>
            <Form.Label className="small mb-1">Genre</Form.Label>
            <Form.Select size="sm" value={genreId} onChange={(e) => setGenreId(e.target.value)}>
              <option value="">-- All --</option>
              {genres.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </Form.Select>
          </Col>
          <Col xs="auto">
            <Button size="sm" className="btn-search" onClick={() => { setMsg(""); load(0); }}>Search</Button>
          </Col>
          <Col className="text-end">
            <Button size="sm" className="btn-add" onClick={() => navigate("/movies/add")}>+ Add New</Button>
          </Col>
        </Row>


      {/* ===== SỬA 3: tiêu đề cột (th) và field từng cột (td) — số th phải bằng số td ===== */}
      {/* table-box = bảng chỉ có viền ngoài, tiêu đề xanh nhạt (index.css) */}
      <div className="table-box">
        <Table borderless size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Genre</th>
              <th>Duration</th>
              <th>Price (đ)</th>
              <th>Release</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* colSpan = tổng số cột (đang là 7) */}
            {list.length === 0 && (
              <tr><td colSpan={8}>{MS05}</td></tr>
            )}
            {list.map((r, i) => (
              <tr key={r.id}>
                <td>{page * SIZE + i + 1}</td>
                <td>{r.title}</td>
                <td><Badge bg={GENRE_COLOR[r.genre?.name] || "secondary"}>{r.genre?.name}</Badge></td>
                <td>{r.duration}'</td>
                <td>{r.ticketPrice?.toLocaleString("vi-VN")}</td>
                <td>{r.releaseDate}</td>
                <td><Badge bg={STATUS_COLOR[r.status] || "secondary"}>{r.status}</Badge></td>
                <td>
                  {/* Đề ghi Hyperlink. preventDefault để không nhảy lên đầu trang */}
                  <Link to={"/movies/" + r.id} className="text-decoration-none">View</Link>
                  <span className="text-muted mx-2">|</span>
                  <a href="#" className="text-decoration-none text-danger" onClick={(e) => { e.preventDefault(); setDeleteItem(r); }}>Delete</a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Phân trang: chỉ hiện khi có nhiều hơn 1 trang (không cần sửa) */}
      <Pagination page={page} totalPages={totalPages} count={list.length} total={total} onChange={load} />

      <DeleteMovieModal item={deleteItem} onYes={handleDelete} onClose={() => setDeleteItem(null)} />
    </>
  );
}
