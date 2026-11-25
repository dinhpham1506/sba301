# HRB_API — Backend cho đề luyện SBA301 (Hotel Room Booking)

Spring Boot 3.3 · Java 17+ · REST API chạy ở http://localhost:8080 · CORS mở cho http://localhost:5173

## Cách chạy

**Cách 1 — SQL Server (giống đề thi)**
1. Mở SSMS, chạy `database.sql` (tạo DB `SBA301_2026_HRB`). Tài khoản `sa` / `sa`.
2. Mở project bằng IntelliJ / NetBeans / VS Code → chạy `HrbApiApplication`
   (hoặc `mvn spring-boot:run`).
3. Lần đầu chạy, bảng `Rooms` tự tạo và tự thêm 16 phòng mẫu.

**Cách 2 — Không cần SQL Server (H2 in-memory)**
```
mvn spring-boot:run -Dspring-boot.run.profiles=h2
```
Trong IntelliJ: Run Configuration → Active profiles = `h2`. Dữ liệu reset mỗi lần chạy lại.

## Endpoints

| Method | URL | Kết quả |
|---|---|---|
| GET | /api/rooms?roomNumber=&type=&status=&page=0&size=6 | 200, dạng trang (xem bên dưới). Sắp xếp pricePerNight ASC, roomNumber ASC |
| GET | /api/rooms/{id} | 200 · 404 nếu không có |
| POST | /api/rooms | 201 + phòng mới · 400 nếu sai validate / trùng Room Number |
| DELETE | /api/rooms/{id} | 204 · 404 · 409 nếu phòng đang Occupied |
| GET | /api/room-types | 200 `["Single","Double","Twin","Suite","Deluxe"]` |

Giá trị enum: type = Single | Double | Twin | Suite | Deluxe ·
status = Available | Occupied | Maintenance · bedType = Single | Queen | King | Twin

### Response của GET /api/rooms
```json
{
  "content": [ { "id": 1, "roomNumber": "R101", "type": "Single", "floor": 1, "capacity": 1,
                 "pricePerNight": 450000, "bedType": "Single", "view": "Garden",
                 "availableFrom": "2026-11-25", "status": "Available", "description": "..." } ],
  "number": 0, "size": 6, "totalElements": 16, "totalPages": 3
}
```
`number` đếm từ 0. Trên giao diện hiển thị "Page number+1 / totalPages".

### Body của POST /api/rooms
```json
{ "roomNumber": "R404", "type": "Double", "floor": 4, "capacity": 2, "pricePerNight": 950000,
  "bedType": "Queen", "view": "City", "availableFrom": "2026-12-01", "description": "Test" }
```

### Response lỗi
```json
{ "timestamp": "2026-11-25T23:10:00", "status": 400, "error": "Bad Request",
  "message": "Validation failed",
  "errors": [ { "field": "floor", "message": "Floor must be between 1 and 50." } ] }
```
- Trùng phòng: `message` = "Room Number already exists: R101", `errors[0].field` = "roomNumber"
- Sai định dạng ngày / enum: `message` bắt đầu bằng "Malformed request body" (không có `errors`)
- 409: `message` = "Cannot delete a room that is currently occupied."

## Dữ liệu mẫu để test
16 phòng (= 3 trang × 6). Phòng Occupied để test lỗi 409: **R102, R203, R303**.
Tìm `roomNumber=10` sẽ ra R1001, R1002. Lọc `status=Maintenance` ra R202, R502.

## Ví dụ axios
```js
const api = axios.create({ baseURL: "http://localhost:8080/api" });
api.get("/rooms", { params: { roomNumber, type, status, page, size: 6 } });
api.post("/rooms", form);
api.delete(`/rooms/${id}`);
// lỗi: err.response.status, err.response.data.message, err.response.data.errors
```
