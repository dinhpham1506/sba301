import { Pagination as BsPagination } from "react-bootstrap";

// page đếm từ 0. Chỉ 1 trang thì ẩn (đề)
export default function Pagination({ page, totalPages, total, onChange }) {
  if (totalPages <= 1) return null;
  return (
    <div className="d-flex justify-content-between align-items-center mt-2">
      <small className="text-muted">Page {page + 1} / {totalPages} ({total} records)</small>
      <BsPagination size="sm" className="mb-0">
        <BsPagination.Prev disabled={page === 0} onClick={() => onChange(page - 1)} />
        {[...Array(totalPages).keys()].map((p) => (
          <BsPagination.Item key={p} active={p === page} onClick={() => onChange(p)}>{p + 1}</BsPagination.Item>
        ))}
        <BsPagination.Next disabled={page === totalPages - 1} onClick={() => onChange(page + 1)} />
      </BsPagination>
    </div>
  );
}