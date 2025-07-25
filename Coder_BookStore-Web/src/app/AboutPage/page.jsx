// AboutPage/page.jsx
import Intro from "./Components/Intro";
import ContactSection from "./Components/ContactSection";
import HistorySection from "./Components/HistorySection";
import MissionSection from "./Components/MissionSection";
import TeamSection from "./Components/TeamSection";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Intro />
      <HistorySection />
      <MissionSection />
      <TeamSection />
      <ContactSection />
    </div>
  );
}
/*
import Intro from './Components/Intro';
import ContactSection from './Components/ContactSection';
import HistorySection from './Components/HistorySection';
import MissionSection from './Components/MissionSection';
import TeamSection from './Components/TeamSection';
import CoreValuesSection from './Components/CoreValuesSection';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Head from 'next/head';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us | Bird Boarding Booking</title>
        <meta name="description" content="Learn more about our mission, history, and the team behind Bird Boarding Booking." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-gray-50 text-gray-800">
        <Header />

        <main>
          <Intro />
          <HistorySection />
          <MissionSection />
          <CoreValuesSection />
          <TeamSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  );
}
import Intro from './Components/Intro';
import ContactSection from './Components/ContactSection';
import HistorySection from './Components/HistorySection';
import MissionSection from './Components/MissionSection';
import TeamSection from './Components/TeamSection';
import CoreValuesSection from './Components/CoreValuesSection';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Head from 'next/head';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us | Bird Boarding Booking</title>
        <meta name="description" content="Learn more about our mission, history, and the team behind Bird Boarding Booking." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-gray-50 text-gray-800">
        <Header />

        <main>
          <Intro />
          <HistorySection />
          <MissionSection />
          <CoreValuesSection />
          <TeamSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  );
}
import Intro from './Components/Intro';
import ContactSection from './Components/ContactSection';
import HistorySection from './Components/HistorySection';
import MissionSection from './Components/MissionSection';
import TeamSection from './Components/TeamSection';
import CoreValuesSection from './Components/CoreValuesSection';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Head from 'next/head';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us | Bird Boarding Booking</title>
        <meta name="description" content="Learn more about our mission, history, and the team behind Bird Boarding Booking." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="min-h-screen bg-gray-50 text-gray-800">
        <Header />

        <main>
          <Intro />
          <HistorySection />
          <MissionSection />
          <CoreValuesSection />
          <TeamSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </>
  );
}

*/
