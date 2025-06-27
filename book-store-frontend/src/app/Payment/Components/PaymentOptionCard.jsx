import React from 'react';

const PaymentOptionCard = ({ title, icon, onClick }) => {
    return (
        <button
            className="payment-option-card group flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-4 md:p-6 cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={onClick}
            type="button"
        >
            <div className="payment-icon text-3xl md:text-4xl mb-2">{icon}</div>
            <h3 className="text-base md:text-lg font-semibold text-blue-800 text-center group-hover:text-pink-600 transition-colors">{title}</h3>
        </button>
    );
};

export default PaymentOptionCard;