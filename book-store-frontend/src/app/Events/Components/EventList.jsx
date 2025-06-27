import React from 'react';

const events = [
  { id: 1, title: 'Book Hackathon 2024', desc: 'Cuộc thi lập trình giải mã sách – nơi ý tưởng và công nghệ giao thoa!', image: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=facearea&w=400&h=250', tag: 'Hackathon' },
  { id: 2, title: 'Đêm Sách Dưới Sao', desc: 'Trải nghiệm đọc sách ngoài trời, giao lưu cùng tác giả và độc giả.', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=250', tag: 'Outdoor' },
  { id: 3, title: 'Tech & Book Fair', desc: 'Triển lãm công nghệ và sách, workshop sáng tạo, minigame hấp dẫn.', image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=facearea&w=400&h=250', tag: 'Exhibition' },
];

const tagColors = {
  Hackathon: 'bg-pink-500',
  Outdoor: 'bg-blue-500',
  Exhibition: 'bg-yellow-500',
};

const EventList = () => (
  <section className="py-10 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
    {events.map(event => (
      <div key={event.id} className="bg-white rounded-3xl shadow-2xl p-7 flex flex-col items-center transform hover:scale-105 transition-transform duration-300 border-4 border-dashed border-fuchsia-200">
        <img src={event.image} alt={event.title} className="w-full h-40 object-cover rounded-xl mb-5 shadow-md" />
        <span className={`px-4 py-1 mb-3 rounded-full text-white text-xs font-bold uppercase ${tagColors[event.tag]}`}>{event.tag}</span>
        <h2 className="text-2xl font-bold mb-2 text-fuchsia-700 drop-shadow">{event.title}</h2>
        <p className="text-gray-600 text-center mb-2">{event.desc}</p>
        <button className="mt-3 px-6 py-2 bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white rounded-full font-semibold shadow hover:from-cyan-400 hover:to-fuchsia-500 transition-all duration-200">Đăng ký ngay</button>
      </div>
    ))}
  </section>
);

export default EventList; 