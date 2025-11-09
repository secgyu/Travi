import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, TrendingUp, Utensils, Landmark, ShoppingBag, Mountain, Plane } from "lucide-react";

export default function ExplorePage() {
  const popularDestinations = [
    {
      city: "도쿄",
      slug: "tokyo",
      country: "일본",
      emoji: "🗼",
      description: "현대와 전통이 공존하는 매력적인 도시",
      image: "/tokyo-cityscape.jpg",
      tags: ["쇼핑", "맛집", "문화"],
      avgBudget: "₩500,000",
      travelTime: "3-5일",
    },
    {
      city: "오사카",
      slug: "osaka",
      country: "일본",
      emoji: "🏯",
      description: "일본의 부엌, 먹거리 천국",
      image: "/osaka-food.jpg",
      tags: ["맛집", "야경", "관광"],
      avgBudget: "₩450,000",
      travelTime: "2-4일",
    },
    {
      city: "방콕",
      slug: "bangkok",
      country: "태국",
      emoji: "🛕",
      description: "황금 사원과 열대의 활력",
      image: "/bangkok-temple.jpg",
      tags: ["문화", "쇼핑", "맛집"],
      avgBudget: "₩400,000",
      travelTime: "3-5일",
    },
    {
      city: "파리",
      slug: "paris",
      country: "프랑스",
      emoji: "🗼",
      description: "낭만과 예술의 도시",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&q=80",
      tags: ["문화", "예술", "낭만"],
      avgBudget: "₩1,200,000",
      travelTime: "5-7일",
    },
    {
      city: "뉴욕",
      slug: "newyork",
      country: "미국",
      emoji: "🗽",
      description: "세계의 중심, 꿈의 도시",
      image: "https://images.unsplash.com/photo-1496442226666-3f8f99389edd?w=500&q=80",
      tags: ["쇼핑", "문화", "랜드마크"],
      avgBudget: "₩1,500,000",
      travelTime: "5-7일",
    },
    {
      city: "싱가포르",
      slug: "singapore",
      country: "싱가포르",
      emoji: "🦁",
      description: "미래 도시와 다문화의 조화",
      image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=500&q=80",
      tags: ["관광", "맛집", "쇼핑"],
      avgBudget: "₩700,000",
      travelTime: "3-4일",
    },
  ];

  const themes = [
    {
      title: "미식 투어",
      icon: Utensils,
      description: "현지 맛집과 전통 음식을 찾아 떠나는 여행",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      destinations: ["오사카", "방콕", "타이베이"],
    },
    {
      title: "문화 탐방",
      icon: Landmark,
      description: "역사와 문화유산을 체험하는 여행",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      destinations: ["교토", "로마", "아테네"],
    },
    {
      title: "쇼핑 천국",
      icon: ShoppingBag,
      description: "쇼핑과 트렌디한 거리를 즐기는 여행",
      color: "text-pink-500",
      bgColor: "bg-pink-50",
      destinations: ["도쿄", "뉴욕", "밀라노"],
    },
    {
      title: "자연 힐링",
      icon: Mountain,
      description: "자연 속에서 힐링하는 여유로운 여행",
      color: "text-green-500",
      bgColor: "bg-green-50",
      destinations: ["제주", "뉴질랜드", "스위스"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/20 via-background to-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Plane className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">여행지 둘러보기</h1>
          </div>
          <p className="text-lg text-foreground/80">인기 여행지를 둘러보고 AI와 함께 나만의 여행을 계획하세요</p>
        </div>

        {/* Trending Badge */}
        <div className="mb-8 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">인기 여행지</h2>
          <Badge variant="secondary" className="ml-2">
            HOT
          </Badge>
        </div>

        {/* Popular Destinations Grid */}
        <div className="mb-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularDestinations.map((destination, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.city}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="text-4xl">{destination.emoji}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">{destination.city}</h3>
                    <p className="text-sm text-white/90">{destination.country}</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="mb-4 text-sm text-foreground/80">{destination.description}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {destination.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                  <span>예산: {destination.avgBudget}</span>
                  <span>기간: {destination.travelTime}</span>
                </div>
                <Button asChild className="w-full" size="sm">
                  <Link href={`/explore/${destination.slug}`}>
                    <MapPin className="mr-2 h-4 w-4" />
                    자세히 보기
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Theme Section */}
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
                  <Link href="/chat">자세히 보기</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
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
