import React from 'react';

const PolicySection = ({ title, children, icon, gradient = "from-white via-gray-50 to-white" }) => {
    return (
        <section
            className={`relative group bg-gradient-to-br ${gradient} rounded-2xl shadow-xl p-6 md:p-8 mb-8 overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl`}
        >
            <div className="flex items-center mb-4 gap-3">
                {icon && (
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/70 shadow-md mr-2 animate-float">
                        {icon}
                    </span>
                )}
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 drop-shadow">{title}</h2>
            </div>
            <div className="policy-content text-gray-700 text-base md:text-lg">
                {children}
            </div>
            {/* Hiệu ứng blob nền động */}
            <span className="absolute -top-10 -left-10 w-32 h-32 bg-pink-200 opacity-20 rounded-full blur-2xl animate-blob z-0" />
            <span className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-200 opacity-10 rounded-full blur-2xl animate-blob2 z-0" />
        </section>
    );
};

export default PolicySection;