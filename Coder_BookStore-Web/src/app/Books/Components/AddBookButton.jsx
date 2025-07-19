import React from 'react';

export default function AddBookButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 24px',
        borderRadius: '16px',
        border: 'none',
        background: 'linear-gradient(90deg, #a259ff 0%, #ff5c93 100%)',
        color: 'white',
        fontWeight: 500,
        fontSize: '20px',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(162,89,255,0.15)'
      }}
    >
      <span style={{ fontSize: '28px', fontWeight: 'bold' }}>+</span>
      Thêm sách
    </button>
  );
} 