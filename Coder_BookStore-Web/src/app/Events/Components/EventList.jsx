import React from 'react';

const EventList = ({ events, loading, error, onSelect }) => {
  if (loading) return <div className="text-center py-10 text-xl animate-pulse">Đang tải sự kiện...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!events || events.length === 0) return <div className="text-center py-10 text-gray-400">Chưa có sự kiện nào.</div>;

  return (
    <section className="py-10 px-4 max-w-3xl mx-auto grid grid-cols-1 gap-4">
      {events.map(event => (
        <div
          key={event.id}
          className="bg-white rounded-2xl shadow flex items-center justify-between px-6 py-4 mb-2 border border-fuchsia-100"
        >
          <span className="text-lg font-bold text-fuchsia-700 truncate">{event.title}</span>
          <button
            className="ml-4 px-5 py-2 bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white rounded-full font-semibold shadow hover:from-cyan-400 hover:to-fuchsia-500 transition-all duration-200"
            onClick={() => onSelect(event)}
          >
            Khám phá
          </button>
        </div>
      ))}
    </section>
  );
};

export default EventList; 