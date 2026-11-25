import { Outlet, Link } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";

export default function AppLayout() {
  const today = new Date().toLocaleDateString("en-GB");

  return (
    <div className="app-layout">
      <Navbar className="border-bottom bg-light">
        <Container>
          <Navbar.Brand as={Link} to="/">Logo</Navbar.Brand>
          <span>Date: {today}</span>
        </Container>
      </Navbar>

      <Container className="py-4">
        <Outlet />
      </Container>

      <footer className="border-top py-3 text-center">@Copyright 2026</footer>
    </div>
  );
}
