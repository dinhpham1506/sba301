// ĐỔI VALIDATION: sửa required, độ dài, tuổi, lương theo đề.
// errors.tenTruong phải khớp errors.tenTruong dưới ô nhập trong EmployeeAdd.jsx.
// Ô không bắt buộc: chỉ kiểm tra định dạng khi người dùng đã nhập.
// Các điều kiện hiện tại dựa trên DTO backend.
export function validateEmployee(data) {
  const errors = {};
  const today = new Date();
  const adultDate = new Date();
  adultDate.setFullYear(today.getFullYear() - 18);
  const birthday = new Date(data.dateOfBirth + "T00:00:00");
  const startDate = new Date(data.startDate + "T00:00:00");

  if (!data.fullName) errors.fullName = "Full Name is required.";
  else if (data.fullName.length > 100) errors.fullName = "Full Name must not exceed 100 characters.";

  if (!data.email) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Email is invalid.";
  else if (data.email.length > 100) errors.email = "Email must not exceed 100 characters.";

  if (!data.phone) errors.phone = "Phone is required.";
  else if (!/^\d{9,11}$/.test(data.phone)) errors.phone = "Phone must contain 9–11 digits.";

  if (!data.position) errors.position = "Position is required.";
  else if (data.position.length > 100) errors.position = "Position must not exceed 100 characters.";

  if (!data.departmentId) errors.departmentId = "Department is required.";

  if (!data.dateOfBirth) errors.dateOfBirth = "Date of Birth is required.";
  else if (Number.isNaN(birthday.getTime())) errors.dateOfBirth = "Date of Birth is invalid.";
  else if (birthday > adultDate) errors.dateOfBirth = "Employee must be at least 18 years old.";

  if (!data.startDate) errors.startDate = "Start Date is required.";
  else if (Number.isNaN(startDate.getTime())) errors.startDate = "Start Date is invalid.";
  else if (startDate > today) errors.startDate = "Start Date must not be in the future.";

  if (!Number.isInteger(data.salary) || data.salary < 1000000 || data.salary > 100000000) {
    errors.salary = "Salary must be a whole number from 1,000,000 to 100,000,000 VND.";
  }

  return errors;
}
