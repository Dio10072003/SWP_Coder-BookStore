import React from 'react';

const BookHighlight = ({ title, author, description, imageUrl, link }) => {
    return (
        <section className="book-highlight">
            <h2>Sách Nổi Bật Vừa Ra Mắt</h2>
            <div className="highlight-content">
                <img src={imageUrl} alt={title} className="highlight-image" />
                <div className="highlight-text">
                    <h3>{title}</h3>
                    <p>Tác giả: {author}</p>
                    <p>{description}</p>
                    <a href={link} className="view-details-button">Xem chi tiết</a>
                </div>
            </div>
        </section>
    );
};

export default BookHighlight;