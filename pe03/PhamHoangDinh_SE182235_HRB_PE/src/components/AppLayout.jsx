import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

// Khung chung: Header trên, Footer dưới, <Outlet /> = trang hiện tại
export default function AppLayout() {
  return (
    <div className="page-box">
      <Header />
      <Container fluid className="px-4 pb-3">
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}