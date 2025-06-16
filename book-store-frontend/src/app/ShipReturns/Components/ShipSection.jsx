import React from 'react';

const ShipSection = ({ title, children }) => {
    return (
        <section className="ship-section">
            <h3>{title}</h3>
            {children}
        </section>
    );
};

export default ShipSection;