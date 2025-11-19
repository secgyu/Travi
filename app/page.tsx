import { TravelHero } from "@/components/travel-hero";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { StatsSection } from "@/components/stats-section";
import { TravelPlanPreview } from "@/components/travel-plan-preview";
import { Testimonials } from "@/components/testimonials";
import { FAQSection } from "@/components/faq-section";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-accent/30 via-background to-background">
        <TravelHero />
        <StatsSection />
        <TravelPlanPreview />
        <Testimonials />
        <FAQSection />
        <Footer />
      </main>
    </>
  );
}
