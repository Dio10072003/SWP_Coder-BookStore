import React from 'react';

const ReturnSection = ({ title, children }) => {
    return (
        <section className="return-section">
            <h3>{title}</h3>
            {children}
        </section>
    );
};

export default ReturnSection;