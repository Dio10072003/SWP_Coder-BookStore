'use client';
import React, { useEffect, useState } from 'react';
import PositionCard from './PositionCard';
import { FaUserPlus } from 'react-icons/fa';

const OpenPositions = () => {
    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch('/api/careers')
            .then(res => res.json())
            .then(data => Array.isArray(data) ? setPositions(data) : setPositions([]))
            .catch(e => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section>
            <h2 className="text-2xl font-bold text-pink-700 mb-3 flex items-center gap-2"><FaUserPlus className="text-pink-500" />Vị Trí Đang Tuyển Dụng</h2>
            {loading && <div className="text-center py-6 text-blue-500">Đang tải danh sách nghề...</div>}
            {error && <div className="text-center py-6 text-red-500">{error}</div>}
            <div className="grid md:grid-cols-2 gap-6">
                {positions.map(pos => (
                    <PositionCard
                        key={pos.id}
                        title={pos.title}
                        location={pos.location}
                        type={pos.type}
                        description={pos.description}
                        requirements={pos.requirements}
                    />
                ))}
            </div>
        </section>
    );
};

export default OpenPositions;