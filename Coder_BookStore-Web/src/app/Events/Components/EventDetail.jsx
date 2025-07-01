import React from 'react';

const EventDetail = ({ event, onRefresh }) => {
  if (!event) return (
    <section className="py-10 px-4 max-w-3xl mx-auto text-center animate-fade-in">
      <h2 className="text-3xl font-extrabold mb-4 text-fuchsia-600 drop-shadow">Chi tiết sự kiện</h2>
      <p className="text-gray-700 italic">Chọn một sự kiện để khám phá hành trình độc đáo, sáng tạo và đầy cảm hứng!</p>
      <div className="mt-6 text-sm text-gray-400">(Tính năng chi tiết sẽ cập nhật sớm...)</div>
    </section>
  );

  return (
    <section className="py-10 px-4 max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl mt-8 animate-fade-in flex flex-col items-center relative">
      <button
        className="absolute top-4 right-4 px-3 py-1 bg-fuchsia-200 text-fuchsia-700 rounded-full font-bold hover:bg-fuchsia-400 transition"
        onClick={onRefresh}
      >Đóng</button>
      <img src={event.image} alt={event.title} className="w-full h-56 object-cover rounded-xl mb-6 shadow-lg" />
      <h2 className="text-3xl font-extrabold mb-2 text-fuchsia-700 drop-shadow-lg">{event.title}</h2>
      <div className="text-gray-600 text-lg mb-4 italic">{event.location} | {new Date(event.start_time).toLocaleString()} - {new Date(event.end_time).toLocaleString()}</div>
      <div className="text-gray-800 text-base mb-6 whitespace-pre-line text-justify leading-relaxed">{event.description}</div>
      <button className="px-8 py-3 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-white rounded-full font-bold text-lg shadow-lg hover:from-fuchsia-500 hover:to-cyan-400 transition-all duration-200">Đăng ký tham gia</button>
    </section>
  );
};

export default EventDetail; 