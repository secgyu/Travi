import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Settings, MapPin, Calendar, Heart, Clock, Edit, Trash2, Share2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createClient } from "@/utils/supabase/server";

export default async function MyPage() {
  // 1. NextAuth 세션 확인
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  // 2. Supabase DB에서 추가 프로필 정보 가져오기
  const supabase = await createClient();
  const { data: dbUser } = await supabase
    .from("users")
    .select("*")
    .eq("id", session.user.id)
    .single();

  const user = {
    name: session.user.name || session.user.email?.split("@")[0] || "사용자",
    email: session.user.email || "",
    profileImage: session.user.image || "/user-avatar.jpg",
    // DB에서 가져온 추가 정보
    travelStyle: dbUser?.preferences?.travelStyle || "미식 & 문화 탐방",
    bio: dbUser?.bio || "",
    memberSince: dbUser?.created_at 
      ? new Date(dbUser.created_at).toLocaleDateString("ko-KR", { year: "numeric", month: "long" })
      : "2025년 11월",
  };

  const trips = [
    {
      id: 1,
      title: "도쿄 3일 여행",
      destination: "일본 도쿄",
      dates: "2025.3.15 - 3.17",
      status: "upcoming",
      image: "/tokyo-cityscape.jpg",
      budget: "₩500,000",
    },
    {
      id: 2,
      title: "오사카 맛집 투어",
      destination: "일본 오사카",
      dates: "2025.4.20 - 4.21",
      status: "planning",
      image: "/osaka-food.jpg",
      budget: "₩300,000",
    },
    {
      id: 3,
      title: "방콕 휴양 여행",
      destination: "태국 방콕",
      dates: "2024.12.10 - 12.15",
      status: "completed",
      image: "/bangkok-temple.jpg",
      budget: "₩800,000",
    },
  ];

  const favorites = [
    {
      id: 1,
      name: "시부야 스크램블 교차로",
      location: "일본 도쿄",
      category: "관광",
    },
    {
      id: 2,
      name: "츠지한 시장",
      location: "일본 도쿄",
      category: "식당",
    },
    {
      id: 3,
      name: "도톤보리",
      location: "일본 오사카",
      category: "관광",
    },
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      upcoming: <Badge className="bg-cta text-cta-foreground">예정</Badge>,
      planning: <Badge variant="outline">계획중</Badge>,
      completed: <Badge variant="secondary">완료</Badge>,
    };
    return badges[status as keyof typeof badges];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/20 via-background to-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-6xl">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user.profileImage || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h1 className="mb-1 text-2xl font-bold text-foreground">{user.name}</h1>
                    <p className="mb-2 text-sm text-muted-foreground">{user.email}</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="gap-1">
                        <MapPin className="h-3 w-3" />
                        {user.travelStyle}
                      </Badge>
                      <Badge variant="outline" className="gap-1">
                        <Calendar className="h-3 w-3" />
                        가입 {user.memberSince}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent" asChild>
                  <Link href="/my/settings">
                    <Settings className="h-4 w-4" />
                    설정
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Section */}
          <Tabs defaultValue="trips" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="trips">내 여행 ({trips.length})</TabsTrigger>
              <TabsTrigger value="favorites">즐겨찾기 ({favorites.length})</TabsTrigger>
              <TabsTrigger value="activity">활동 내역</TabsTrigger>
            </TabsList>

            {/* 내 여행 탭 */}
            <TabsContent value="trips">
              <div className="grid gap-6 md:grid-cols-2">
                {trips.map((trip) => (
                  <Card key={trip.id} className="overflow-hidden transition-all hover:shadow-lg">
                    <div className="h-48 bg-cover bg-center" style={{ backgroundImage: `url(${trip.image})` }} />
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="mb-2">{trip.title}</CardTitle>
                          <CardDescription className="flex flex-col gap-1">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {trip.destination}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {trip.dates}
                            </span>
                          </CardDescription>
                        </div>
                        {getStatusBadge(trip.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">예산</span>
                        <span className="font-semibold text-foreground">{trip.budget}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1 gap-1 bg-transparent" asChild>
                          <Link href={`/results/${trip.id}`}>
                            <Clock className="h-3 w-3" />
                            상세보기
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                          <Share2 className="h-3 w-3" />
                          공유
                        </Button>
                        <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                          <Edit className="h-3 w-3" />
                          편집
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 text-destructive hover:text-destructive bg-transparent"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {trips.length === 0 && (
                <Card className="py-16">
                  <CardContent className="text-center">
                    <MapPin className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 text-lg font-semibold text-foreground">아직 여행 계획이 없습니다</h3>
                    <p className="mb-6 text-sm text-muted-foreground">AI와 함께 나만의 완벽한 여행을 계획해보세요</p>
                    <Button asChild>
                      <Link href="/">여행 계획 시작하기</Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* 즐겨찾기 탭 */}
            <TabsContent value="favorites">
              <div className="grid gap-4">
                {favorites.map((favorite) => (
                  <Card key={favorite.id}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                          <Heart className="h-6 w-6 fill-primary text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{favorite.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {favorite.location} • {favorite.category}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        삭제
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {favorites.length === 0 && (
                <Card className="py-16">
                  <CardContent className="text-center">
                    <Heart className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                    <h3 className="mb-2 text-lg font-semibold text-foreground">즐겨찾기가 비어있습니다</h3>
                    <p className="text-sm text-muted-foreground">마음에 드는 장소를 즐겨찾기에 추가해보세요</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* 활동 내역 탭 */}
            <TabsContent value="activity">
              <Card>
                <CardContent className="py-16 text-center">
                  <Clock className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-semibold text-foreground">활동 내역</h3>
                  <p className="text-sm text-muted-foreground">최근 여행 계획 생성 및 수정 내역이 여기에 표시됩니다</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
