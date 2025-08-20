/**
 * Home Page for Aerophilia 2025
 * Main landing page with hero section, events, speakers, and partners
 */


import { Card, CardContent } from "@/components/ui/card";
import HeroSection from '../../components/HomePage/HeroSection/HeroSection';
import EventCategoriesSection from '../../components/HomePage/EventCategoriesSection/EventCategoriesSection';
import KeynoteSpeakersSection from '../../components/HomePage/KeynoteSpeakersSection/KeynoteSpeakersSection';
import PartnersSection from '../../components/HomePage/PartnersSection/PartnersSection';
import type { HomePageProps } from './HomePage.types';

const HomePage: React.FC<HomePageProps> = ({ className }) => {
  return (
    <div className={`w-full min-h-screen bg-black ${className}`}>
      {/* Hero Section - Full viewport height */}
      <section className="w-full flex justify-center items-center min-h-[80vh]">
        <Card className="w-full max-w-[1800px] shadow-xl bg-gradient-to-br from-black via-blue-950 to-black border-none rounded-none">
          <CardContent className="p-0">
            <HeroSection />
          </CardContent>
        </Card>
      </section>

      {/* Event Categories - Full width section */}
      <section className="w-full flex justify-center items-center py-12 bg-gradient-to-b from-black to-gray-900">
        <Card className="w-full max-w-[1800px] shadow-lg border-none rounded-none bg-transparent">
          <CardContent className="p-0">
            <EventCategoriesSection />
          </CardContent>
        </Card>
      </section>

      {/* Keynote Speakers - Full width section */}
      <section className="w-full flex justify-center items-center py-12 bg-gradient-to-b from-gray-900 to-black">
        <Card className="w-full max-w-[1800px] shadow-lg border-none rounded-none bg-transparent">
          <CardContent className="p-0">
            <KeynoteSpeakersSection />
          </CardContent>
        </Card>
      </section>

      {/* Partners - Full width section */}
      <section className="w-full flex justify-center items-center py-12 bg-black">
        <Card className="w-full max-w-[1800px] shadow-lg border-none rounded-none bg-transparent">
          <CardContent className="p-0">
            <PartnersSection />
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default HomePage;
