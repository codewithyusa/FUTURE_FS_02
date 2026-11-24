import type { Lead } from "../types/lead";

export default function StatsCards({ leads }: { leads: Lead[] }) {
  const count = (s: string) => leads.filter((l) => l.status === s).length;
  const items = [
    { label: "Total leads", value: leads.length, cls: "" },
    { label: "New", value: count("new"), cls: "new" },
    { label: "Contacted", value: count("contacted"), cls: "contacted" },
    { label: "Converted", value: count("converted"), cls: "converted" },
  ];
  return (
    <div className="stats">
      {items.map((i) => (
        <div className={`card stat ${i.cls}`} key={i.label}>
          <small>{i.label}</small>
          <h2>{i.value}</h2>
        </div>
      ))}
    </div>
  );
}
