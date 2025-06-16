import React from 'react';

const TermsSection = ({ title, children }) => {
    return (
        <section className="terms-section">
            <h2>{title}</h2>
            <div className="terms-content">
                {children}
            </div>
        </section>
    );
};

export default TermsSection;