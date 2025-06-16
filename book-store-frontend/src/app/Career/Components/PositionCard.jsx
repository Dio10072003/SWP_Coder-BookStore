import React from 'react';

const PositionCard = ({ title, location, type, description, requirements }) => {
    return (
        <div className="position-card">
            <h3>{title}</h3>
            <p><strong>Địa điểm:</strong> {location}</p>
            <p><strong>Loại hình:</strong> {type}</p>
            <h4>Mô tả công việc:</h4>
            <p>{description}</p>
            <h4>Yêu cầu:</h4>
            <ul>
                {requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                ))}
            </ul>
            <button className="apply-button">Ứng tuyển ngay</button>
        </div>
    );
};

export default PositionCard;