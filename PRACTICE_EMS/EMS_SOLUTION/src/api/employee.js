import { deleteData, getData, patchData, postData } from "./api";

const PATH = "/employees";

// Danh sách có lọc + phân trang. params: name, departmentId, status, page, size, sortBy
export function getEmployees(params) {
  return getData(PATH, params);
}

// Chi tiết: GET /api/employees/{id}
export function getEmployeeById(id) {
  return getData(PATH + "/" + id);
}

// Thêm mới: POST /api/employees
export function createEmployee(data) {
  return postData(PATH, data);
}

// Đổi trạng thái: PATCH /api/employees/{id}/status, body {"status": "ON_LEAVE"}
export function updateEmployeeStatus(id, status) {
  return patchData(PATH + "/" + id + "/status", { status });
}

// Xóa: DELETE /api/employees/{id}
export function deleteEmployee(id) {
  return deleteData(PATH + "/" + id);
}

// Danh sách enum trạng thái: ["ACTIVE","ON_LEAVE","RESIGNED"]
export function getEmployeeStatuses() {
  return getData(PATH + "/statuses");
}
