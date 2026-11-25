export default function Header() {
  const today = new Date();
  const date = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  return (
    <header className="ems-header">
      {/* ĐỔI LOGO: thay chữ này bằng <img src="/logo.png" alt="Logo" /> nếu có ảnh. */}
      <span className="ems-header-logo">Logo</span>

      {/* ĐỔI TÊN HỆ THỐNG tại đây. */}
      <span className="ems-header-title">Restaurant Management</span>

      {/* Ngày hiện tại theo định dạng yyyy-MM-dd. */}
      <span className="ems-header-date">Date: <time dateTime={date}>{date}</time></span>
    </header>
  );
}
