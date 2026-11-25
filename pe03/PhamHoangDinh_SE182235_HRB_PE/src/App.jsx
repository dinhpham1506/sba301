import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import RoomList from "./page/RoomList";
import ViewRoom from "./page/ViewRoom";
import AddRoom from "./page/AddRoom";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<RoomList />} />
           <Route path="add" element={<AddRoom />} />
          <Route path="rooms/:id" element={<ViewRoom />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}