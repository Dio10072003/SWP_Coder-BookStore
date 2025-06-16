import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [...Array(totalPages).keys()].map(i => i + 1);

    return (
        <nav className="pagination">
            {pages.map(page => (
                <button
                    key={page}
                    className={`pagination-button ${currentPage === page ? 'active' : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
        </nav>
    );
};

export default Pagination;