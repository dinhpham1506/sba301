# SBA301 PE — Lỗi dễ sai và cách sửa nhanh

Bộ snippet `pe-*` là khung **chung**. Mỗi đề khác tên entity, field, câu thông báo, layout, nên luôn đối chiếu lại đề.

## A. Trang trắng (lỗi hay gặp nhất)
Build vẫn báo ✓ nhưng trình duyệt trắng. Xem lỗi ở **trình duyệt: F12 → Console**, không phải terminal.

| Triệu chứng | Nguyên nhân | Sửa |
|---|---|---|
| `X is not defined` | dùng `<Badge>` `<Table>` `<Row>` `<Col>` mà **chưa import** | dùng thẻ nào của react-bootstrap thì thêm tên đó vào dòng `import { ... } from "react-bootstrap"` |
| `cannot be redeclared` | **2 dòng import** react-bootstrap trùng tên | gộp còn 1 dòng |
| `does not provide an export named` | `import { X }` nhưng file viết `export default` | `export default` thì import **không có `{ }`** |
| `Failed to resolve import` | sai đường dẫn | từ `src/page/` tới `messages.js` ở gốc là `"../../messages"`; trong `App.jsx` phải có `./` (`"./page/MovieList"`) |
| `You cannot render a <Router> inside another <Router>` | có `BrowserRouter` ở cả `main.jsx` và `App.jsx` | chỉ giữ 1 cái (snippet để ở App.jsx) |
| `Cannot read properties of null` | dùng `item.title` khi API chưa trả về | bọc `{item && (...)}`, object lồng dùng `?.` |
| `setGenres is not defined` | đổi tên biến không hết | đổi tên bằng **F2 / chuột phải → Rename Symbol** (Mac: fn+F2) |

## B. Dữ liệu không hiện / sai
- **Tên field phải giống y JSON BE trả về**, kể cả chữ hoa. Xem `dto/XxxResponse.java`, Swagger, hoặc F12 → Network → Response. Đừng đọc `entity/`.
- Field là object `{ }` thì phải chấm thêm: `r.genre?.name`, không phải `r.genre` hay `r.genreName`.
- Dropdown dùng đúng field BE trả về: thường là `o.id`, `o.name`. Template cũ ghi `categoryId`/`categoryName` là sai với đề mới.
- **Tham số lọc**: tên bên trái dấu `:` phải bằng `@RequestParam` của BE (`title:` chứ không phải `name:`).
- API list trả `{ content: [...], totalPages, totalElements }` thì dùng `data.content`; trả thẳng mảng `[...]` thì dùng `data`.
- Trang List thì `id` lấy theo `r.id` (hoặc `r.movieId`, tuỳ BE).
- Lỗi BE `Invalid column name 'xxx_id'` là **DB còn bảng cũ**: chạy `database.sql` (drop bảng) rồi khởi động lại BE.
- Sửa `vite.config.js` thì phải **tắt `npm run dev` rồi chạy lại**.

## C. Bấm không chuyển trang
- `path` trong `App.jsx` phải **khớp** với `navigate(...)` và `<Link to=...>`. Snippet dùng `/add` và `/view/:id`; template cũ dùng `/movies/add`, `/movies/:id`. **Đừng trộn.**

## D. Mất điểm theo barem
| Barem | Dễ sai | Đúng |
|---|---|---|
| 1.1, 1.8 | thiếu cột `#`, số `th` ≠ số `td`, `colSpan` sai | `#` = `page * SIZE + i + 1`; `colSpan` = tổng số cột |
| 1.3 | câu "không có dữ liệu" tự đặt | dùng đúng mã MS của đề (FA26: MS05 "No records found.") |
| 1.5 | ô tìm kiếm không `trim()` | `keyword.trim() \|\| null` |
| 1.7 | phân trang vẫn hiện khi chỉ 1 trang | `if (totalPages <= 1) return null` |
| 2.4 | quên trim, maxLength, số nguyên, khoảng số, ngày | bảng `FIELDS` trong `pe-rules` |
| 2.5, 2.6 | lỗi không đỏ, không nằm dưới ô; lỗi trùng không hiện | `text-danger` dưới ô; 400 + `already exists` → MS09 |
| 2.8 | dropdown tự gõ cứng danh sách | dropdown entity **lấy từ API**; chỉ enum ("One of: ...") mới được gõ cứng |
| 3.3 | thông báo xoá sai màu / sai chỗ | đặt **ngay dưới tiêu đề**; màu theo đề (barem có đề ghi **đỏ**, có đề ghi xanh) |
| 4.4 | View lỗi API không báo | `.catch(() => setError(MS06))` |
| 5.2, 5.3 | còn chữ `Restaurant`, `category` từ template cũ: **−0.5** | tìm `Cmd+Shift+F` chữ cũ, đổi hết cả biến lẫn comment |
| 4d | dùng `alert()` | chỉ dùng `<Alert>` hoặc `<Modal>` |

## E. Câu thông báo (messages.js)
- **Mỗi đề đánh số MS khác nhau.** Luôn chép lại toàn bộ bảng Message List, kể cả dấu chấm cuối câu.
- Câu có `<X>` thì viết hàm `(x) => ...`; câu không có `<X>` thì viết chuỗi. Ví dụ FA26: MS07 là câu cố định.
- MS02 số biên viết theo đề: `30,000` (dùng `toLocaleString("en-US")`). Giá trong bảng là `90.000` (dùng `toLocaleString("vi-VN")`).

## F. Khác nhau giữa các đề, nhớ đọc kỹ
- Sau khi **Add thành công**: FA26 là **ở lại trang, hiện MS04, xoá trắng form**. Đề khác có thể bắt **quay về List**.
- Ngày: "must not be in the past" thì `notPast` (≥ hôm nay); "must be in future" thì `future` (> hôm nay).
- Ô lọc: **ngang 1 hàng** (FA26) hay **dọc, nhãn bên trái** (đề cũ).
- Cột Action: `View | Delete` hay `Delete | View`, theo đúng thứ tự trong đề.
- Màu link Delete: nếu `index.css` có `.page-box a { color: #000 }` thì `text-danger` không ăn.
- **className không có dấu chấm**: `className="text-danger"`, không phải `".text-danger"`.

## G. 3 loại lỗi 400 phải kiểm theo đúng thứ tự
1. có `errors: [...]` → lỗi từng ô (MS01/MS02/MS07)
2. `message` chứa `already exists` → MS09
3. 400 còn lại → MS03 (Malformed)

Nếu đặt `status === 400` lên đầu, cả 3 đều ra MS03.

## H. Trước khi nộp
- [ ] Bật BE trước, rồi `npm run dev`. Thử đủ: list, lọc, phân trang, view, back, add (lỗi + thành công + trùng), xoá.
- [ ] Đã cài `react-bootstrap bootstrap react-router-dom axios`, `main.jsx` có `import "bootstrap/dist/css/bootstrap.min.css"`.
- [ ] Tên folder: `<FullName>_<StudentID>_MTB_PE` (theo đề).
- [ ] Zip **bỏ `node_modules`**, nộp EOS.
