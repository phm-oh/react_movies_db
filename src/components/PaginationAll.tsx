import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PaginationAll: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const pagesToShow = 5; // จำนวนหน้าที่แสดงใน pagination
  const pages = Array.from({ length: Math.min(totalPages, pagesToShow) }, (_, index) => index + 1);

  return (
    <nav className='pagination'>
      {currentPage > 1 && (
        <div className='pagecontainer' onClick={() => onPageChange(currentPage - 1)}>
          &lt;=
        </div>
      )}

      {pages.map((page) => (
        <div
          key={page}
          className={`pagecontainer ${page === currentPage ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </div>
      ))}

      {currentPage < totalPages && (
        <div className='pagecontainer' onClick={() => onPageChange(currentPage + 1)}>
          =&gt;
        </div>
      )}
    </nav>
  );
};

export default PaginationAll;
