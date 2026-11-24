import type { Lead } from "../types/lead";

const cell = (v: string) => {
  const safe = /^[=+\-@]/.test(v) ? `'${v}` : v;
  return `"${safe.replace(/"/g, '""')}"`;
};

export function exportCsv(leads: Lead[]) {
  const header = ["Name", "Email", "Phone", "Source", "Status", "Created"];
  const rows = leads.map((l) =>
    [l.name, l.email, l.phone ?? "", l.source, l.status, new Date(l.createdAt).toISOString()]
      .map(cell)
      .join(",")
  );
  const blob = new Blob([[header.join(","), ...rows].join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "leads.csv";
  a.click();
  URL.revokeObjectURL(url);
}