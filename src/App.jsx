import { Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";
import ShoesList from "./ShoesList";
import AddShoe from "./AddShoe";
import ShoeDetail from "./ShoeDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<ShoesList />} />
        <Route path="shoes/add" element={<AddShoe />} />
        <Route path="shoes/:id" element={<ShoeDetail />} />
      </Route>
    </Routes>
  );
}
