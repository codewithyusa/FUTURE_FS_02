import { useCallback, useEffect, useState } from "react";
import api from "../api/client";
import type { Lead } from "../types/lead";
import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import LeadFilters from "../components/LeadFilters";
import LeadTable from "../components/LeadTable";

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const load = useCallback(async () => {
    const { data } = await api.get<Lead[]>("/leads");
    setLeads(data);
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
        <StatsCards leads={leads} />
        <LeadFilters status={status} search={search} onStatus={setStatus} onSearch={setSearch} />
        <LeadTable leads={visible} onChange={load} />
      </div>
    </>
  );
}