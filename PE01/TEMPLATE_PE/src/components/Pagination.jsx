import { Button } from "react-bootstrap";

// Phân trang (không cần sửa). page đếm từ 0, hiển thị cộng 1.
// count = số dòng trang này, total = tổng số dòng, onChange(p) = chuyển sang trang p
export default function Pagination({ page, totalPages, count, total, onChange }) {
  // Đề: chỉ có 1 trang thì không hiện phân trang
  if (totalPages <= 1) return null;

  // variant="link" = nút trông như link chữ thường, giống hình "Previous 1, 2, 3 .... Next"
  const style = { color: "#000", padding: "0 4px", fontFamily: "Times New Roman" };

  return (
    <div className="d-flex justify-content-between align-items-center mt-3">
      <span className="fs-5">Show {count} of {total} records</span>
      <span>
        <Button variant="link" size="sm" style={style} disabled={page === 0} onClick={() => onChange(page - 1)}>
          Previous
        </Button>
        {[...Array(totalPages).keys()].map((p) => (
          <Button key={p} variant="link" size="sm" style={style} className={p === page ? "fw-bold" : ""} onClick={() => onChange(p)}>
            {p + 1}
          </Button>
        ))}
        <Button variant="link" size="sm" style={style} disabled={page === totalPages - 1} onClick={() => onChange(page + 1)}>
          Next
        </Button>
      </span>
    </div>
  );
}
