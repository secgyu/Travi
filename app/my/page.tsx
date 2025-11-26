import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TripCard } from "@/components/my/trip-card";
import { Settings, MapPin, Calendar, Heart, Clock } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createClient } from "@/utils/supabase/server";

export default async function MyPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const supabase = await createClient();
  const { data: dbUser } = await supabase.from("users").select("*").eq("id", session.user.id).single();

  const user = {
    name: session.user.name || session.user.email?.split("@")[0] || "사용자",
    email: session.user.email || "",
    profileImage: session.user.image || "/user-avatar.jpg",
    travelStyle: dbUser?.preferences?.travelStyle || "미식 & 문화 탐방",
    bio: dbUser?.bio || "",
    memberSince: dbUser?.created_at
      ? new Date(dbUser.created_at).toLocaleDateString("ko-KR", { year: "numeric", month: "long" })
      : "2025년 11월",
  };

  let { data: travelPlans, error: plansError } = await supabase
    .from("travel_plans")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if ((!travelPlans || travelPlans.length === 0) && session.user.email) {
    const { data: dbUserByEmail } = await supabase.from("users").select("id").eq("email", session.user.email).single();

    if (dbUserByEmail) {
      const { data: retryPlans } = await supabase
        .from("travel_plans")
        .select("*")
        .eq("user_id", dbUserByEmail.id)
        .order("created_at", { ascending: false });

      if (retryPlans && retryPlans.length > 0) {
        travelPlans = retryPlans;
      }
    }
  }

  const trips = (travelPlans || []).map((plan) => {
    const startDate = new Date(plan.start_date);
    const endDate = new Date(plan.end_date);
    const today = new Date();

    let status = "planning";
    if (endDate < today) {
      status = "completed";
    } else if (startDate <= today && endDate >= today) {
      status = "ongoing";
    } else if (startDate > today) {
      status = "upcoming";
    }

    const dateFormat = (date: Date) =>
      `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(
        2,
        "0"
      )}`;

    return {
      id: plan.id,
      title: plan.title,
      destination: plan.destination,
      dates: `${dateFormat(startDate)} - ${dateFormat(endDate)}`,
      status,
      image: `/placeholder-${plan.destination.toLowerCase()}.jpg`,
      budget: plan.budget ? `₩${plan.budget.toLocaleString()}` : "미정",
    };
  });

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/20 via-background to-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-6xl">
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

          <Tabs defaultValue="trips" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="trips">내 여행 ({trips.length})</TabsTrigger>
              <TabsTrigger value="favorites">즐겨찾기 ({favorites.length})</TabsTrigger>
              <TabsTrigger value="activity">활동 내역</TabsTrigger>
            </TabsList>

            <TabsContent value="trips">
              <div className="grid gap-6 md:grid-cols-2">
                {trips.map((trip) => (
                  <TripCard key={trip.id} trip={trip} />
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
