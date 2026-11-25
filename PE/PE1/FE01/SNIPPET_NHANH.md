# Gõ tắt code trong VS Code

Mở cả thư mục FE01 bằng File → Open Folder. Mẫu nằm trong `.vscode/fe-exam.code-snippets`.
Các mẫu hoạt động trong file `.js` và `.jsx` của project này.

1. Đặt con trỏ vào chỗ trống, gõ `apiget` rồi nhấn Tab.
2. Điền tên hàm, nhấn Tab để tới đường dẫn.
3. Điền đường dẫn, nhấn Tab để kết thúc. Shift + Tab để quay lại ô trước.

Nếu Tab chưa chèn mẫu: nhấn Ctrl + Space, chọn snippet rồi Enter.
Trên Mac nếu Ctrl + Space bị hệ điều hành dùng: Command Palette → Insert Snippet → chọn mẫu.

| Gõ | Mẫu được chèn |
|---|---|
| apibase | File API Axios chung, đổi BASE_URL |
| apiimport | Import các hàm API; bỏ hàm không dùng để tránh lint |
| apiget | GET danh sách có params |
| apigetid | GET chi tiết theo ID |
| apipost | POST thêm |
| apiput | PUT cập nhật |
| apipatch | PATCH cập nhật một phần, chỉ dùng nếu backend hỗ trợ |
| apidelete | DELETE theo ID |
| apicrud | File API đầy đủ cho một đối tượng |

## Ví dụ gặp đề Product

Tạo file `src/api/productApi.js`, gõ `apicrud` → Tab:

- Ô 1: giữ `./api` nếu file API chung là `src/api/api.js`.
- Ô 2: đổi Employee thành Product. Tên các hàm đổi cùng lúc.
- Ô 3: đổi /employees thành /products. Mọi endpoint đổi cùng lúc.

Mẫu tạo các hàm getProductList, getProductById, createProduct, updateProduct, deleteProduct.
Tên hàm chỉ là tên mình đặt; trang nào sử dụng thì import đúng tên đó.

`apibase` và `apicrud` dùng trong file trống, không chèn thêm vào file đã có các hàm trùng tên.
Các snippet lẻ như apiget không tự import getData; thêm import ở đầu file nếu chưa có.
Snippet chỉ chèn văn bản, không tự gọi API hoặc thay đổi dữ liệu backend.

## Mang sang project khác

Copy cả `.vscode/fe-exam.code-snippets` và `.vscode/settings.json` sang thư mục project mới.
Nếu project đó đã có settings.json thì chỉ thêm hai thiết lập editor, không ghi đè file cũ.
Hiện `.vscode` bị .gitignore bỏ qua, nên khi copy bài nhớ mang theo thư mục này.

## Tự sửa mẫu

Mở `.vscode/fe-exam.code-snippets`:

- prefix: từ gõ tắt, ví dụ apiget.
- body: các dòng code sẽ chèn.
- `${1:getEmployees}`: vị trí Tab đầu tiên, giá trị mặc định getEmployees.
- `${2:/employees}`: vị trí Tab thứ hai.
- `$0`: vị trí con trỏ cuối cùng.
