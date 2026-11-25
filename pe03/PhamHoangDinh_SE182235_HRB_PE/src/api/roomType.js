import { getData } from "./api";

// ===== SỬA 1: đường dẫn API cho dropdown. Ví dụ đề Employee: "/departments" =====
export function getRoomType() {
  return getData("/room-types");
}
