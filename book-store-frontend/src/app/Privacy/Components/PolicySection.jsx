import React from 'react';

const PolicySection = ({ title, children }) => {
    return (
        <section className="policy-section">
            <h2>{title}</h2>
            <div className="policy-content">
                {children}
            </div>
        </section>
    );
};

export default PolicySection;