import { Link } from "react-router-dom";
import api from "../api/client";
import type { Lead, LeadStatus } from "../types/lead";
import StatusBadge from "./StatusBadge";

interface Props {
  leads: Lead[];
  onChange: () => void;
}

export default function LeadTable({ leads, onChange }: Props) {
  const setStatus = async (id: string, status: LeadStatus) => {
    await api.patch(`/leads/${id}`, { status });
    onChange();
  };

  const remove = async (id: string) => {
    if (confirm("Delete this lead?")) {
      await api.delete(`/leads/${id}`);
      onChange();
    }
  };

  return (
    <table>
      <thead>
        <tr><th>Name</th><th>Email</th><th>Source</th><th>Status</th><th></th></tr>
      </thead>
      <tbody>
        {leads.map((l) => (
          <tr key={l._id}>
            <td><Link to={`/leads/${l._id}`}>{l.name}</Link></td>
            <td>{l.email}</td>
            <td>{l.source}</td>
            <td>
              <StatusBadge status={l.status} />{" "}
              <select value={l.status} onChange={(e) => setStatus(l._id, e.target.value as LeadStatus)}>
                <option value="new">new</option>
                <option value="contacted">contacted</option>
                <option value="converted">converted</option>
              </select>
            </td>
            <td><button className="danger" onClick={() => remove(l._id)}>Delete</button></td>
          </tr>
        ))}
        {!leads.length && <tr><td colSpan={5}>No leads found</td></tr>}
      </tbody>
    </table>
  );
}