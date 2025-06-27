import React from 'react';
import EventHeader from './Components/EventHeader.jsx';
import EventList from './Components/EventList.jsx';
import EventDetail from './Components/EventDetail.jsx';

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-fuchsia-50 to-cyan-50">
      <EventHeader />
      <EventList />
      <EventDetail />
    </div>
  );
} 