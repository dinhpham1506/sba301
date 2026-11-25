import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    // ĐỔI HEADER: sửa tên hệ thống bên dưới; màu/chiều cao sửa .ems-header trong index.css.
    <Navbar className="ems-header">
      {/* justify-content-between: tên bên trái, ngày bên phải. Đổi class này nếu đề đổi vị trí. */}
      <Container className="d-flex flex-wrap justify-content-between">
        <Navbar.Brand as={Link} to="/employees" className="text-white fw-bold text-wrap">
          Employee Management System
        </Navbar.Brand>
        <span className="text-white">{new Date().toLocaleDateString("en-CA")}</span>
      </Container>
    </Navbar>
  );
}
