import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Logos from "@/components/sections/Logos";
import Integrate from "@/components/sections/Integrate";
import DeveloperExperience from "@/components/sections/DeveloperExperience";
import BroadcastEditor from "@/components/sections/BroadcastEditor";
import AudiencesAnalytics from "@/components/sections/AudiencesAnalytics";
import ReactEmailSection from "@/components/sections/ReactEmailSection";
import Deliverability from "@/components/sections/Deliverability";
import FeaturedQuote from "@/components/sections/FeaturedQuote";
import EverythingInControl from "@/components/sections/EverythingInControl";
import Testimonials from "@/components/sections/Testimonials";
import PricingCTA from "@/components/sections/PricingCTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-black overflow-x-hidden">
        <Navbar />
        <Hero />
        <Logos />
        <Integrate />
        <DeveloperExperience />
        <BroadcastEditor />
        <AudiencesAnalytics />
        <ReactEmailSection />
        <Deliverability />
        <FeaturedQuote />
        <EverythingInControl />
        <Testimonials />
        <PricingCTA />
        <Footer />
      </main>
    </SmoothScroll>
  );
}