import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/client";
import type { Lead } from "../types/lead";
import Navbar from "../components/Navbar";
import StatusBadge from "../components/StatusBadge";
import NotesPanel from "../components/NotesPanel";

export default function LeadDetailPage() {
  const { id } = useParams();
  const [lead, setLead] = useState<Lead | null>(null);

  const load = useCallback(async () => {
    const { data } = await api.get<Lead>(`/leads/${id}`);
    setLead(data);
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  if (!lead) return <p className="container">Loading...</p>;

  return (
    <>
      <Navbar />
      <div className="container">
        <Link to="/">← Back</Link>
        <div className="card" style={{ marginTop: 12 }}>
          <h2>{lead.name}</h2>
          <p>{lead.email} | {lead.phone || "no phone"} | {lead.source}</p>
          <StatusBadge status={lead.status} />
        </div>
        <NotesPanel lead={lead} onChange={load} />
      </div>
    </>
  );
}