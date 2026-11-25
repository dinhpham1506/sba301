# MTB API – Movie Ticket Booking (SBA301 PE FA26)

Spring Boot 3.3 · Java 17 · SQL Server · port **8080** · CORS cho `http://localhost:5173`

## Chạy
1. Mở SSMS, chạy `database.sql` (tạo DB `SBA301_2026_PE`; nếu bảng `Movies` cũ còn cột `genre` dạng chữ thì script xoá bảng đó để tạo lại). Tài khoản `sa` / `sa`.
2. Mở project bằng IntelliJ → Run `MtbApplication` (hoặc `mvn spring-boot:run`).
3. Lần chạy đầu tự tạo bảng `Genres`, `Movies` (FK `genre_id`), thêm 6 thể loại và 15 phim mẫu.

## Endpoints

| Method | URL | Kết quả |
|---|---|---|
| GET | `/api/movies?title=&genreId=&page=0&size=5` | 200, phân trang, sort Title ASC. `page` bắt đầu từ **0** |
| GET | `/api/movies/{id}` | 200 / 404 |
| POST | `/api/movies` | 200 + movie vừa tạo / 400 |
| PUT | `/api/movies/{id}` | 200 / 400 / 404 |
| DELETE | `/api/movies/{id}` | 204 / 404 |
| GET | `/api/genres` | 200 `[{"id":1,"name":"Action"}, ...]` (Action, Comedy, Drama, Horror, Sci-Fi, Romance) |

### GET /api/movies – response
```json
{
  "content": [
    { "id": 5, "title": "Galaxy Warriors", "genre": { "id": 5, "name": "Sci-Fi" }, "director": "Linh Dang",
      "duration": 125, "ticketPrice": 90000, "releaseDate": "2026-11-10",
      "ageRating": "C13", "language": "English", "status": "Showing" }
  ],
  "page": 0, "size": 5, "totalElements": 15, "totalPages": 3, "first": true, "last": false
}
```

### POST /api/movies – body
```json
{ "title": "Galaxy Warriors 2", "genreId": 5, "director": "Linh Dang",
  "duration": 125, "ticketPrice": 90000, "ageRating": "C13",
  "language": "English", "releaseDate": "2026-12-10" }
```
`status` không bắt buộc: ngày chiếu tương lai → `Upcoming`, hôm nay → `Showing`.

Giá trị hợp lệ: `genreId` là id lấy từ `GET /api/genres` (id không tồn tại → 400 `Genre not found: <id>`), ageRating `P|C13|C16|C18`.

## Lỗi trả về (FE map sang Message List)

| Trường hợp | HTTP | `message` | FE hiện |
|---|---|---|---|
| Thiếu field / sai khoảng / ngày quá khứ | 400 | `Validation failed` + `errors: [{field, message}]` | MS01 / MS02 / MS07 dưới ô input |
| Sai format ngày, sai enum, JSON hỏng | 400 | `Malformed request body: invalid value or date format (expected yyyy-MM-dd)` | MS03 |
| Trùng Movie Title (không phân biệt hoa thường) | 400 | `Movie Title already exists: <title>` | MS09 |
| Không tìm thấy | 404 | `Movie not found: <id>` | MS06 / quay về list |
| Lỗi khác | 500 | exception message | MS06 |

Ví dụ lỗi validation:
```json
{
  "timestamp": "2026-11-24T13:30:00.123",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "errors": [
    { "field": "duration", "message": "Duration must be between 30 and 300." },
    { "field": "language", "message": "Language is required." }
  ]
}
```
