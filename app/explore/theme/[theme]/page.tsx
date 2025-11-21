import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Clock, Wallet, Lightbulb, BookOpen, ExternalLink } from "lucide-react";
import { getThemeById, getAllThemes } from "@/lib/themes";
import { getAllCities, koreanToSlug } from "@/lib/cities";

export async function generateStaticParams() {
  const themes = getAllThemes();
  return themes.map((theme) => ({
    theme: theme.id,
  }));
}

export default async function ThemePage({ params }: { params: Promise<{ theme: string }> }) {
  const { theme: themeId } = await params;
  const theme = getThemeById(themeId);

  if (!theme) {
    notFound();
  }

  const allCities = getAllCities();
  const themeCities = allCities.filter((city) => theme.cities.includes(city.name));
  const Icon = theme.icon;

  const guideTitle: Record<string, string> = {
    "restaurant-etiquette": "레스토랑 에티켓",
    "tipping-culture": "팁 문화 가이드",
    "mobile-payment": "해외 모바일 결제",
    "currency-exchange": "환전 가이드",
    "photo-etiquette": "사진 촬영 에티켓",
    "schengen-visa": "솅겐 비자 신청",
    "travel-insurance": "여행자 보험",
    "overseas-card": "해외 카드 사용법",
    "shopping-etiquette": "쇼핑 에티켓",
    "packing-checklist": "여행 짐 체크리스트",
    "rental-car": "렌터카 이용 가이드",
    "sim-card-guide": "유심/eSIM 가이드",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/5 to-background">
      <Header />
      <section className={`relative bg-gradient-to-br ${theme.gradientFrom} ${theme.gradientTo} py-20 text-white`}>
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative mx-auto max-w-7xl px-4">
          <Link href="/explore" className="mb-6 inline-flex items-center gap-2 text-white/90 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            <span>여행지 둘러보기로 돌아가기</span>
          </Link>
          <div className="flex items-start gap-6">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
              <Icon className="h-10 w-10" />
            </div>
            <div className="flex-1">
              <h1 className="mb-4 text-5xl font-bold">{theme.title}</h1>
              <p className="text-xl text-white/90">{theme.longDescription}</p>
            </div>
          </div>
        </div>
      </section>
      <main className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Wallet className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-lg">예상 예산</CardTitle>
                <CardDescription>1인 기준</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">{theme.budgetRange}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Clock className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-lg">추천 기간</CardTitle>
                <CardDescription>여행 일정</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">{theme.recommendedDuration}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <MapPin className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-lg">추천 도시</CardTitle>
                <CardDescription>여행지 수</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-primary">{themeCities.length}개 도시</p>
            </CardContent>
          </Card>
        </div>
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold text-foreground">추천 여행지</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {themeCities.map((city) => {
              const slug = koreanToSlug[city.name];
              return (
                <Card key={city.name} className="group overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={city.heroImage}
                      alt={city.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-2xl font-bold text-white">{city.name}</h3>
                      <p className="text-sm text-white/90">{city.country}</p>
                    </div>
                  </div>
                  <CardHeader>
                    <CardDescription className="line-clamp-2">{city.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {city.highlights.slice(0, 3).map((highlight, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {highlight}
                        </Badge>
                      ))}
                    </div>
                    <div className="mb-4 space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Wallet className="h-4 w-4" />
                        <span>{city.avgBudget}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{city.recommendedDays}</span>
                      </div>
                    </div>
                    <Button asChild className="w-full">
                      <Link href={`/explore/${slug}`}>
                        도시 정보 보기
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
        <section className="mb-16">
          <div className="mb-6 flex items-center gap-3">
            <Lightbulb className="h-8 w-8 text-yellow-500" />
            <h2 className="text-3xl font-bold text-foreground">{theme.title} 여행 팁</h2>
          </div>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                {theme.tips.map((tip, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {index + 1}
                    </span>
                    <p className="text-foreground/80">{tip}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
        <section className="mb-16">
          <div className="mb-6 flex items-center gap-3">
            <BookOpen className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">관련 여행 가이드</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {theme.relatedGuides.map((guideSlug) => (
              <Card key={guideSlug} className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-base">{guideTitle[guideSlug] || guideSlug}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" size="sm" className="w-full">
                    <Link href={`/guide/${guideSlug}`}>
                      자세히 보기
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        <section className="rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">AI와 함께 여행 계획 세우기</h2>
          <p className="mb-6 text-lg text-foreground/80">
            {theme.title}에 최적화된 맞춤 여행 일정을 AI가 만들어드립니다
          </p>
          <Button asChild size="lg" className="bg-cta text-cta-foreground hover:bg-cta/90">
            <Link href="/chat">
              <Icon className="mr-2 h-5 w-5" />
              여행 계획 시작하기
            </Link>
          </Button>
        </section>
      </main>
      <Footer />
    </div>
  );
}
