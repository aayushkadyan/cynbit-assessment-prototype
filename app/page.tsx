"use client";

import ScopingAssistant from "@/components/ScopingAssistant";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureHighlights from "@/components/FeatureHighlights";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <ScopingAssistant />
      <FeatureHighlights />
      <Footer />
    </main>
  );
}
