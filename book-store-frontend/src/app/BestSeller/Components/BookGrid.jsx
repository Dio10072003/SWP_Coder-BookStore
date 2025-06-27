import React from 'react';
import BookCard from './BestSellerBookCard';

const BookGrid = ({ books }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 my-8">
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
