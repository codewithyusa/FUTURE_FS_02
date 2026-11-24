import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      nav("/");
    } catch (err) {
      setError(
        isAxiosError(err)
          ? (err.response?.data?.message ?? "Login failed")
          : "Login failed",
      );
    }
  };

  return (
    <div className="auth-page">
      <form className="card auth-card" onSubmit={submit}>
        <div className="logo">
          <span>M</span>Mini CRM
        </div>
        <div>
          <h2>Welcome back</h2>
          <p className="muted">Sign in to manage your leads</p>
        </div>
        {error && <p className="error">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button>Sign in</button>
      </form>
    </div>
  );
}
