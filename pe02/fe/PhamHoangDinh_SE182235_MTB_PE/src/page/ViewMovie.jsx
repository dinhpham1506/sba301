  import { useEffect, useState } from "react";
  import { Alert, Badge, Button, Table } from "react-bootstrap";
  import { useNavigate, useParams } from "react-router-dom";
  import { getMovieById } from "../api/movie";
  import { MS06 } from "../../messages";
  import { GENRE_COLOR, STATUS_COLOR } from "../utils/badgeColors";

  export default function MovieView() {
    const { id } = useParams(); // lấy id trên đường dẫn /view/:id
    const navigate = useNavigate();
    const [item, setItem] = useState(null); // phim đang xem
    const [error, setError] = useState("");

    useEffect(() => {
      getMovieById(id)
        .then((data) => setItem(data))
        .catch(() => setError(MS06));
    }, [id]);

    return (
      <>
        <h6 className="fw-bold mt-3 pb-2 border-bottom">Movie Details</h6>
        {error && <Alert variant="danger" className="py-2">{error}</Alert>}

        {item && (
          <Table className="mt-2">
            <tbody>
              <tr><td className="text-muted fw-semibold" style={{ width: "25%" }}>Movie Title</td><td>{item.title}</td></tr>
              <tr><td className="text-muted fw-semibold">Genre</td><td><Badge bg={GENRE_COLOR[item.genre?.name] || "secondary"}>{item.genre?.name}</Badge></td></tr>
              <tr><td className="text-muted fw-semibold">Director</td><td>{item.director}</td></tr>
              <tr><td className="text-muted fw-semibold">Duration (min)</td><td>{item.duration}</td></tr>
              <tr><td className="text-muted fw-semibold">Ticket Price (đ)</td><td>{item.ticketPrice?.toLocaleString("vi-VN")}</td></tr>
              <tr><td className="text-muted fw-semibold">Release Date</td><td>{item.releaseDate}</td></tr>
              <tr><td className="text-muted fw-semibold">Age Rating</td><td>{item.ageRating}</td></tr>
              <tr><td className="text-muted fw-semibold">Language</td><td>{item.language}</td></tr>
              <tr><td className="text-muted fw-semibold">Status</td><td><Badge bg={STATUS_COLOR[item.status] || "secondary"}>{item.status}</Badge></td></tr>
            </tbody>
          </Table>
        )}

        <Button size="sm" className="btn-add mt-2" onClick={() => navigate("/")}>← Back</Button>
      </>
    );
  }
