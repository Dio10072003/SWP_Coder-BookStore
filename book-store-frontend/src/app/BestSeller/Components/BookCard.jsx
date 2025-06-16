import React from 'react';

const BookCard = ({ id, title, author, price, imageUrl, rating, description }) => {
    return (
        <div className="book-card" key={id}>
            <img src={imageUrl} alt={title} className="book-image" />
            <div className="book-info">
                <h3 className="book-title">{title}</h3>
                <p className="book-author">Tác giả: {author}</p>
                <p className="book-price">{price} VND</p>
                <div className="book-rating">
                    {'⭐'.repeat(rating)} ({rating}/5)
                </div>
                <p className="book-description">{description}</p>
                <button className="add-to-cart-button">Thêm vào giỏ</button>
            </div>
        </div>
    );
};

export default BookCard;