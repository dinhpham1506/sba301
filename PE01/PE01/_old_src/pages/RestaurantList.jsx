import { useEffect, useState } from "react";
import { Alert, Button, Form, Table } from "react-bootstrap";
import { getCate } from "../api/cate";
import { getRestaurants } from "../api/restaurant";
import DeleteRestaurantModal from "../components/DeleteRestaurantModal";
import ListPagination from "../components/ListPagination";
import "./RestaurantList.css";

export default function RestaurantList() {
  // 1. ĐỔI SỐ DÒNG MỖI TRANG ở đây. BE đếm trang từ 0.
  const pageSize = 5;
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [selected, setSelected] = useState(null);

  // 2. Ô nhập và bộ lọc đã áp dụng tách riêng: bấm Filter mới gọi API.
  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [query, setQuery] = useState({ name: "", categoryId: "", page: 0 });

  useEffect(() => {
    let active = true;
    getCate()
      .then((data) => { if (active) setCategories(data); })
      .catch(() => { if (active) setMessage("Cannot load categories. Please check the backend."); });
    return () => { active = false; };
  }, []);

  // 3. API trả PageDTO: content là danh sách, totalElements là tổng số dòng.
  useEffect(() => {
    let active = true;
    async function loadRestaurants() {
      setLoading(true);
      try {
        const data = await getRestaurants({ ...query, size: pageSize });
        if (active) {
          setRestaurants(data.content);
          setTotalElements(data.totalElements);
          setTotalPages(data.totalPages);
        }
      } catch (error) {
        if (active) {
          setRestaurants([]);
          setTotalElements(0);
          setTotalPages(0);
          setMessage(`Cannot load restaurants (HTTP ${error.response?.status ?? "network error"}). Please check the backend.`);
        }
      } finally {
        if (active) setLoading(false);
      }
    }
    loadRestaurants();
    return () => { active = false; };
  }, [query]);

  function handleFilter(event) {
    event.preventDefault();
    setMessage("");
    setSuccess("");
    setQuery({ name: name.trim(), categoryId, page: 0 });
  }

  function handleDeleted() {
    setSelected(null);
    setSuccess("Deleted successfully.");
    setMessage("");
    // Xóa dòng cuối của trang thì quay về trang trước rồi tải lại.
    setQuery({ ...query, page: restaurants.length === 1 ? Math.max(0, query.page - 1) : query.page });
  }

  return (
    <section className="restaurant-list" aria-labelledby="restaurant-list-title">
      <h1 id="restaurant-list-title" className="page-title">Restaurant List</h1>
      {message && <Alert variant="danger">{message}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {/* 4. ĐỔI NHÃN / THỨ TỰ Ô LỌC ở đây. */}
      <Form onSubmit={handleFilter} className="restaurant-filter">
        <Form.Group controlId="category-filter" className="restaurant-filter-field">
          <Form.Label>Category:</Form.Label>
          <Form.Select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">-- All --</option>
            {categories.map((category) => (
              <option key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <div className="restaurant-filter-row">
          <Form.Group controlId="name-filter" className="restaurant-filter-field">
            <Form.Label>Restaurant Name:</Form.Label>
            <Form.Control value={name} maxLength={100} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Button type="submit" disabled={loading}>Filter</Button>
          {/* Chưa có trang thêm. Sau này nối route /restaurants/new. */}
          <span title="The Add New page has not been implemented yet.">
            <Button type="button" variant="outline-secondary" disabled>Add New</Button>
          </span>
        </div>
      </Form>

      {/* 5. ĐỔI CỘT: sửa cả tiêu đề th và ô dữ liệu td tương ứng. */}
      <h2 className="restaurant-table-title">Restaurant List</h2>
      <Table bordered hover responsive className="restaurant-table" aria-busy={loading}>
        <thead>
          <tr>
            <th scope="col">#</th><th scope="col">Restaurant Name</th>
            <th scope="col">Category</th><th scope="col">Owner</th>
            <th scope="col">Address</th><th scope="col">Price range(đ)</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={7} role="status">Loading...</td></tr>
          ) : restaurants.length === 0 ? (
            <tr><td colSpan={7}>No records found.</td></tr>
          ) : restaurants.map((restaurant, index) => (
            <tr key={restaurant.restaurantId}>
              <td>{query.page * pageSize + index + 1}</td>
              <td>{restaurant.restaurantName}</td>
              <td>{restaurant.categoryName}</td>
              <td>{restaurant.ownerName}</td>
              <td>{restaurant.address}</td>
              <td>{restaurant.priceFrom}–{restaurant.priceTo}</td>
              <td className="text-nowrap">
                <Button variant="link" size="sm" onClick={() => setSelected(restaurant)}>Delete</Button>
                {" | "}
                {/* Chưa có trang chi tiết. Sau này nối /restaurants/:id. */}
                <span title="The View page has not been implemented yet.">
                  <Button variant="link" size="sm" disabled>View</Button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ListPagination page={query.page} totalPages={totalPages} totalElements={totalElements}
        count={loading ? 0 : restaurants.length} loading={loading}
        onPageChange={(page) => { setMessage(""); setQuery({ ...query, page }); }} />
      <DeleteRestaurantModal restaurant={selected} onClose={() => setSelected(null)} onDeleted={handleDeleted} />
    </section>
  );
}
