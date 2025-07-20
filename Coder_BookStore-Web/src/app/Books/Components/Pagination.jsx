"use client";

import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="pagination-container">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="pagination-btn"
      >
        First
      </button>
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="pagination-btn"
      >
        &laquo;
      </button>
      {getPageNumbers().map((p, idx) =>
        p === '...'
          ? <span key={idx} className="pagination-ellipsis">...</span>
          : <button
              key={idx}
              onClick={() => onPageChange(p)}
              className={`pagination-btn${p === currentPage ? ' active' : ''}`}
            >
              {p}
            </button>
      )}
      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="pagination-btn"
      >
        &raquo;
      </button>
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="pagination-btn"
      >
        Last
      </button>
      <style jsx>{`
        .pagination-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          margin: 24px 0;
          flex-wrap: wrap;
          padding: 0 16px;
        }
        .pagination-btn {
          border: 1.5px solid #d1d5db;
          background: rgba(255,255,255,0.7);
          border-radius: 12px;
          padding: 8px 12px;
          font-weight: 600;
          font-family: 'Inter', Arial, sans-serif;
          cursor: pointer;
          transition: background 0.2s, color 0.2s, border 0.2s, transform 0.15s;
          font-size: 0.9rem;
          box-shadow: 0 2px 8px 0 rgba(160,160,200,0.07);
          min-width: 40px;
        }
        
        @media (max-width: 640px) {
          .pagination-btn {
            padding: 6px 10px;
            font-size: 0.8rem;
            min-width: 36px;
          }
        }
        .pagination-btn.active {
          background: linear-gradient(90deg, #a1c4fd, #c2e9fb);
          color: #22223b;
          border: 2px solid #4f8cff;
          transform: scale(1.12);
        }
        .pagination-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .pagination-ellipsis {
          padding: 0 8px;
          color: #888;
          font-size: 1.1rem;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};

export default Pagination;