import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/client";
import type { Lead } from "../types/lead";
import Navbar from "../components/Navbar";
import StatusBadge from "../components/StatusBadge";
import NotesPanel from "../components/NotesPanel";
import { useToast } from "../context/ToastContext";
import { getError } from "../utils/getError";

export default function LeadDetailPage() {
  const { id } = useParams();
  const { notify } = useToast();
  const [lead, setLead] = useState<Lead | null>(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const load = useCallback(async () => {
    try {
      const { data } = await api.get<Lead>(`/leads/${id}`);
      setLead(data);
      setError("");
    } catch (err) {
      setError(getError(err, "Could not load lead"));
    }
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const startEdit = () => {
    if (!lead) return;
    setForm({ name: lead.name, email: lead.email, phone: lead.phone ?? "" });
    setEditing(true);
  };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await api.patch(`/leads/${id}`, form);
      notify("Lead updated");
      setEditing(false);
      load();
    } catch (err) {
      notify(getError(err), "error");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <Link to="/">← Back to leads</Link>

        {error ? (
          <div className="card" style={{ marginTop: 12 }}>
            <p className="error">{error}</p>
          </div>
        ) : !lead ? (
          <div className="center">
            <div className="spinner" />
          </div>
        ) : (
          <>
            <div className="card" style={{ marginTop: 12 }}>
              {editing ? (
                <form className="row" onSubmit={save}>
                  <input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Name"
                    required
                  />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder="Email"
                    required
                  />
                  <input
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    placeholder="Phone"
                  />
                  <button>Save</button>
                  <button
                    type="button"
                    className="btn-light"
                    onClick={() => setEditing(false)}
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <div
                    className="row"
                    style={{ justifyContent: "space-between" }}
                  >
                    <div className="row">
                      <span className="avatar">
                        {lead.name.charAt(0).toUpperCase()}
                      </span>
                      <h2>{lead.name}</h2>
                    </div>
                    <div className="row">
                      <StatusBadge status={lead.status} />
                      <button className="btn-light" onClick={startEdit}>
                        Edit
                      </button>
                    </div>
                  </div>
                  <p className="muted">
                    {lead.email} | {lead.phone || "no phone"} | {lead.source}
                  </p>
                  <p className="muted">
                    Added {new Date(lead.createdAt).toLocaleString()}
                  </p>
                </>
              )}
            </div>
            <NotesPanel lead={lead} onChange={load} />
          </>
        )}
      </div>
    </>
  );
}
