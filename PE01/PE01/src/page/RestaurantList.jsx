import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getRestaurants, deleteRestaurant } from "../api/restaurant";
import { getCategories } from "../api/category";
import { MS05, MS08 } from "../messages";
import DeleteRestaurantModal from "../components/DeleteRestaurantModal";
import Pagination from "../components/Pagination";

// ===== SỬA 3: số dòng mỗi trang + cột sắp xếp tăng dần =====
const SIZE = 5;
const SORT = "restaurantName";

export default function RestaurantList() {
  const navigate = useNavigate(); // dùng để chuyển trang
  const [list, setList] = useState([]); // các dòng của trang hiện tại
  const [categories, setCategories] = useState([]); // dữ liệu cho dropdown
  const [name, setName] = useState(""); // ô nhập tên
  const [categoryId, setCategoryId] = useState(""); // dropdown đang chọn
  const [page, setPage] = useState(0); // trang hiện tại, BE đếm từ 0
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0); // tổng số dòng
  const [deleteItem, setDeleteItem] = useState(null); // dòng đang hỏi xóa
  const [msg, setMsg] = useState(""); // thông báo xanh (thành công)
  const [error, setError] = useState(""); // thông báo đỏ (MS05)

  // Gọi API lấy danh sách của trang p
  async function load(p) {
    try {
      const data = await getRestaurants({
        // ===== SỬA 3: tên bên TRÁI dấu ":" phải giống @RequestParam của BE =====
        name: name || null,
        categoryId: categoryId || null,
        page: p,
        size: SIZE,
        sortBy: SORT,
      });
      // ===== SỬA 3: tên field phân trang (Spring Page: content, totalPages, totalElements) =====
      setList(data.content);
      setTotalPages(data.totalPages);
      setTotal(data.totalElements);
      setPage(p);
      setError("");
    } catch {
      setError(MS05);
    }
  }

  // Chạy 1 lần khi mở trang: tải danh sách + dropdown
  useEffect(() => {
    load(0);
    getCategories().then((data) => setCategories(data)).catch(() => setError(MS05));
  }, []);

  async function handleDelete() {
    try {
      // ===== SỬA 3: tên field id =====
      await deleteRestaurant(deleteItem.restaurantId);
      setDeleteItem(null);
      setMsg(MS08);
      // Xóa dòng cuối cùng của trang thì lùi về trang trước
      load(list.length === 1 && page > 0 ? page - 1 : page);
    } catch {
      setDeleteItem(null);
      setError(MS05);
    }
  }

  return (
    <>
      <h6 className="fw-bold mt-2">Restaurant List</h6>
      {/* Đề: thông báo thành công / lỗi hệ thống hiện ngay dưới tiêu đề */}
      {msg && <Alert variant="success" className="py-2">{msg}</Alert>}
      {error && <Alert variant="danger" className="py-2">{error}</Alert>}

      {/* ===== SỬA 3: nhãn ô lọc + field của dropdown (categoryId, categoryName) ===== */}
      <Form.Group as={Row} className="align-items-center mt-4 mb-2">
        <Form.Label column xs={3} className="text-end">Category:</Form.Label>
        <Col xs={2} className="px-0">
          <Form.Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value=""></option>
            {categories.map((c) => (
              <option key={c.categoryId} value={c.categoryId}>{c.categoryName}</option>
            ))}
          </Form.Select>
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="align-items-center mb-5">
        <Form.Label column xs={3} className="text-end">Restaurant Name:</Form.Label>
        <Col xs={5} className="px-0">
          <Form.Control maxLength={100} value={name} onChange={(e) => setName(e.target.value)} />
        </Col>
        <Col xs={4} className="ps-4">
          {/* btn-box = nút xám nhạt viền xanh (index.css) */}
          <Button className="btn-box me-3" onClick={() => { setMsg(""); load(0); }}>Filter</Button>
          <Button className="btn-box" onClick={() => navigate("/add")}>Add New</Button>
        </Col>
      </Form.Group>

      <h6 className="fw-bold mt-4">Restaurant List</h6>

      {/* ===== SỬA 3: tiêu đề cột (th) và field từng cột (td) — số th phải bằng số td ===== */}
      {/* table-box = bảng chỉ có viền ngoài, tiêu đề xanh nhạt (index.css) */}
      <div className="table-box">
        <Table borderless size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Restaurant Name</th>
              <th>Category</th>
              <th>Owner</th>
              <th>Address</th>
              <th>Price range(đ)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* colSpan = tổng số cột (đang là 7) */}
            {list.length === 0 && (
              <tr><td colSpan={7}>No records found</td></tr>
            )}
            {list.map((r, i) => (
              <tr key={r.restaurantId}>
                <td>{page * SIZE + i + 1}</td>
                <td>{r.restaurantName}</td>
                <td>{r.categoryName}</td>
                <td>{r.ownerName}</td>
                <td>{r.address}</td>
                <td>{r.priceFrom}-{r.priceTo}</td>
                <td>
                  {/* Đề ghi Hyperlink. preventDefault để không nhảy lên đầu trang */}
                  <a href="#" className="fw-bold" onClick={(e) => { e.preventDefault(); setDeleteItem(r); }}>Delete</a>
                  {" | "}
                  <Link to={"/view/" + r.restaurantId} className="fw-bold">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Phân trang: chỉ hiện khi có nhiều hơn 1 trang (không cần sửa) */}
      <Pagination page={page} totalPages={totalPages} count={list.length} total={total} onChange={load} />

      {/* Hộp xác nhận xóa: sửa câu hỏi trong components/DeleteRestaurantModal.jsx */}
      <DeleteRestaurantModal item={deleteItem} onYes={handleDelete} onClose={() => setDeleteItem(null)} />
    </>
  );
}
