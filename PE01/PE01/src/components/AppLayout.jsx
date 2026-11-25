import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

// Khung chung cho mọi trang: Header ở trên, Footer ở dưới.
// <Outlet /> = chỗ hiện trang hiện tại (RestaurantList, RestaurantDetails, AddRestaurant).
export default function AppLayout() {
  return (
    // page-box = khung viền bao cả trang (index.css)
    <div className="page-box">
      <Header />
      <Container fluid className="px-4 pb-3">
        <Outlet />
      </Container>
      <Footer />
    </div>
  );
}
