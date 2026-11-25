import { deleteData, getData, postData } from "./api";

// ===== SỬA 1: đường dẫn API (xem Swagger). Ví dụ đề Employee: "/employees" =====
const PATH = "/movies";

// Danh sách có lọc + phân trang. params: title, genreId, page, size
export function getMovie(params) {
  return getData(PATH, params);
}

// Chi tiết 1 dòng: GET /api/restaurants/{id}
export function getMovieById(id) {
  return getData(PATH + "/" + id);
}

// Thêm mới: POST /api/restaurants
export function createMovie(data) {
  return postData(PATH, data);
}

// Xóa: DELETE /api/restaurants/{id}
export function deleteMovie(id) {
  return deleteData(PATH + "/" + id);
}
