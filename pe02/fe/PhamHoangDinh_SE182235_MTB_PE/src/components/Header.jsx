// Header dùng chung: thanh xanh, tên hệ thống + ngày (yyyy-MM-dd)
export default function Header() {
  return (
    <div className="app-header d-flex justify-content-between align-items-center px-4 py-3">
      {/* ===== SỬA 2: tên hệ thống ===== */}
      <span className="fw-bold">Movie Ticket Booking</span>
      <small>{new Date().toLocaleDateString("en-CA")}</small>
    </div>
  );
}

