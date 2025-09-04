import React from 'react';

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  //   if (totalPages === 1) return null;

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {Array.from({ length: totalPages }).map((_, index) => {
        const page = index + 1;
        return (
          <button
            type="button"
            key={page}
            onClick={() => onPageChange(page)}
            style={{
              padding: '6px 12px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              backgroundColor: currentPage === page ? '#9382d3ff' : '#fff',
              color: currentPage === page ? '#fff' : '#9382d3ff',
              cursor: 'pointer',
            }}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
