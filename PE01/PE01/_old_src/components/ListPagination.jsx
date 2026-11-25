import { Button } from "react-bootstrap";

// page đếm từ 0 theo BE; lúc hiển thị cộng 1 cho người dùng.
export default function ListPagination({ page, totalPages, totalElements, count, loading, onPageChange }) {
  // Đề yêu cầu ẩn toàn bộ thông tin phân trang khi chỉ có 0 hoặc 1 trang.
  if (totalPages <= 1) return null;

  return (
    <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center">
      <span role="status">Show {count} of {totalElements} records</span>
      <nav aria-label="Restaurant list pages" className="d-flex gap-2 align-items-center">
        <Button size="sm" variant="outline-secondary" disabled={loading || page === 0}
          onClick={() => onPageChange(page - 1)}>Previous</Button>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button key={index} size="sm"
            variant={page === index ? "secondary" : "outline-secondary"}
            aria-label={`Page ${index + 1}`} aria-current={page === index ? "page" : undefined}
            disabled={loading} onClick={() => onPageChange(index)}>
            {index + 1}
          </Button>
        ))}
        <Button size="sm" variant="outline-secondary" disabled={loading || page + 1 >= totalPages}
          onClick={() => onPageChange(page + 1)}>Next</Button>
      </nav>
    </div>
  );
}
