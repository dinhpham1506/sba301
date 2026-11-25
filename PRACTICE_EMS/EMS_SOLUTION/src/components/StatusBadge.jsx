import { Badge } from "react-bootstrap";

// Mỗi trạng thái (enum) một màu. Muốn đổi màu: đổi bg ở đây.
const COLORS = {
  ACTIVE: { bg: "success" }, // xanh lá
  ON_LEAVE: { bg: "warning", text: "dark" }, // cam
  RESIGNED: { bg: "secondary" }, // xám
};

export default function StatusBadge({ status }) {
  const color = COLORS[status] || { bg: "light", text: "dark" };
  return <Badge bg={color.bg} text={color.text}>{status}</Badge>;
}
