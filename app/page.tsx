import { TravelHero } from "@/components/travel-hero";
import { FloatingChatbot } from "@/components/floating-chatbot";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-accent/30 via-background to-background">
        <TravelHero />
        <FloatingChatbot />
        <Footer />
      </main>
    </>
  );
}
