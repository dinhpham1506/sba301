import { MS01, MS02, MS03, MS07 } from "../messages";

// ===================================================================
// ===== SỬA 1: CHÉP TỪ BẢNG "Screen Definition" CỦA ĐỀ — mỗi dòng = 1 ô =====
//   name     = tên field BE nhận (xem RoomRequest.java / Swagger)
//   label    = tên hiện trong câu lỗi
//   text     = chữ hiện trên ô (nếu khác label)
//   type     = "text" | "select" | "date" | "textarea"
//   required = cột Mandatory = Yes
//   max      = độ dài tối đa (ô chữ)
//   number   = ô số nguyên (gửi lên BE dạng số), min / maxValue = khoảng
//   pattern  = định dạng (sai -> MS03)
//   options  = dropdown cố định ; server = dropdown lấy từ API
//   notPast  = ngày không được ở quá khứ (MS07)
// ===================================================================
export const FIELDS = [
  { name: "roomNumber",    label: "Room Number",     type: "text",     required: true, pattern: /^R\d{3,4}$/, placeholder: "e.g. R101" },
  { name: "type",          label: "Room Type",       type: "select",   required: true, server: true },
  { name: "floor",         label: "Floor",           type: "text",     required: true, number: true, min: 1, maxValue: 50 },
  { name: "capacity",      label: "Capacity",        text: "Capacity (guests)",   type: "text", required: true, number: true, min: 1, maxValue: 6 },
  { name: "pricePerNight", label: "Price per Night", text: "Price per Night (đ)", type: "text", required: true, number: true, min: 300000, maxValue: 20000000 },
  { name: "bedType",       label: "Bed Type",        type: "select",   required: true, options: ["Single", "Queen", "King", "Twin"] },
  { name: "view",          label: "View",            type: "text",     max: 50 },
  { name: "availableFrom", label: "Available From",  type: "date",     required: true, notPast: true },
  { name: "description",   label: "Description",     type: "textarea", max: 255, col: 12 },
];

// Form trống: { roomNumber: "", type: "", ... }
export const EMPTY_FORM = Object.fromEntries(FIELDS.map((f) => [f.name, ""]));

// ===== Không cần sửa bên dưới =====

// "500,000" / "500.000" / "500 000" -> "500000" (chỉ bỏ dấu phân cách hàng nghìn; "1.5" giữ nguyên để báo lỗi)
function toDigits(v) {
  return /^\d{1,3}([.,\s]\d{3})+$/.test(v) ? v.replace(/[.,\s]/g, "") : v;
}

// Kiểm tra cả form, trả về { tênField: "câu lỗi" }. Rỗng = hợp lệ
export function validateForm(form) {
  const errors = {};
  const today = new Date().toLocaleDateString("en-CA"); // yyyy-MM-dd

  for (const f of FIELDS) {
    const v = String(form[f.name] ?? "").trim();

    if (!v) {
      if (f.required) errors[f.name] = MS01(f.label);
      continue;
    }
    if (f.max && v.length > f.max) {
      errors[f.name] = f.label + " must be at most " + f.max + " characters.";
    }
    if (f.pattern && !f.pattern.test(v)) {
      errors[f.name] = MS03;
    }
    if (f.number) {
      // "abc", "1.5", "-3" đều sai -> MS02, không gửi lên server
      const d = toDigits(v);
      const n = Number(d);
      if (!/^\d+$/.test(d) || n < f.min || n > f.maxValue) {
        errors[f.name] = MS02(f.label, f.min.toLocaleString("en-US"), f.maxValue.toLocaleString("en-US"));
      }
    }
    if (f.type === "date") {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) errors[f.name] = MS03;
      else if (f.notPast && v < today) errors[f.name] = MS07;
    }
  }
  return errors;
}

// Dữ liệu gửi BE: bỏ dấu cách 2 đầu, ô số đổi sang Number, ô không bắt buộc để trống thì gửi null
export function toRequest(form) {
  return Object.fromEntries(
    FIELDS.map((f) => {
      const v = String(form[f.name] ?? "").trim();
      if (!v) return [f.name, null];
      return [f.name, f.number ? Number(toDigits(v)) : v];
    })
  );
}
