import React from "react";
import ContactHeader from "./Components/ContactHeader.jsx";
import ContactForm from "./Components/ContactForm.jsx";

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
/*
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
  import React from 'react';
import ContactHeader from './Components/ContactHeader.jsx';
import ContactForm from './Components/ContactForm.jsx';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-700 flex items-center justify-center px-4 py-12">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-xl transition-all duration-300">
        <div className="mb-6 text-center">
          <ContactHeader />
          <p className="text-sm text-gray-300 dark:text-gray-400 mt-2">
            Chúng tôi sẽ phản hồi bạn trong vòng 24 giờ!
          </p>
        </div>
        <ContactForm />
      </div>
    </div>
  );
}

*/
