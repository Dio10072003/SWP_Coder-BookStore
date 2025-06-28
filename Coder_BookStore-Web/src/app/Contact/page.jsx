import React from 'react';
import ContactHeader from './Components/ContactHeader.jsx';
import ContactForm from './Components/ContactForm.jsx';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-700 flex items-center justify-center p-6">
      <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
        <ContactHeader />
        <ContactForm />
      </div>
    </div>
  );
}