# Cách làm lại bài trong 90 phút

## Nguyên nhân lỗi cũ

- JSON trả `employeeId`, không có `id`. Dùng `emp.id` sẽ gửi `/api/employees/undefined` khi xóa.
- View thiếu route `/employees/:id` trong App và thiếu hàm `getEmployeeById` trong API.
- Phòng ban trả `departmentId`, `departmentName`, không phải `id`, `name`.
- Danh sách trả `{ content, totalPages, totalElements, ... }`, mặc định chỉ 5 dòng. Không lọc và chia trang lại ở frontend vì sẽ bỏ sót các trang khác.

## Chỉ cần nhớ 4 bước

1. Mở Swagger/Network, xem chính xác URL, method, JSON và tên khóa ID.
2. Viết hàm API: GET danh sách, GET theo ID, DELETE theo ID.
3. Viết trang List: state → useEffect gọi API → map bảng → Filter → phân trang → modal xóa.
4. Viết trang Details: useParams lấy ID → GET theo ID → hiển thị; khai báo route trong App.

Luồng ID phải khớp:

```text
emp.employeeId → /employees/2 → useParams().id → GET /api/employees/2
selected.employeeId → DELETE /api/employees/2
```

`id` trong route chỉ là tên biến URL; nó không bắt buộc giống tên trường `employeeId` trong JSON.

## Các file cần học

- `src/App.jsx`: khai báo routes, bọc tất cả bằng AppLayout.
- `src/components/AppLayout.jsx`: ghép Header + Outlet (page hiện tại) + Footer.
- `src/components/Header.jsx`, `Footer.jsx`: giao diện chung.
- `src/pages/EmployeesPage.jsx`: tải danh sách và phân trang.
- `src/pages/EmployeeList.jsx`: chỉ hiển thị bảng từ props, link View/Delete.
- `src/components/EmployeeFilter.jsx`: form lọc, truyền điều kiện lên EmployeesPage.
- `src/pages/EmployeeDetails.jsx`: trang View, lấy ID bằng useParams rồi GET.
- `src/pages/EmployeeAdd.jsx`: form thêm, POST rồi hiện thành công ngay trên trang Add; Back mới về List.
- `src/components/EmployeeDelete.jsx`: xử lý DELETE từ modal mở trên List, thành công tải lại danh sách.
- `src/api/employeeApi.js`: GET list, GET detail, POST, DELETE.

View và Details là cùng một trang, không cần viết hai lần.

```text
App → AppLayout → Header
                → Outlet → EmployeesPage → EmployeeFilter + EmployeeList + EmployeeDelete
                         → EmployeeDetails
                         → EmployeeAdd
                → Footer
```

## Chia thời gian gợi ý

- 0–10 phút: chạy backend, đọc đề/Swagger, xem JSON thật.
- 10–20 phút: tạo Vite, cài dependencies, import Bootstrap, viết API và routes.
- 20–45 phút: List + Filter + phân trang.
- 45–60 phút: View + Back.
- 60–80 phút: Add + Delete + thông báo lỗi/thành công.
- 80–90 phút: test và chỉnh giao diện theo đề.

## Kiểm tra trước khi nộp

```bash
npm run dev
npm run lint
npm run build
```

Backend phải chạy ở `http://localhost:8080` và cho phép CORS từ frontend.

- List: Next sang trang 2; Filter tìm người ngoài trang 1.
- Department: option hiện tên và gửi departmentId đúng.
- View: URL chứa số, tải lại trang vẫn xem được; ID không tồn tại hiện lỗi.
- Delete: mở modal trên List; Close chỉ đóng, Yes gọi DELETE rồi tải lại List.
- Add: kiểm tra email, số điện thoại, ngày, lương, phòng ban; Save gửi POST và hiện thành công ngay trên Add; lỗi giữ lại form.
- Tắt backend: phải hiện lỗi, không báo xóa thành công.

Khi gặp bài tương tự, thay URL API và tên trường theo JSON thật; đừng mặc định mọi API đều có `id`.

## Cách đọc code bản đơn giản

- API: `await axios...` rồi `return response.data`.
- Page: khai báo state → lấy dữ liệu trong useEffect → hàm xử lý nút → return giao diện.
- Add: mỗi ô nhập viết riêng; `name="fullName"` tương ứng `form.fullName.value`.
- Details: mỗi dòng `<tr>` là một thông tin nhân viên.
- List: chỉ dùng `map` để lặp danh sách nhân viên từ API.
- Filter: đọc hai ô nhập, gửi điều kiện lên EmployeesPage.
- `active` trong useEffect giúp bỏ qua dữ liệu cũ nếu người dùng đã chuyển trang.

Ưu tiên dễ đọc, dễ sửa tên trường theo đề. Không cần học mảng cấu hình form, Object.fromEntries hay tự tạo hook.

## API dùng chung — thay đường dẫn theo đề

`src/api/api.js`: có sẵn GET, POST, PUT, PATCH, DELETE. Chỉnh `BASE_URL` một lần.
`src/api/employeeApi.js`: chỉ điền đường dẫn, ID, dữ liệu; page gọi các hàm này.

```js
// Import những hàm cần dùng từ api.js.
getData("/employees");                       // GET danh sách
getData("/employees/2");                     // GET chi tiết
getData("/employees", { page: 0, size: 5 });  // GET có query params
postData("/employees", data);                // POST thêm
putData("/employees/2", data);               // PUT cập nhật
patchData("/employees/2", data);             // PATCH cập nhật một phần
deleteData("/employees/2");                  // DELETE xóa
```

Các hàm trả thẳng dữ liệu JSON, không cần lấy `.data` lần nữa.
Đường dẫn bắt đầu bằng `/`; ví dụ BASE_URL là `http://localhost:8080/api`, điền `/employees`.
`path` là đường dẫn. `PATCH` là phương thức HTTP khác với `PUT`.
Chỉ gọi phương thức backend hỗ trợ: backend bài này có PUT nhưng chưa có PATCH.
Tên trường, kiểu dữ liệu và quy tắc kiểm tra vẫn phải khớp JSON/Swagger của từng đề.

## Modal xóa dùng chung

- `src/components/DeleteModal.jsx`: giao diện Confirmation, Yes, Close.
- `src/components/EmployeeDelete.jsx`: gọi API xóa, truyền kết quả về List.
- `src/pages/EmployeesPage.jsx`: giữ nhân viên được chọn, mở/đóng modal, tải lại List.
- `src/pages/EmployeeList.jsx`: chỉ hiển thị bảng và nút View/Delete.

Chỉ render EmployeeDelete khi đã chọn nhân viên. Close bỏ lựa chọn để đóng modal, không đổi trang.

## Phạm vi

Chỉ sửa frontend. Giữ React, React-Bootstrap, Axios như đề.
Validation viết bằng if trong `src/utils/validateEmployee.js`; thông báo hiện dưới từng ô.
Không cần thêm thư viện form, custom hook, quản lý state toàn cục.

Xem `DOI_DE_NHANH.md` để đổi cột, đổi bố cục Add/View, header và dạng JSON.
