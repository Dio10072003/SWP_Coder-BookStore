import React from 'react';

const ShipSection = ({ title, children, icon, gradient = "from-blue-50 via-white to-blue-100", className = "" }) => {
    return (
        <section
            className={`relative group bg-gradient-to-br ${gradient} rounded-2xl shadow-xl p-6 md:p-8 mb-6 overflow-hidden flex items-start gap-4 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl animate-fade-in ${className}`}
        >
            {icon && (
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/70 shadow-md mr-2 animate-float mt-1">
                    {icon}
                </span>
            )}
            <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-blue-800 mb-2 flex items-center gap-2">{title}</h3>
                <div className="text-gray-700 text-base md:text-lg">{children}</div>
            </div>
            {/* Hiệu ứng blob nền động */}
            <span className="absolute -top-8 -left-8 w-24 h-24 bg-blue-200 opacity-20 rounded-full blur-2xl animate-blob z-0" />
            <span className="absolute -bottom-8 -right-8 w-24 h-24 bg-purple-200 opacity-10 rounded-full blur-2xl animate-blob2 z-0" />
        </section>
    );
};

export default ShipSection;