interface Props {
  page: number;
  pages: number;
  total: number;
  onPage: (p: number) => void;
}

export default function Pagination({ page, pages, total, onPage }: Props) {
  if (total === 0) return null;
  return (
    <div className="pagination">
      <small className="muted">
        {total} lead{total !== 1 ? "s" : ""}
      </small>
      <div className="row">
        <button
          className="btn-light"
          disabled={page <= 1}
          onClick={() => onPage(page - 1)}
        >
          Previous
        </button>
        <span>
          Page {page} of {pages}
        </span>
        <button
          className="btn-light"
          disabled={page >= pages}
          onClick={() => onPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
