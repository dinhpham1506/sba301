// Header dùng chung cho mọi trang
export default function Header() {
  return (
    <div className="d-flex align-items-end border-bottom border-dark fw-bold px-2 pt-4">
      <span style={{ width: 120 }}>Logo</span>
      {/* ===== SỬA 2: tên hệ thống ===== */}
      <span className="flex-grow-1"> Employee Management</span>
      {/* en-CA cho ra định dạng yyyy-MM-dd */}
      <span className="fw-normal" style={{ fontFamily: "Times New Roman" }}>
        Date: {new Date().toLocaleDateString("en-CA")}
      </span>
    </div>
  );
}
