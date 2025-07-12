'use client'
import React, { useState, useEffect } from 'react';
import EventHeader from './Components/EventHeader.jsx';
import EventList from './Components/EventList.jsx';
import EventDetail from './Components/EventDetail.jsx';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        setEvents(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Lỗi tải danh sách sự kiện');
        setLoading(false);
      });
  }, [refresh]);

  const handleSelectEvent = (event) => setSelectedEvent(event);
  const handleRefresh = () => setRefresh(r => !r);
  const handleCloseDetail = () => setSelectedEvent(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-fuchsia-50 to-cyan-50">
      <EventHeader />
      <EventList events={events} loading={loading} error={error} onSelect={handleSelectEvent} />
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in">
          <div className="relative w-full max-w-2xl mx-auto">
            <EventDetail event={selectedEvent} onRefresh={handleCloseDetail} />
          </div>
        </div>
      )}
      <style jsx global>{`
        .animate-fade-in { animation: fade-in 0.3s ease both; }
        @keyframes fade-in { 0% { opacity: 0; } 100% { opacity: 1; } }
      `}</style>
    </div>
  );
} 