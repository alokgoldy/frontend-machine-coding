import React, { useState } from "react";
import "./Pagination.css";

// eslint-disable-next-line react/prop-types
const Pagination = ({ totalPages = 20 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getPages = () => {
    const pages = [];

    // Always show first page
    pages.push(1);

    // Left dots
    if (currentPage > 3) {
      pages.push("...");
    }

    // Middle pages
    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    // Right dots
    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="pagination-container">
      <button
        className="pagination-btn nav-btn"
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {getPages().map((page, index) =>
        page === "..." ? (
          <span key={index} className="pagination-dots">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => handleClick(page)}
            className={`pagination-btn ${currentPage === page ? "active" : ""}`}
          >
            {page}
          </button>
        )
      )}

      <button
        className="pagination-btn nav-btn"
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
