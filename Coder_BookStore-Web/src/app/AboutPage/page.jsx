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

