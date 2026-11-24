import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();
  return (
    <nav className="nav">
      <Link to="/" className="logo"><span>M</span>Mini CRM</Link>
      <div className="row">
        <Link to="/contact">Public form</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}