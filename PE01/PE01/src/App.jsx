/*
 ============================================================
  CÁCH DÙNG KHI ĐI THI (Ctrl+Shift+F tìm "SỬA" trong cả thư mục src):
  ------------------------------------------------------------
  B0. Mở Swagger: http://localhost:8080/swagger-ui.html
      -> xem đường dẫn API, tên tham số lọc, tên các field.
  B1. api/restaurant.js, api/category.js: đường dẫn API
      messages.js               : câu thông báo MS01..MS08
  B2. components/Header.jsx     : tên hệ thống
      components/Footer.jsx     : chữ dưới cùng
  B3. page/RestaurantList.jsx  : tham số lọc, cột bảng
      components/DeleteRestaurantModal.jsx: câu hỏi xóa
  B4. page/RestaurantDetails.jsx: các dòng chi tiết
  B5. page/AddRestaurant.jsx   : các ô nhập + kiểm tra dữ liệu
  components/AppLayout.jsx, Pagination.jsx: không cần sửa
  Ngoài src: vite.config.js (cổng 5173, BE 8080), jsconfig.json (đề bắt có)
  Mẹo: chọn chữ "restaurant" rồi Ctrl+D (VS Code) để đổi hàng loạt.
  Đề 3.4: tên component phải theo nghiệp vụ => đổi tên file + tên hàm theo đề
        (vd RestaurantList -> EmployeeList). Đổi tên file trong VS Code bằng F2,
        VS Code hỏi "Update imports?" thì bấm Yes.
 ============================================================
*/
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import RestaurantList from "./page/RestaurantList";
import RestaurantDetails from "./page/RestaurantDetails";
import AddRestaurant from "./page/AddRestaurant";

// Chỉ khai báo đường dẫn. Header/Footer nằm trong AppLayout.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Mọi trang bên trong đều có Header + Footer của AppLayout */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<RestaurantList />} />
          <Route path="view/:id" element={<RestaurantDetails />} />
          <Route path="add" element={<AddRestaurant />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
