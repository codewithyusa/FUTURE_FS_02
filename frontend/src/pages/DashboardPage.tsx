import { useCallback, useEffect, useState } from "react";
import api from "../api/client";
import type { Lead } from "../types/lead";
import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import LeadFilters from "../components/LeadFilters";
import LeadTable from "../components/LeadTable";
import { getError } from "../utils/getError";

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      const { data } = await api.get<Lead[]>("/leads");
      setLeads(data);
      setError("");
    } catch (err) {
      setError(getError(err, "Could not load leads"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const q = search.toLowerCase();
  const visible = leads.filter(
    (l) =>
      (!status || l.status === status) &&
      (!q || l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q))
  );

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="page-head">
          <h1>Leads</h1>
          <p className="muted">Manage and track your client leads</p>
        </div>

        {loading ? (
          <div className="center"><div className="spinner" /></div>
        ) : error ? (
          <div className="card">
            <p className="error">{error}</p>
            <button style={{ marginTop: 12 }} onClick={load}>Retry</button>
          </div>
        ) : (
          <>
            <StatsCards leads={leads} />
            <LeadFilters status={status} search={search} onStatus={setStatus} onSearch={setSearch} />
            <LeadTable leads={visible} onChange={load} />
          </>
        )}
      </div>
    </>
  );
}