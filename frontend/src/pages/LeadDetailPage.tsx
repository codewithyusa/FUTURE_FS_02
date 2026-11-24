import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/client";
import type { Lead } from "../types/lead";
import Navbar from "../components/Navbar";
import StatusBadge from "../components/StatusBadge";
import NotesPanel from "../components/NotesPanel";
import { getError } from "../utils/getError";

export default function LeadDetailPage() {
  const { id } = useParams();
  const [lead, setLead] = useState<Lead | null>(null);
  const [error, setError] = useState("");

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
          <div className="center"><div className="spinner" /></div>
        ) : (
          <>
            <div className="card" style={{ marginTop: 12 }}>
              <div className="row" style={{ justifyContent: "space-between" }}>
                <div className="row">
                  <span className="avatar">{lead.name.charAt(0).toUpperCase()}</span>
                  <h2>{lead.name}</h2>
                </div>
                <StatusBadge status={lead.status} />
              </div>
              <p className="muted">{lead.email} | {lead.phone || "no phone"} | {lead.source}</p>
              <p className="muted">Added {new Date(lead.createdAt).toLocaleString()}</p>
            </div>
            <NotesPanel lead={lead} onChange={load} />
          </>
        )}
      </div>
    </>
  );
}