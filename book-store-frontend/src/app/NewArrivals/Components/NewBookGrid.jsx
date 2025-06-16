import React from 'react';
import NewBookCard from './NewBookCard';

const NewBookGrid = ({ books }) => {
    return (
        <div className="new-book-grid">
            {books.map(book => (
                <NewBookCard
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    price={book.price}
                    imageUrl={book.imageUrl}
                    releaseDate={book.releaseDate}
                    tags={book.tags}
                />
            ))}
        </div>
    );
};

export default NewBookGrid;