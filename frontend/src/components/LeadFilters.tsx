interface Props {
  status: string;
  search: string;
  onStatus: (v: string) => void;
  onSearch: (v: string) => void;
}

export default function LeadFilters({
  status,
  search,
  onStatus,
  onSearch,
}: Props) {
  return (
    <div className="row" style={{ marginBottom: 16 }}>
      <input
        placeholder="Search name or email..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        style={{ flex: 1 }}
      />
      <select value={status} onChange={(e) => onStatus(e.target.value)}>
        <option value="">All statuses</option>
        <option value="new">new</option>
        <option value="contacted">contacted</option>
        <option value="converted">converted</option>
      </select>
    </div>
  );
}
