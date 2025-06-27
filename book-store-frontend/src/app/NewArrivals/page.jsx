// NewArrivals/Components/page.jsx (đúng theo cấu trúc của bạn)
import React from 'react';
import NewArrivalsHeader from './Components/NewArrivalsHeader.jsx';
import BookHighlight from './Components/BookHighlight.jsx';
import NewBookGrid from './Components/NewBookGrid.jsx';
import ComingSoonSection from './Components/ComingSoonSection.jsx';
import SubscriptionPrompt from './Components/SubscriptionPrompt..jsx';


export default function NewArrivalPage() {
    const newBooks = [
        { id: 1, title: 'Generative AI for Developers', author: 'Emily Chan', price: '320.000', imageUrl: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=GenAI', releaseDate: '10/06/2025', tags: ['AI', 'Development'] },
        { id: 2, title: 'Practical Go Programming', author: 'David Lee', price: '280.000', imageUrl: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=GoLang', releaseDate: '05/06/2025', tags: ['Programming', 'Go'] },
        { id: 3, title: 'Mastering System Design', author: 'Sophia K.', price: '380.000', imageUrl: 'https://via.placeholder.com/150/3357FF/FFFFFF?text=SysDesign', releaseDate: '01/06/2025', tags: ['System Architecture', 'Software Engineering'] },
        { id: 4, title: 'Cybersecurity Essentials 2025', author: 'Mark S.', price: '300.000', imageUrl: 'https://via.placeholder.com/150/FF33A1/FFFFFF?text=CyberSec', releaseDate: '28/05/2025', tags: ['Security', 'Network'] },
        { id: 5, title: 'Fullstack React with Next.js', author: 'Anna B.', price: '290.000', imageUrl: 'https://via.placeholder.com/150/5733FF/FFFFFF?text=NextJS', releaseDate: '20/05/2025', tags: ['Web Development', 'React'] },
    ];

    const featuredBook = {
        title: 'Beyond the Blockchain: Decentralized Futures',
        author: 'Dr. Alex Kim',
        description: 'Khám phá tương lai của công nghệ blockchain và cách nó định hình các hệ thống phi tập trung.',
        imageUrl: 'https://via.placeholder.com/200/00FFFF/000000?text=BlockchainFuture',
        link: '/books/blockchain-future'
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-pink-50 to-yellow-50 py-10 px-2">
            <div className="max-w-5xl mx-auto">
                <div className="mb-10 animate-fade-in">
                    <NewArrivalsHeader />
                </div>
                <div className="mb-12 animate-fade-in-up">
                    <BookHighlight
                        title={featuredBook.title}
                        author={featuredBook.author}
                        description={featuredBook.description}
                        imageUrl={featuredBook.imageUrl}
                        link={featuredBook.link}
                    />
                </div>
                <h2 className="text-3xl font-extrabold text-center text-pink-600 mb-8 drop-shadow animate-fade-in">✨ Tất cả sách mới về ✨</h2>
                <div className="mb-12 animate-fade-in-up">
                    <NewBookGrid books={newBooks} />
                </div>
                <div className="mb-12 animate-fade-in-up">
                    <ComingSoonSection />
                </div>
                <div className="animate-fade-in-up">
                    <SubscriptionPrompt />
                </div>
            </div>
        </div>
    );
}