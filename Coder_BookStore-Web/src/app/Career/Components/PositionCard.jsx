import React from 'react';
import { FaMapMarkerAlt, FaClock, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';

const PositionCard = ({ title, location, type, description, requirements }) => {
    return (
        <div className="bg-gradient-to-br from-blue-100 via-purple-50 to-pink-50 rounded-2xl shadow-lg p-6 flex flex-col gap-2 border border-blue-200 hover:scale-105 transition-transform duration-200">
            <h3 className="text-xl font-bold text-blue-800 mb-1">{title}</h3>
            <div className="flex items-center gap-3 text-sm mb-2">
                <span className="flex items-center gap-1 text-blue-600"><FaMapMarkerAlt /> {location}</span>
                <span className="flex items-center gap-1 text-purple-600"><FaClock /> {type}</span>
            </div>
            <div className="mb-2">
                <span className="font-semibold text-gray-700">Mô tả:</span> <span className="text-gray-600">{description}</span>
            </div>
            <div>
                <span className="font-semibold text-gray-700">Yêu cầu:</span>
                <ul className="list-disc list-inside ml-2 text-gray-600">
                    {requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                    ))}
                </ul>
            </div>
            <Link href="/Contact" className="mt-4 px-5 py-2 bg-pink-600 text-white rounded-lg font-semibold shadow hover:bg-pink-700 flex items-center gap-2 self-end transition-all">
                Ứng tuyển ngay <FaChevronRight />
            </Link>
        </div>
    );
};

export default PositionCard;