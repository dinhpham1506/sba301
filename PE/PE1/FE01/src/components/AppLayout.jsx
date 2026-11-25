import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function AppLayout() {
  return (
    <div className="app-layout">
      <Header />
      <main className="ems-main">
        {/* ĐỔI KHUNG: Container fluid = rộng toàn màn; py-3 = khoảng cách trên/dưới. */}
        <Container className="py-3">
          {/* Page hiện tại nằm ở đây. Không chép Header/Footer vào từng page. */}
          <Outlet />
        </Container>
      </main>
      <Footer />
    </div>
  );
}
