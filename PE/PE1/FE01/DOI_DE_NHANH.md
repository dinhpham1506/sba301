# Copy và sửa nhanh khi gặp đề tương tự

Đọc ảnh đề và JSON thật trước. Chỉ đổi giao diện thì sửa JSX/CSS; không cần sửa hàm API.

## 1. Thành phần đã có — chỉ import và dùng

- AppLayout đã ghép Header + Outlet + Footer. Trong App.jsx, đặt route mới bên trong AppLayout.
- EmployeesPage đã dùng EmployeeFilter, EmployeeList và EmployeeDelete.
- EmployeeDelete đã dùng DeleteModal. Không chép modal vào EmployeeList.
- EmployeeList chỉ vẽ bảng; View là Link, Delete là thẻ a mở modal.

## 2. Tìm đúng file để sửa

| Đề đổi gì? | File | Chỗ sửa |
|---|---|---|
| Tên hệ thống, ngày, vị trí header | src/components/Header.jsx | Nội dung Navbar và className |
| Chữ cuối trang | src/components/Footer.jsx | Nội dung footer |
| Màu, font, khoảng cách chung | src/index.css | .ems-header, .page-title, .ems-table... |
| Chiều rộng nội dung mọi màn | src/components/AppLayout.jsx | Container; thêm fluid nếu cần rộng toàn màn |
| Cột bảng Get All | src/pages/EmployeeList.jsx | th và td cùng thứ tự |
| Màu dòng chẵn/lẻ | src/pages/EmployeeList.jsx, src/index.css | striped và quy tắc nth-child(even) |
| Vị trí Add New, phân trang | src/pages/EmployeesPage.jsx | JSX trong return |
| Ô lọc | src/components/EmployeeFilter.jsx | Ô nhập và object trong onFilter |
| Bố cục Add | src/pages/EmployeeAdd.jsx | className của Form.Group, thứ tự các nhóm |
| Bố cục View | src/pages/EmployeeDetails.jsx | Phần bên trong employee && (...) |
| Điều kiện nhập | src/utils/validateEmployee.js | Các câu if |
| Nội dung xác nhận xóa | src/components/EmployeeDelete.jsx | Nội dung bên trong DeleteModal |
| Tiêu đề/nút modal | src/components/DeleteModal.jsx | Confirmation, Yes, Close |
| URL backend | src/api/api.js | BASE_URL |
| Endpoint và phương thức | src/api/employeeApi.js | getData/postData/putData/deleteData |
| JSON danh sách | src/pages/EmployeesPage.jsx | setData(employees) |

## 3. Get All thêm một cột

Trong EmployeeList.jsx, ví dụ thêm Address trước Action:

```jsx
// Trong thead, trước th Action:
<th>Address</th>

// Trong tbody, cùng vị trí:
<td>{emp.address}</td>
```

Cả th và td phải cùng thứ tự. Kiểm tra API có trả address không.
Giữ nguyên ID thật từ JSON cho key, View và Delete; không lấy số thứ tự dòng làm ID.

Bảng chẵn/lẻ dùng `<Table striped ...>`. Dự án còn có màu tùy chỉnh trong
`.ems-table tbody tr:nth-child(even) td` ở index.css. Muốn bỏ màu xen kẽ, bỏ cả hai.

## 4. Add đổi một cột, hai cột hoặc số ô lẻ

Các Form.Group nằm trong `<div className="row g-3 mb-3">`.

| className trên Form.Group | Kết quả |
|---|---|
| col-12 | Một ô chiếm cả hàng |
| col-md-6 | Hai ô mỗi hàng từ màn hình vừa trở lên |
| col-md-4 | Ba ô mỗi hàng từ màn hình vừa trở lên |

Đề cho số ô lẻ: ô cuối `col-md-6` thì nằm nửa hàng; đổi thành `col-12` nếu đề cho trải hết hàng.
Điện thoại: col-md-6/col-md-4 tự xếp một cột. Muốn đảo thứ tự ô, di chuyển nguyên Form.Group.

Thêm ô Address vào Add cần sửa ba chỗ:

```jsx
// 1. Trong JSX của EmployeeAdd.jsx:
<Form.Group controlId="address" className="col-md-6">
  <Form.Label>Address *</Form.Label>
  <Form.Control name="address" isInvalid={!!errors.address} />
  <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
</Form.Group>
```

```js
// 2. Trong object data của EmployeeAdd.jsx:
address: form.address.value.trim(),

// 3. Trong validateEmployee.js, nếu đề bắt buộc:
if (!data.address) errors.address = "Address is required.";
```

Nếu ô không bắt buộc thì bỏ dấu * và kiểm tra required. Backend phải nhận trường address.
Đổi layout không cần sửa data hay validation. Đổi tên trường thì phải sửa cả ba chỗ.

## 5. View canh ngang, canh dọc hoặc hai cột

Hiện EmployeeDetails.jsx dùng bảng: một thông tin mỗi hàng, nhãn bên trái, giá trị bên phải.
Copy nguyên tr để thêm thông tin:

```jsx
<tr>
  <th>Address</th>
  <td>{employee.address}</td>
</tr>
```

Nếu đề dùng hai khối thông tin cạnh nhau, thay Table trong `employee && (...)` bằng:

```jsx
<div className="row g-3">
  <div className="col-md-6">
    <strong>Full Name</strong>
    <div>{employee.fullName}</div>
  </div>
  <div className="col-md-6">
    <strong>Email</strong>
    <div>{employee.email}</div>
  </div>
</div>
```

Copy khối col-md-6 cho các thông tin còn lại. Đổi thành col-12 để mỗi khối một hàng.
Mẫu trên là nhãn ở trên, giá trị ở dưới. Nếu nhãn và giá trị cùng hàng:

```jsx
<div className="col-md-6">
  <div className="row">
    <strong className="col-4">Full Name</strong>
    <span className="col-8">{employee.fullName}</span>
  </div>
</div>
```

Giữ nguyên useParams, useEffect, gọi getEmployeeById và nút Back.
Nếu bỏ Table thì bỏ Table khỏi import để lint không báo thừa.

## 6. API đổi dạng dữ liệu

Hiện GET list trả `{ content, totalPages, totalElements, ... }`: giữ `setData(employees)`.
Nếu API trả `{ data: { content, totalPages, totalElements } }`, sửa thành `setData(employees.data)`.
Nếu trả mảng `[...]`, phải xử lý phân trang theo API/đề; không giả định mảng có content hoặc totalPages.

GET có lọc/phân trang: tên tham số name, departmentId, page, size phải đúng Swagger.
Thay BASE_URL/endpoint không tự đổi tên trường: fullName, employeeId... vẫn cần kiểm tra JSON.

## 7. Thứ tự sửa khi thi

1. Xem URL, phương thức, tên ID, JSON trả về trong Swagger/Network.
2. Sửa api.js và employeeApi.js nếu khác đề cũ.
3. Sửa cột List và thông tin Details theo JSON.
4. Sửa ô Add, object data và validation theo đề.
5. Sửa bố cục col-12/col-md-6, header và màu trong CSS theo ảnh.
6. Thử Filter, phân trang, View, Add, Delete; kiểm tra vị trí thông báo.

Không cần thêm thư viện hoặc viết hệ thống layout dùng chung. Các ví dụ trong tài liệu là mẫu để thay khi đề yêu cầu, không phải chức năng mới của ứng dụng hiện tại.
