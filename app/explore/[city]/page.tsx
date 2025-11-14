import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { getCityBySlug } from "@/lib/cities";
import { CityHero } from "@/components/city/city-hero";
import { CityQuickInfo } from "@/components/city/city-quick-info";
import { CityMustVisit } from "@/components/city/city-must-visit";
import { CityFoods } from "@/components/city/city-foods";
import { CityTransportation } from "@/components/city/city-transportation";
import { CityTips } from "@/components/city/city-tips";
import { CityBasicInfo } from "@/components/city/city-basic-info";

export default function CityDetailPage({ params }: { params: { city: string } }) {
  const city = getCityBySlug(params.city);

  if (!city) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <CityHero
        name={city.name}
        country={city.country}
        emoji={city.emoji}
        description={city.description}
        heroImage={city.heroImage}
      />

      <main className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-12 flex flex-wrap gap-3">
          {city.highlights.map((highlight, index) => (
            <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
              {highlight}
            </Badge>
          ))}
        </div>

        <div className="mb-16">
          <CityQuickInfo
            bestSeason={city.bestSeason}
            avgTemp={city.avgTemp}
            avgBudget={city.avgBudget}
            recommendedDays={city.recommendedDays}
          />
        </div>

        <CityMustVisit places={city.mustVisit} />
        <CityFoods foods={city.foods} />
        <CityTransportation transportation={city.transportation} />
        <CityTips tips={city.tips} />
        <CityBasicInfo timezone={city.timezone} language={city.language} currency={city.currency} />

        <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">{city.name} 여행 계획을 만들어볼까요?</h2>
          <p className="mb-6 text-lg text-foreground/80">AI가 당신의 취향에 맞는 완벽한 여행 코스를 만들어드려요</p>
          <Button asChild size="lg" className="bg-cta text-cta-foreground hover:bg-cta/90">
            <Link href={`/chat?destination=${encodeURIComponent(city.name)}`}>
              <ArrowRight className="mr-2 h-5 w-5" />
              {city.name} 여행 계획 시작하기
            </Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
