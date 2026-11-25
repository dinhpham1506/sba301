import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import EmployeesPage from "./pages/EmployeesPage";
import EmployeeAdd from "./pages/EmployeeAdd";
import EmployeeDetails from "./pages/EmployeeDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<EmployeesPage />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/employees/new" element={<EmployeeAdd />} />
          <Route path="/employees/:id" element={<EmployeeDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
