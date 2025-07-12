import React, { useState } from 'react';
import { addToCartLocal } from '../../utils/cartUtils';

const NewBookCard = ({ id, title, author, price, imageUrl, releaseDate, tags }) => {
    const [added, setAdded] = useState(false);
    const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('user');
    const handleAdd = () => {
        if (!isLoggedIn) {
            alert("Bạn chỉ có thể làm điều đó với một tài khoản hợp lệ thôi");
            return;
        }
        addToCartLocal({ id, title, author, price, imageUrl, releaseDate, tags });
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
    };
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
                <div className="relative">
                  <button className="add-to-cart-button" onClick={handleAdd}>Thêm vào giỏ</button>
                  {added && (
                    <span className="absolute left-1/2 -translate-x-1/2 top-[-36px] bg-green-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1 shadow animate-bounce">
                      Đã thêm!
                    </span>
                  )}
                </div>
            </div>
        </div>
    );
};

export default NewBookCard;