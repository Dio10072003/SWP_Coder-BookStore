import React from 'react';
import BestPicksSection from './Components/BestPicksSection.jsx';
import BlogSection from './Components/BlogSection.jsx';
import CategoryNav from './Components/CategoryNav.jsx';
import FeaturedBooks from './Components/FeaturedBooks.jsx';
import HeroSection from './Components/HeroSection.jsx';
import Newsletter from './Components/Newsletter.jsx';
import StatsSection from './Components/StatsSection.jsx';

export default function HomePage() {
  return (
    <div className="coder-bookstore-home bg-gradient-to-br from-indigo-900 to-purple-700 text-white min-h-screen">
      <HeroSection />
      <CategoryNav />
      <FeaturedBooks />
      <BestPicksSection />
      <BlogSection />
      <StatsSection />
      <Newsletter />
    </div>
  );
}