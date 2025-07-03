import React from 'react';
import BookCard from './BestSellerBookCard';

export default function BookGrid({ books, onQuickView }) {
    // Chia sách thành các tầng
    const tier1 = books[0] ? [books[0]] : [];
    const tier2 = books.slice(1, 3);
    const tier3 = books.slice(3, 6);
    const tier4 = books.slice(6, 12);

    return (
        <div className="relative max-w-[1200px] mx-auto w-full flex flex-col items-center">
            {/* Nền tam giác */}
            <div className="absolute inset-0 z-0 pointer-events-none select-none">
                <svg width="100%" height="100%" viewBox="0 0 1200 700" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="triGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#fffbe6" stopOpacity="0.95" />
                            <stop offset="100%" stopColor="#fffbe6" stopOpacity="0.7" />
                        </linearGradient>
                    </defs>
                    <polygon points="600,0 1200,700 0,700" fill="url(#triGradient)" stroke="#fbbf24" strokeWidth="10" />
                </svg>
            </div>
            {/* Grid card 4 tầng */}
            <div className="relative z-10 pt-28 pb-12 w-full flex flex-col items-center">
                {/* Tầng 1 */}
                {tier1.length > 0 && (
                    <div className="flex justify-center w-full -mt-24 mb-10">
                        <div className="mx-auto max-w-xl min-w-[260px]">
                            <BookCard book={tier1[0]} size="xl" onQuickView={onQuickView} highlight />
                        </div>
                    </div>
                )}
                {/* Tầng 2 */}
                {tier2.length > 0 && (
                    <div className="flex justify-center gap-x-32 w-full mb-8">
                        {tier2.map((book, i) => (
                            <div key={book.id} className="max-w-lg min-w-[220px]">
                                <BookCard book={book} size="lg" onQuickView={onQuickView} />
                            </div>
                        ))}
                    </div>
                )}
                {/* Tầng 3 */}
                {tier3.length > 0 && (
                    <div className="flex justify-center gap-x-16 w-full mb-4">
                        {tier3.map((book, i) => (
                            <div key={book.id} className="max-w-md min-w-[180px]">
                                <BookCard book={book} size="md" onQuickView={onQuickView} />
                            </div>
                        ))}
                    </div>
                )}
                {/* Tầng 4 */}
                {tier4.length > 0 && (
                    <div className="grid grid-cols-6 gap-x-20 gap-y-6 w-full mt-4 mb-10 justify-items-center px-8 md:px-20">
                        {tier4.map((book, i) => (
                            <div key={book.id} className="flex justify-center w-full">
                                <BookCard book={book} size="sm" onQuickView={onQuickView} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
