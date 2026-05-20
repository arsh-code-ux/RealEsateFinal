interface PaginationProps {
  currentPage: number
  totalPages: number
  onChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <div className="pagination">
      <button type="button" onClick={() => onChange(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
        Previous
      </button>
      {pages.map((page) => (
        <button
          type="button"
          key={page}
          className={page === currentPage ? 'active' : ''}
          onClick={() => onChange(page)}
        >
          {page}
        </button>
      ))}
      <button type="button" onClick={() => onChange(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  )
}
