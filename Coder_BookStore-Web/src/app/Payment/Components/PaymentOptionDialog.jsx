import React from 'react';

const PaymentOptionDialog = ({ open, onClose, title, description, notes, icon }) => {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full relative animate-fade-in">
                <button
                    className="absolute top-3 right-3 text-gray-400 hover:text-pink-500 text-2xl font-bold focus:outline-none"
                    onClick={onClose}
                    aria-label="Đóng"
                >
                    ×
                </button>
                <div className="flex flex-col items-center mb-4">
                    <span className="text-4xl md:text-5xl mb-2">{icon}</span>
                    <h2 className="text-xl md:text-2xl font-bold text-blue-800 text-center mb-2">{title}</h2>
                </div>
                <div className="text-gray-700 text-base md:text-lg mb-2 text-center">{description}</div>
                {notes && <div className="text-yellow-700 text-sm md:text-base mt-2 text-center"><strong>Lưu ý:</strong> {notes}</div>}
            </div>
        </div>
    );
};

export default PaymentOptionDialog; 