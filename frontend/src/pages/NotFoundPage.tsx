import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="auth-page">
      <div className="card auth-card" style={{ textAlign: "center" }}>
        <h2>404</h2>
        <p className="muted">Page not found</p>
        <Link to="/">Go to dashboard</Link>
      </div>
    </div>
  );
}
