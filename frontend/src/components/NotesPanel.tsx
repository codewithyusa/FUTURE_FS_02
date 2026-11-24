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
      <h3 style={{ marginBottom: 12 }}>Notes</h3>
      <form className="row" onSubmit={add}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a note..."
          style={{ flex: 1 }}
        />
        <button>Add</button>
      </form>
      {[...lead.notes].reverse().map((n) => (
        <p className="note" key={n._id}>
          {n.text}
          <small>{new Date(n.createdAt).toLocaleString()}</small>
        </p>
      ))}
      {!lead.notes.length && <p className="muted">No notes yet</p>}
    </div>
  );
}