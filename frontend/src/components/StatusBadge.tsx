import type { LeadStatus } from "../types/lead";

export default function StatusBadge({ status }: { status: LeadStatus }) {
  return <span className={`badge ${status}`}>{status}</span>;
}
