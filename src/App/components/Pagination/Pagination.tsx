import React from 'react';
import './Pagination.css';

type PaginationProps = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isRace?: boolean;
};

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  isRace,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goPrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const goNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="container">
      <button
        type="button"
        onClick={goPrev}
        disabled={currentPage === 1 || isRace}
        className="button"
      >
        Prev
      </button>

      <span className="page">Page {currentPage}</span>

      <button
        type="button"
        onClick={goNext}
        disabled={currentPage === totalPages || isRace}
        className="button"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
