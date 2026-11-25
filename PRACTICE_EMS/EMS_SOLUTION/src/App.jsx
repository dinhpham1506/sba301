// BÀI GIẢI MẪU – đề luyện EMS (Employee Management)
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import EmployeeList from "./page/EmployeeList";
import EmployeeDetails from "./page/EmployeeDetails";
import AddEmployee from "./page/AddEmployee";
import UpdateEmployeeStatus from "./page/UpdateEmployeeStatus";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<EmployeeList />} />
          <Route path="employees/add" element={<AddEmployee />} />
          <Route path="employees/:id" element={<EmployeeDetails />} />
          <Route path="employees/:id/status" element={<UpdateEmployeeStatus />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
