import { useState, type ChangeEvent, type FormEvent } from "react";
import api from "../api/client";
import { useToast } from "../context/ToastContext";
import { getError } from "../utils/getError";

export default function PublicContactPage() {
  const empty = { name: "", email: "", phone: "", source: "website" };
  const [form, setForm] = useState(empty);
  const [sending, setSending] = useState(false);
  const { notify } = useToast();

  const change = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await api.post("/leads", form);
      setForm(empty);
      notify("Thanks! We will contact you soon.");
    } catch (err) {
      notify(getError(err), "error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="card auth-card" onSubmit={submit}>
        <div className="logo">
          <span>M</span>Mini CRM
        </div>
        <div>
          <h2>Contact us</h2>
          <p className="muted">
            Leave your details and we will get back to you
          </p>
        </div>
        <input
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={change}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={change}
          required
        />
        <input
          name="phone"
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={change}
        />
        <button disabled={sending}>
          {sending ? "Sending..." : "Send message"}
        </button>
      </form>
    </div>
  );
}
