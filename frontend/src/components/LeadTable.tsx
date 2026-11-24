import { Link } from "react-router-dom";
import api from "../api/client";
import type { Lead, LeadStatus } from "../types/lead";
import StatusBadge from "./StatusBadge";
import { useToast } from "../context/ToastContext";
import { getError } from "../utils/getError";

interface Props {
  leads: Lead[];
  onChange: () => void;
}

export default function LeadTable({ leads, onChange }: Props) {
  const { notify } = useToast();

  const setStatus = async (id: string, status: LeadStatus) => {
    try {
      await api.patch(`/leads/${id}`, { status });
      notify("Status updated");
      onChange();
    } catch (err) {
      notify(getError(err), "error");
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    try {
      await api.delete(`/leads/${id}`);
      notify("Lead deleted");
      onChange();
    } catch (err) {
      notify(getError(err), "error");
    }
  };

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Source</th>
            <th>Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {leads.map((l) => (
            <tr key={l._id}>
              <td>
                <Link to={`/leads/${l._id}`}>
                  <span className="avatar">{l.name.charAt(0).toUpperCase()}</span>
                  {l.name}
                </Link>
              </td>
              <td>{l.email}</td>
              <td>{l.source}</td>
              <td>{new Date(l.createdAt).toLocaleDateString()}</td>
              <td>
                <div className="row">
                  <StatusBadge status={l.status} />
                  <select value={l.status} onChange={(e) => setStatus(l._id, e.target.value as LeadStatus)}>
                    <option value="new">new</option>
                    <option value="contacted">contacted</option>
                    <option value="converted">converted</option>
                  </select>
                </div>
              </td>
              <td>
                <button className="danger" onClick={() => remove(l._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {!leads.length && (
            <tr>
              <td colSpan={6} className="empty">No leads found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}