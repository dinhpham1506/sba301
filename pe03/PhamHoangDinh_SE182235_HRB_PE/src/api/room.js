import { deleteData, getData, postData } from "./api";

// ===== SỬA 1: đường dẫn API (xem Swagger). Ví dụ đề Employee: "/employees" =====
const PATH = "/rooms";

// Danh sách có lọc + phân trang. params: name, categoryId, page, size, sortBy
export function getRoom(params) {
  return getData(PATH, params);
}

// Chi tiết 1 dòng: GET /api/restaurants/{id}
export function getRoomById(id) {
  return getData(PATH + "/" + id);
}

// Thêm mới: POST /api/restaurants
export function createRoom(data) {
  return postData(PATH, data);
}

// Xóa: DELETE /api/restaurants/{id}
export function deleteRoom(id) {
  return deleteData(PATH + "/" + id);
}
