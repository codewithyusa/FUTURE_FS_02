import type { Lead } from "../types/lead";

export default function StatsCards({ leads }: { leads: Lead[] }) {
  const count = (s: string) => leads.filter((l) => l.status === s).length;
  const items = [
    ["Total", leads.length],
    ["New", count("new")],
    ["Contacted", count("contacted")],
    ["Converted", count("converted")],
  ];
  return (
    <div className="stats">
      {items.map(([label, value]) => (
        <div className="card stat" key={label}>
          <small>{label}</small>
          <h2>{value}</h2>
        </div>
      ))}
    </div>
  );
}