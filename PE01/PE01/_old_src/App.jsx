import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import RestaurantList from "./pages/RestaurantList";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<RestaurantList />} />
          <Route path="restaurants" element={<RestaurantList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
