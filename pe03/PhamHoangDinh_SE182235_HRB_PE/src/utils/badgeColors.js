// SỬA: màu badge. success=xanh lá, primary=xanh dương, danger=đỏ, warning=vàng, info=xanh nhạt, dark=đen, secondary=xám
// Tên bên trái phải viết đúng y như BE trả về
// [CLAUDE SỬA] key cũ là của đề Movie (Showing/Upcoming/Ended)
// -> đổi theo enum RoomStatus.java: Available | Occupied | Maintenance
export const STATUS_COLOR = { Available: "success", Occupied: "danger", Maintenance: "warning" };

// [CLAUDE SỬA] key cũ là RoomType (Double/Suite/Deluxe) -> đổi theo enum BedType.java: Single | Queen | King | Twin
// Màu bên phải Claude tự chọn, đề yêu cầu màu khác thì đổi bên phải
export const BED_TYPE_COLOR = { Single: "info", Queen: "primary", King: "dark", Twin: "success" };