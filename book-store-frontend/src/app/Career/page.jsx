import React from 'react';
import CareerHeader from './Components/CareerHeader';
import WhyJoinUs from './Components/WhyJoinUs';
import OpenPositions from './Components/OpenPositions';
import ApplicationProcess from './Components/ApplicationProcess';
import CareerContact from './Components/CareerContact';

export default function CareerPage() {
    return (
        <div className="career-page-container min-h-screen bg-gray-50">
            <CareerHeader />
            <main className="career-main-content">
                <WhyJoinUs />
                <OpenPositions />
                <ApplicationProcess />
                <CareerContact />
            </main>
        </div>
    );
}