import React from "react";
import CareerHeader from "./Components/CareerHeader";
import WhyJoinUs from "./Components/WhyJoinUs";
import OpenPositions from "./Components/OpenPositions";
import ApplicationProcess from "./Components/ApplicationProcess";
import CareerContact from "./Components/CareerContact";

export default function CareerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-10 px-2">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <CareerHeader />
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
            <WhyJoinUs />
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4">
            <ApplicationProcess />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <OpenPositions />
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <CareerContact />
        </div>
      </div>
    </div>
  );
}
/*
'use client';

import React from 'react';
import Head from 'next/head'; // SEO support

import CareerHeader from './Components/CareerHeader';
import WhyJoinUs from './Components/WhyJoinUs';
import OpenPositions from './Components/OpenPositions';
import ApplicationProcess from './Components/ApplicationProcess';
import CareerContact from './Components/CareerContact';

export default function CareerPage() {
  const scrollToPositions = () => {
    const section = document.getElementById('open-positions');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        <title>Careers | Join Our Team</title>
        <meta name="description" content="Khám phá cơ hội nghề nghiệp và gia nhập đội ngũ của chúng tôi." />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-10 px-4">
        <div className="max-w-5xl mx-auto space-y-10">
          
          {/* Header *
          <div className="text-center">
            <CareerHeader />
            <button
              onClick={scrollToPositions}
              className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              Xem vị trí tuyển dụng
            </button>
          </div>

          {/* Why Join + Application Process 
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <WhyJoinUs />
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <ApplicationProcess />
            </div>
          </div>

          {/* Open Positions 
          <div id="open-positions" className="bg-white rounded-2xl shadow-lg p-6">
            <OpenPositions />
          </div>

          {/* Contact 
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <CareerContact />
          </div>
        </div>
      </div>
    </>
  );
}
*/
