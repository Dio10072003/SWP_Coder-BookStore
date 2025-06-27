import React from 'react';

const TermsSection = ({ title, children }) => {
    return (
        <section className="bg-blue-50 rounded-xl shadow p-5">
            <h2 className="text-xl font-bold text-blue-700 mb-2">{title}</h2>
            <div className="text-gray-800 leading-relaxed">
                {children}
            </div>
        </section>
    );
};

export default TermsSection;