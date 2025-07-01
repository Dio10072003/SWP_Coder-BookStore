import React from 'react';

const tagColors = {
  Hackathon: 'bg-pink-500',
  Outdoor: 'bg-blue-500',
  Exhibition: 'bg-yellow-500',
  Workshop: 'bg-green-500',
  Community: 'bg-cyan-500',
  Default: 'bg-fuchsia-500',
};

function getTag(event) {
  if (!event.title) return 'Default';
  if (event.title.toLowerCase().includes('hackathon')) return 'Hackathon';
  if (event.title.toLowerCase().includes('workshop')) return 'Workshop';
  if (event.title.toLowerCase().includes('offline')) return 'Community';
  if (event.title.toLowerCase().includes('fair') || event.title.toLowerCase().includes('triển lãm')) return 'Exhibition';
  if (event.title.toLowerCase().includes('đêm') || event.title.toLowerCase().includes('outdoor')) return 'Outdoor';
  return 'Default';
}

const EventList = ({ events, loading, error, onSelect }) => {
  if (loading) return <div className="text-center py-10 text-xl animate-pulse">Đang tải sự kiện...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!events || events.length === 0) return <div className="text-center py-10 text-gray-400">Chưa có sự kiện nào.</div>;

  return (
    <section className="py-10 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {events.map(event => (
        <div
          key={event.id}
          className="bg-white rounded-3xl shadow-2xl p-7 flex flex-col items-center transform hover:scale-105 transition-transform duration-300 border-4 border-dashed border-fuchsia-200 cursor-pointer group"
          onClick={() => onSelect(event)}
        >
          <img src={event.image} alt={event.title} className="w-full h-40 object-cover rounded-xl mb-5 shadow-md group-hover:shadow-fuchsia-400 transition" />
          <span className={`px-4 py-1 mb-3 rounded-full text-white text-xs font-bold uppercase ${tagColors[getTag(event)]}`}>{getTag(event)}</span>
          <h2 className="text-2xl font-bold mb-2 text-fuchsia-700 drop-shadow group-hover:text-cyan-600 transition-colors duration-200">{event.title}</h2>
          <p className="text-gray-600 text-center mb-2 line-clamp-3">{event.description}</p>
          <div className="flex flex-col items-center text-sm text-gray-500 mb-2">
            <span className="font-semibold">Địa điểm:</span> {event.location}
            <span className="font-semibold mt-1">Thời gian:</span> {new Date(event.start_time).toLocaleString()} - {new Date(event.end_time).toLocaleString()}
          </div>
          <button className="mt-3 px-6 py-2 bg-gradient-to-r from-fuchsia-500 to-cyan-400 text-white rounded-full font-semibold shadow hover:from-cyan-400 hover:to-fuchsia-500 transition-all duration-200">Khám phá</button>
        </div>
      ))}
    </section>
  );
};

export default EventList; 