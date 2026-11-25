import { useState } from "react";
import DeleteModal from "./DeleteModal";
import { deleteEmployee } from "../api/employeeApi";

// File riêng xử lý xóa, được mở ngay trên trang List.
export default function EmployeeDelete({ employee, onClose, onSuccess, onError }) {
  const [saving, setSaving] = useState(false);

  async function handleDelete() {
    if (saving) return;
    setSaving(true);
    try {
      // ĐỔI ID: employeeId phải đúng tên khóa JSON của đề.
      await deleteEmployee(employee.employeeId);
      onSuccess();
    } catch {
      onError("Internal system error, please contact the administrator.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <DeleteModal onClose={onClose} onDelete={handleDelete} saving={saving}>
      {/* ĐỔI CÂU HỎI/TÊN: chỉnh ở đây; nút Yes/Close nằm trong DeleteModal.jsx. */}
      <p>Are you sure you want to delete employee <strong>"{employee.fullName}"</strong>?</p>
      <p className="text-secondary mb-0">This action cannot be undone.</p>
    </DeleteModal>
  );
}
