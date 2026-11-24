import { useState, type ChangeEvent, type FormEvent } from "react";
import api from "../api/client";

export default function PublicContactPage() {
  const empty = { name: "", email: "", phone: "", source: "website" };
  const [form, setForm] = useState(empty);
  const [sent, setSent] = useState(false);

  const change = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    await api.post("/leads", form);
    setForm(empty);
    setSent(true);
  };

  return (
    <form className="card login" onSubmit={submit}>
      <h2>Contact us</h2>
      {sent && <p>Thanks! We will contact you soon.</p>}
      <input name="name" placeholder="Your name" value={form.name} onChange={change} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={change} required />
      <input name="phone" placeholder="Phone (optional)" value={form.phone} onChange={change} />
      <button>Send</button>
    </form>
  );
}