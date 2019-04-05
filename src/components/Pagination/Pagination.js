import React from 'react';

import './Pagination.css';

const Pagination = ({ action, totalItems, currentPage }) => {
  const totalPages = Math.floor(totalItems / 30);
  const pages = [...Array(totalPages).keys()];
  const prevClassName = currentPage === 0 ? 'Previous-page disabled' : 'Previous-page';
  const nextClassName = currentPage === totalPages - 1 ? 'Next-page disabled' : 'Next-page';

  const moveNext = () => {
    const newPage = currentPage + 1;

    if (newPage < totalPages) {
      action(newPage);
    }
  }

  const movePrev = () => {
    const newPage = currentPage - 1;

    if (newPage >= 0) {
      action(newPage);
    }
  }

  const movePage = (page) => {
    if (page != currentPage) {
      action(page);
    }
  }

  return (
    <div className="Pagination">
      <span className={prevClassName} onClick={movePrev}>
        Previous
      </span>
      {
        pages.map((page) => {
          const active = page === currentPage ? 'active' : '';

          return (
            <a 
              key={page} 
              className={active}
              onClick={() => movePage(page)}
            >
              { page + 1 }
            </a>
          );
        })
      }
      <span className={nextClassName} onClick={moveNext}>
        Next
      </span>
    </div>
  );
}

export default Pagination;