"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import {
  MapPin,
  Clock,
  Train,
  Utensils,
  Camera,
  Cloud,
  Navigation,
  ArrowLeft,
  Calendar,
  Info,
  Sparkles,
} from "lucide-react";

type Activity = {
  time: string;
  title: string;
  subtitle: string;
  type: string;
  transport: string;
  duration: string;
  price: string;
  photo: boolean;
  category?: string;
};

type Day = {
  day: number;
  title: string;
  date: string;
  activities: Activity[];
};

type DemoData = {
  title: string;
  dates: string;
  location: string;
  budget: string;
  itinerary: Day[];
};

export function DemoResultsClient({ data, city }: { data: DemoData; city: string }) {
  const [activeDay, setActiveDay] = useState(1);

  const currentDay = data.itinerary.find((d) => d.day === activeDay) || data.itinerary[0];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-accent/30 via-background to-background">
        <div className="sticky top-16 z-40 border-b border-border bg-background/80 backdrop-blur-lg">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/">
                <Button variant="ghost" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden md:inline">메인으로</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border-b border-primary/20 px-4 py-4">
          <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center gap-4 text-primary">
            <div className="flex items-center gap-3">
              <Info className="h-5 w-5 shrink-0" />
              <p className="font-medium">
                현재 <strong>{city === "osaka" ? "오사카" : "도쿄"} 예시 일정</strong>을 보고 계십니다. AI 채팅을 통해
                나만의 맞춤형 일정을 만들어보세요!
              </p>
            </div>
            <Link href="/chat" className="md:ml-auto">
              <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <Sparkles className="h-4 w-4" />내 일정 만들기
              </Button>
            </Link>
          </div>
        </div>

        <main className="px-4 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="glass-effect mb-8 overflow-hidden rounded-3xl border border-white p-4 shadow-xl md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-6">
                <div className="w-full lg:w-auto">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-cta/10 px-4 py-2 text-sm font-semibold text-cta-foreground">
                    AI 추천 여행 일정
                  </div>
                  <h1 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">{data.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <span>{data.dates}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      <span>{data.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-row gap-3 lg:w-auto lg:flex-col">
                  <Card className="glass-effect flex flex-1 items-center gap-3 border-0 px-4 py-3 shadow-md lg:flex-none lg:px-6">
                    <Cloud className="h-6 w-6 text-secondary" />
                    <div>
                      <p className="text-xs text-muted-foreground md:text-sm">날씨</p>
                      <p className="font-semibold text-foreground md:text-base">맑음 18°C</p>
                    </div>
                  </Card>

                  <Card className="glass-effect flex flex-1 items-center gap-3 border-0 px-4 py-3 shadow-md lg:flex-none lg:px-6">
                    <span className="text-2xl">💰</span>
                    <div>
                      <p className="text-xs text-muted-foreground md:text-sm">예상 경비</p>
                      <p className="text-lg font-bold text-primary md:text-xl">{data.budget}</p>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-5">
                <div className="lg:col-span-2">
                  <div className="scrollbar-hide -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
                    {data.itinerary.map((day) => (
                      <Button
                        key={day.day}
                        onClick={() => setActiveDay(day.day)}
                        variant={activeDay === day.day ? "default" : "outline"}
                        className={`flex-none rounded-xl transition-all ${
                          activeDay === day.day
                            ? "bg-primary text-primary-foreground shadow-lg"
                            : "bg-card hover:bg-accent"
                        }`}
                      >
                        {day.title}
                      </Button>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div className="mb-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 p-4">
                      <p className="text-center text-lg font-semibold text-foreground">{currentDay.date}</p>
                    </div>

                    {currentDay.activities.map((activity, idx) => (
                      <Card key={idx} className="overflow-hidden border-0 shadow-md transition-all hover:shadow-xl">
                        <div className="p-4 md:p-5">
                          <div className="mb-3 flex items-start justify-between">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-primary" />
                              <span className="font-semibold text-primary">{activity.time}</span>
                            </div>
                            <Badge variant="secondary" className="rounded-lg text-xs md:text-sm">
                              {activity.type}
                            </Badge>
                          </div>

                          <h3 className="mb-1 text-lg font-bold text-foreground md:text-xl">{activity.title}</h3>
                          <p className="mb-3 text-sm text-muted-foreground md:text-base">{activity.subtitle}</p>

                          <div className="space-y-2">
                            <div className="flex items-start gap-2 text-sm text-foreground">
                              <Train className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                              <span className="leading-relaxed">{activity.transport}</span>
                            </div>

                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <Navigation className="h-4 w-4" />
                                {activity.duration}
                              </div>
                              <div className="flex items-center gap-2 font-medium text-forest">{activity.price}</div>
                            </div>

                            {activity.category && (
                              <div className="flex items-center gap-2 text-sm">
                                <Utensils className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{activity.category}</span>
                              </div>
                            )}

                            {activity.photo && (
                              <div className="mt-3 flex items-center gap-2 rounded-lg bg-cta/10 px-3 py-2">
                                <Camera className="h-4 w-4 text-cta-foreground" />
                                <span className="text-sm font-medium text-cta-foreground">포토존 추천</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-3">
                  <Card className="sticky top-24 h-[400px] overflow-hidden border-0 shadow-xl lg:h-[800px]">
                    <div className="relative h-full w-full bg-gradient-to-br from-accent/20 to-secondary/20">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="mx-auto mb-4 h-16 w-16 text-primary" />
                          <p className="text-lg font-semibold text-foreground">네이버 지도 연동</p>
                          <p className="mt-2 text-sm text-muted-foreground">
                            실제 서비스에서는 네이버 지도 API를 통해
                            <br />
                            상세한 위치 정보를 표시합니다
                          </p>
                        </div>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 space-y-3 md:bottom-6 md:left-6 md:right-6">
                        {currentDay.activities.slice(0, 2).map((activity, idx) => (
                          <div
                            key={idx}
                            className="glass-effect animate-in fade-in slide-in-from-bottom-4 rounded-xl border border-white p-3 shadow-lg md:p-4"
                            style={{ animationDelay: `${idx * 100}ms` }}
                          >
                            <div className="flex items-start gap-3">
                              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                                {idx + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="truncate font-semibold text-foreground">{activity.title}</p>
                                <p className="truncate text-sm text-muted-foreground">{activity.time}</p>
                              </div>
                              {activity.photo && <Camera className="h-5 w-5 shrink-0 text-cta-foreground" />}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="glass-effect absolute right-3 top-3 rounded-xl border border-white px-4 py-2 shadow-lg md:right-6 md:top-6">
                        <p className="text-sm font-medium text-foreground">총 이동거리: 12.5km</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="mt-12">
                <h2 className="mb-6 text-2xl font-bold text-foreground">여행 팁 💡</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="border-0 p-6 shadow-md">
                    <div className="mb-3 text-3xl">🚇</div>
                    <h3 className="mb-2 font-semibold text-foreground">교통패스</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {city === "osaka"
                        ? "오사카 주유패스를 구매하면 대중교통 무제한 이용과 관광지 할인을 받을 수 있습니다."
                        : "도쿄 메트로 72시간 패스를 구매하면 1,500엔으로 무제한 이용 가능합니다."}
                    </p>
                  </Card>

                  <Card className="border-0 p-6 shadow-md">
                    <div className="mb-3 text-3xl">📱</div>
                    <h3 className="mb-2 font-semibold text-foreground">유심/포켓와이파이</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      공항에서 포켓와이파이를 대여하거나 현지 유심을 구매하세요.
                    </p>
                  </Card>

                  <Card className="border-0 p-6 shadow-md">
                    <div className="mb-3 text-3xl">💴</div>
                    <h3 className="mb-2 font-semibold text-foreground">환전</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      현금 위주 사용이 많으니 출국 전 충분한 엔화를 준비하세요.
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
