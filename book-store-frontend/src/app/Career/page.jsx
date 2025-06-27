import React from 'react';
import CareerHeader from './Components/CareerHeader';
import WhyJoinUs from './Components/WhyJoinUs';
import OpenPositions from './Components/OpenPositions';
import ApplicationProcess from './Components/ApplicationProcess';
import CareerContact from './Components/CareerContact';

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