import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Utensils, Landmark, ShoppingBag, Mountain, Plane } from "lucide-react";
import { getAllCities, koreanToSlug } from "@/lib/cities";
import { ExploreFilter } from "@/components/explore-filter";

export default function ExplorePage() {
  const allCities = getAllCities();

  const destinations = allCities.map((city) => {
    const budgetMatch = city.avgBudget.match(/₩([\d,]+)/);
    const avgBudget = budgetMatch ? budgetMatch[0] : city.avgBudget;
    const tags = city.highlights.slice(0, 3);

    return {
      city: city.name,
      slug: koreanToSlug[city.name] || city.name.toLowerCase(),
      country: city.country,
      region: city.region,
      description: city.description.split(".")[0], // 첫 문장만
      image: city.heroImage,
      tags,
      avgBudget,
      travelTime: city.recommendedDays,
    };
  });

  const themes = [
    {
      id: "food",
      title: "미식 투어",
      icon: Utensils,
      description: "현지 맛집과 전통 음식을 찾아 떠나는 여행",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      destinations: ["오사카", "방콕", "타이베이"],
    },
    {
      id: "culture",
      title: "문화 탐방",
      icon: Landmark,
      description: "역사와 문화유산을 체험하는 여행",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      destinations: ["로마", "파리", "바르셀로나"],
    },
    {
      id: "shopping",
      title: "쇼핑 천국",
      icon: ShoppingBag,
      description: "쇼핑과 트렌디한 거리를 즐기는 여행",
      color: "text-pink-500",
      bgColor: "bg-pink-50",
      destinations: ["도쿄", "뉴욕", "홍콩"],
    },
    {
      id: "nature",
      title: "자연 힐링",
      icon: Mountain,
      description: "자연 속에서 힐링하는 여유로운 여행",
      color: "text-green-500",
      bgColor: "bg-green-50",
      destinations: ["다낭"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/20 via-background to-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Plane className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">여행지 둘러보기</h1>
          </div>
          <p className="text-lg text-foreground/80">인기 여행지를 둘러보고 AI와 함께 나만의 여행을 계획하세요</p>
        </div>
        <div className="mb-20">
          <ExploreFilter destinations={destinations} />
        </div>
        <div className="mb-8 flex items-center gap-2">
          <h2 className="text-2xl font-bold text-foreground">테마별 여행</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {themes.map((theme, index) => (
            <Card
              key={index}
              className="border-0 shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <CardHeader>
                <div className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full ${theme.bgColor}`}>
                  <theme.icon className={`h-8 w-8 ${theme.color}`} />
                </div>
                <CardTitle className="text-lg">{theme.title}</CardTitle>
                <CardDescription>{theme.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="mb-2 text-xs font-medium text-muted-foreground">추천 여행지</p>
                  <div className="flex flex-wrap gap-1">
                    {theme.destinations.map((dest, destIndex) => (
                      <Badge key={destIndex} variant="outline" className="text-xs">
                        {dest}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button asChild variant="outline" size="sm" className="w-full bg-transparent">
                  <Link href={`/explore/theme/${theme.id}`}>자세히 보기</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-20 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">아직 여행지를 정하지 못하셨나요?</h2>
          <p className="mb-6 text-lg text-foreground/80">AI와 대화하며 당신에게 딱 맞는 여행지를 찾아보세요</p>
          <Button asChild size="lg" className="bg-cta text-cta-foreground hover:bg-cta/90">
            <Link href="/chat">
              <Plane className="mr-2 h-5 w-5" />
              AI와 여행 계획 시작하기
            </Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
