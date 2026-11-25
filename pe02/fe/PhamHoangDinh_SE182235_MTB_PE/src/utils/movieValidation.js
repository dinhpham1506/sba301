import { MS01, MS02, MS03, MS07 } from "../../messages";

// ===================================================================
// SỬA: CHÉP TỪ BẢNG "Screen Definition" CỦA ĐỀ — mỗi dòng = 1 ô nhập
//   name     = tên field BE nhận (xem Swagger / MovieRequest.java)
//   label    = tên hiện trong câu lỗi
//   required = cột Mandatory = Yes
//   max      = cột Length (ô chữ)
//   number   = ô số (gửi lên BE dạng số)
//   min, maxValue = khoảng số trong cột Description
//   date     = ô ngày yyyy-MM-dd ; notPast = "Must not be in the past"
// Đề không có ô nào thì XOÁ dòng đó (và xoá ô đó bên AddMovie.jsx)
// ===================================================================
export const MOVIE_RULES = [
  { name: "title",       label: "Movie Title",  required: true, max: 150 },
  { name: "genreId",     label: "Genre",        required: true, number: true },
  { name: "director",    label: "Director",     required: true, max: 100 },
  { name: "duration",    label: "Duration",     required: true, number: true, min: 30, maxValue: 300 },
  { name: "ticketPrice", label: "Ticket Price", required: true, number: true, min: 30000, maxValue: 500000 },
  { name: "ageRating",   label: "Age Rating",   required: true },
  { name: "language",    label: "Language",     required: true, max: 50 },
  { name: "releaseDate", label: "Release Date", required: true, date: true, notPast: true },
];

// SỬA: dropdown cố định (đề ghi "One of: ..."). Đề không có thì xoá
export const AGE_RATINGS = ["P", "C13", "C16", "C18"];

// Form trống: { title: "", genreId: "", ... }
export const EMPTY_MOVIE = Object.fromEntries(MOVIE_RULES.map((r) => [r.name, ""]));

// ===== Không cần sửa bên dưới =====

// Kiểm tra cả form, trả về { tênField: "câu lỗi" }. Rỗng = hợp lệ
export function validateMovie(form) {
  const errors = {};
  const today = new Date().toLocaleDateString("en-CA"); // yyyy-MM-dd

  for (const r of MOVIE_RULES) {
    const v = String(form[r.name] ?? "").trim();

    if (!v) {
      if (r.required) errors[r.name] = MS01(r.label);
      continue;
    }
    if (r.max && v.length > r.max) {
      errors[r.name] = `${r.label} must be at most ${r.max} characters.`;
    }
    if (r.number && (r.min != null || r.maxValue != null)) {
      const n = Number(v);
      if (!/^\d+$/.test(v) || n < r.min || n > r.maxValue) {
        errors[r.name] = MS02(r.label, r.min.toLocaleString("en-US"), r.maxValue.toLocaleString("en-US"));
      }
    }
    if (r.date) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) errors[r.name] = MS03;
      else if (r.notPast && v < today) errors[r.name] = MS07;
    }
  }
  return errors;
}

// Dữ liệu gửi BE: bỏ dấu cách 2 đầu, ô số đổi sang Number
export function toMovieRequest(form) {
  return Object.fromEntries(
    MOVIE_RULES.map((r) => {
      const v = String(form[r.name] ?? "").trim();
      return [r.name, r.number ? Number(v) : v];
    })
  );
}
