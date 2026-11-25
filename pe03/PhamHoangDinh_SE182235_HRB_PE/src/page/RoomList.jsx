import { useEffect, useState } from "react";
import { Alert, Badge, Button, Col, Form, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { deleteRoom, getRoom } from "../api/room";
import { getRoomType } from "../api/roomType";
import { MS05, MS06, MS08 } from "../messages";
import DeleteRoomModal from "../components/DeleteRoomModal";
import Pagination from "../components/Pagination";
import { BED_TYPE_COLOR, STATUS_COLOR } from "../utils/badgeColors";

// [CLAUDE SỬA] 5 -> 6: BE mặc định size=6 (README: GET /api/rooms?...&size=6)
const SIZE = 6; // SỬA: số dòng mỗi trang



// ===== SỬA: CỘT BẢNG — [tiêu đề, giá trị]. Cột # và Action có sẵn =====
const COLUMNS = [
  ["id", (r) => r.id],
  ["roomNumber", (r) => r.roomNumber],
  ["type", (r) => r.type],
  // [CLAUDE SỬA] r.bedType?.name -> r.bedType
  // bedType là enum bên BE nên JSON trả chuỗi "Queen", KHÔNG phải object { name: ... }
  // (đề Movie phải .name vì genre là object { id, name })
  ["bedType", (r) => <Badge bg={BED_TYPE_COLOR[r.bedType] || "secondary"}>{r.bedType}</Badge>],
  // [CLAUDE SỬA] bỏ + "'" ở floor, capacity (dấu ' là phút của cột duration bên Movie)
  ["floor", (r) => r.floor],
  ["capacity", (r) => r.capacity],
  // [CLAUDE SỬA] r.ticketPrice -> r.pricePerNight (đúng tên field trong Room.java)
  ["pricePerNight (đ)", (r) => r.pricePerNight?.toLocaleString("vi-VN")],
  ["Status", (r) => <Badge bg={STATUS_COLOR[r.status] || "secondary"}>{r.status}</Badge>],
];

// [CLAUDE SỬA] đổi tên MovieList -> RoomList (chỉ đổi tên, không ảnh hưởng chạy)
export default function RoomList() {
  const navigate = useNavigate();
  const [list, setList] = useState([]); // các dòng của trang hiện tại
  const [roomType, setRoomType] = useState([]); // dữ liệu dropdown
  const [keyword, setKeyword] = useState(""); // ô nhập tên
  // [CLAUDE SỬA] genreId/setGenreId -> roomTypeId/setRoomTypeId
  // JSX bên dưới dùng roomTypeId mà chưa khai báo -> ReferenceError -> TRẮNG CẢ TRANG (mất luôn Header/Footer)
  const [roomTypeId, setRoomTypeId] = useState(""); // dropdown đang chọn
  const [page, setPage] = useState(0); // BE đếm từ 0
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [deleteItem, setDeleteItem] = useState(null); // dòng đang hỏi xoá
  const [msg, setMsg] = useState(""); // thông báo xanh
  const [error, setError] = useState(""); // thông báo đỏ

  async function load(p) {
    try {
      // [CLAUDE SỬA] getMovies -> getRoom (hàm có thật trong api/room.js)
      const data = await getRoom({
        // SỬA: tên bên trái = @RequestParam của BE
        // [CLAUDE SỬA] title -> roomNumber, genreId -> type (đúng @RequestParam trong RoomController)
        roomNumber: keyword.trim() || null,
        type: roomTypeId || null,
        page: p,
        size: SIZE,
      });
      setList(data.content);
      setTotalPages(data.totalPages);
      setTotal(data.totalElements);
      setPage(p);
      setError("");
    } catch {
      setError(MS06);
    }
  }

  useEffect(() => {
    load(0);
    getRoomType().then(setRoomType).catch(() => setError(MS06));
  }, []);

  async function handleDelete() {
    try {
      // [CLAUDE SỬA] deleteMovie -> deleteRoom
      await deleteRoom(deleteItem.id); // 204
      setDeleteItem(null);
      setMsg(MS08);
      load(list.length === 1 && page > 0 ? page - 1 : page);
    } catch {
      setDeleteItem(null);
      setError(MS06); // 404 / 500
    }
  }

  return (
    <>
      <h6 className="page-title">Room List</h6>
      {msg && <Alert variant="success" className="py-2">{msg}</Alert>}
      {error && <Alert variant="danger" className="py-2">{error}</Alert>}

      {/* SỬA: nhãn ô lọc + field dropdown (o.id, o.name) */}
      <Row className="align-items-end g-3 mb-3">
        <Col md={3}>
          {/* [CLAUDE SỬA] "Room Title" -> "Room Number" vì ô này lọc theo roomNumber */}
          <Form.Label className="small mb-1">Room Number</Form.Label>
          <Form.Control size="sm" maxLength={100} value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        </Col>
        <Col md={3}>
          <Form.Label className="small mb-1">Room Type</Form.Label>
          <Form.Select size="sm" value={roomTypeId} onChange={(e) => setRoomTypeId(e.target.value)}>
            <option value="">-- All --</option>
            {/* [CLAUDE SỬA] o.id / o.name -> o
                /api/room-types trả mảng CHUỖI ["Single","Double",...], không phải object
                nên o.id, o.name = undefined */}
            {roomType.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </Form.Select>
        </Col>
        <Col xs="auto">
          <Button size="sm" className="btn-main px-3" onClick={() => { setMsg(""); load(0); }}>Search Room</Button>
        </Col>
        <Col className="text-end">
          <Button size="sm" className="btn-light-box" onClick={() => navigate("/add")}>+ Add New</Button>
        </Col>
      </Row>

      <Table size="sm" hover responsive className="table-head align-middle">
        <thead>
          <tr>
            <th>#</th>
            {COLUMNS.map(([title]) => <th key={title}>{title}</th>)}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {list.length === 0 && !error && (
            <tr><td colSpan={COLUMNS.length + 2} className="text-center text-muted">{MS05}</td></tr>
          )}
          {list.map((r, i) => (
            <tr key={r.id}>
              <td>{page * SIZE + i + 1}</td>
              {COLUMNS.map(([title, value]) => <td key={title}>{value(r)}</td>)}
              <td>
                <Link to={"/rooms/" + r.id} className="text-decoration-none">View</Link>
                <span className="text-muted mx-2">|</span>
                <a href="#" className="text-decoration-none text-danger" onClick={(e) => { e.preventDefault(); setMsg(""); setDeleteItem(r); }}>Delete</a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination page={page} totalPages={totalPages} total={total} onChange={load} />
      {/* [CLAUDE SỬA] DeleteMovieModal -> DeleteRoomModal (đúng tên đã import ở trên; sai tên -> trắng trang) */}
      <DeleteRoomModal item={deleteItem} onYes={handleDelete} onClose={() => setDeleteItem(null)} />
    </>
  );
}
