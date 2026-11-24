import { useCallback, useEffect, useState } from "react";
import api from "../api/client";
import type { Lead } from "../types/lead";
import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import LeadFilters from "../components/LeadFilters";
import LeadTable from "../components/LeadTable";
import Pagination from "../components/Pagination";
import { getError } from "../utils/getError";
import { exportCsv } from "../utils/exportCsv";

const PAGE_SIZE = 8;

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
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

  const changeStatus = (v: string) => { setStatus(v); setPage(1); };
  const changeSearch = (v: string) => { setSearch(v); setPage(1); };

  const q = search.toLowerCase();
  const visible = leads.filter(
    (l) =>
      (!status || l.status === status) &&
      (!q || l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q))
  );

  const pages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const pageItems = visible.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="page-head head-row">
          <div>
            <h1>Leads</h1>
            <p className="muted">Manage and track your client leads</p>
          </div>
          <button className="btn-light" disabled={!visible.length} onClick={() => exportCsv(visible)}>
            Export CSV
          </button>
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
            <LeadFilters status={status} search={search} onStatus={changeStatus} onSearch={changeSearch} />
            <LeadTable leads={pageItems} onChange={load} />
            <Pagination page={current} pages={pages} total={visible.length} onPage={setPage} />
          </>
        )}
      </div>
    </>
  );
}