import React from 'react';

const PaymentOptionCard = ({ title, description, icon, notes }) => {
    return (
        <div className="payment-option-card">
            <div className="payment-icon">{icon}</div>
            <h3>{title}</h3>
            <p className="payment-description">{description}</p>
            {notes && <p className="payment-notes"><strong>Lưu ý:</strong> {notes}</p>}
        </div>
    );
};

export default PaymentOptionCard;