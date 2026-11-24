import { useState, type FormEvent } from "react";
import api from "../api/client";
import type { Lead } from "../types/lead";

interface Props {
  lead: Lead;
  onChange: () => void;
}

export default function NotesPanel({ lead, onChange }: Props) {
  const [text, setText] = useState("");

  const add = async (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    await api.post(`/leads/${lead._id}/notes`, { text });
    setText("");
    onChange();
  };

  return (
    <div className="card">
      <h3>Notes</h3>
      <form className="row" onSubmit={add}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a note..." />
        <button>Add</button>
      </form>
      {[...lead.notes].reverse().map((n) => (
        <p key={n._id}>
          {n.text} <small>{new Date(n.createdAt).toLocaleString()}</small>
        </p>
      ))}
    </div>
  );
}