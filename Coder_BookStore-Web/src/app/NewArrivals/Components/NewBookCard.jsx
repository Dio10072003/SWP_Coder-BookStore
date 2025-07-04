import React from 'react';

const NewBookCard = ({ id, title, author, price, imageUrl, releaseDate, tags }) => {
    return (
        <div className="new-book-card" key={id}>
            <img src={imageUrl} alt={title} className="new-book-image" />
            <div className="new-book-info">
                <h3 className="new-book-title">{title}</h3>
                <p className="new-book-author">Tác giả: {author}</p>
                <p className="new-book-price">{Number(price).toLocaleString()} VND</p>
                <p className="release-date">Ngày phát hành: {releaseDate}</p>
                <div className="book-tags">
                    {tags.map((tag, index) => (
                        <span key={index} className="tag">{tag}</span>
                    ))}
                </div>
                <button className="add-to-cart-button">Thêm vào giỏ</button>
            </div>
        </div>
    );
};

export default NewBookCard;