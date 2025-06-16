import React from 'react';
import BookCard from './BestSellerBookCard';

const BookGrid = ({ books }) => {
    return (
        <div className="book-grid">
            {books.map(book => (
                <BookCard
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    price={book.price}
                    imageUrl={book.imageUrl}
                    rating={book.rating}
                    description={book.description}
                />
            ))}
        </div>
    );
};

export default BookGrid;
