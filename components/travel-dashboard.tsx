"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Train, Utensils, Camera, Heart, Share2, Cloud, Navigation } from "lucide-react";
import { GiJapan } from "react-icons/gi";

const itinerary = [
  {
    day: 1,
    title: "1일차",
    date: "2025년 3월 15일 (토)",
    activities: [
      {
        time: "오전 9:00",
        title: "시부야 스크램블 교차로",
        subtitle: "渋谷スクランブル交差点",
        type: "관광",
        transport: "야마노테선 → 시부야역 하차 (2번 출구)",
        duration: "도보 5분",
        price: "무료",
        photo: true,
      },
      {
        time: "오전 11:00",
        title: "하라주쿠 다케시타 거리",
        subtitle: "原宿竹下通り",
        type: "쇼핑",
        transport: "도보 15분",
        duration: "2시간",
        price: "₩₩",
        photo: true,
      },
      {
        time: "오후 1:00",
        title: "점심 - 라멘",
        subtitle: "이치란 시부야점 (一蘭)",
        type: "식사",
        transport: "도보 10분",
        duration: "1시간",
        price: "₩15,000원",
        category: "일식",
      },
      {
        time: "오후 3:00",
        title: "메이지 신궁",
        subtitle: "明治神宮",
        type: "관광",
        transport: "야마노테선 → 하라주쿠역",
        duration: "2시간",
        price: "무료",
        photo: true,
      },
      {
        time: "오후 6:00",
        title: "저녁 - 이자카야",
        subtitle: "신주쿠 오모이데 요코초",
        type: "식사",
        transport: "야마노테선 → 신주쿠역",
        duration: "2시간",
        price: "₩35,000원",
        category: "일식",
      },
    ],
  },
  {
    day: 2,
    title: "2일차",
    date: "2025년 3월 16일 (일)",
    activities: [
      {
        time: "오전 8:00",
        title: "츠키지 장외시장",
        subtitle: "築地場外市場",
        type: "관광",
        transport: "히비야선 → 츠키지역",
        duration: "3시간",
        price: "₩₩",
        photo: true,
      },
      {
        time: "오후 12:00",
        title: "아사쿠사 센소지",
        subtitle: "浅草寺",
        type: "관광",
        transport: "긴자선 → 아사쿠사역",
        duration: "2시간",
        price: "무료",
        photo: true,
      },
      {
        time: "오후 3:00",
        title: "스카이트리",
        subtitle: "東京スカイツリー",
        type: "관광",
        transport: "도보 20분",
        duration: "2시간",
        price: "₩25,000원",
        photo: true,
      },
    ],
  },
  {
    day: 3,
    title: "3일차",
    date: "2025년 3월 17일 (월)",
    activities: [
      {
        time: "오전 9:00",
        title: "우에노 공원",
        subtitle: "上野公園",
        type: "관광",
        transport: "야마노테선 → 우에노역",
        duration: "2시간",
        price: "무료",
        photo: true,
      },
      {
        time: "오후 12:00",
        title: "점심 - 돈카츠",
        subtitle: "톤키 (とんき)",
        type: "식사",
        transport: "메구로역",
        duration: "1시간",
        price: "₩18,000원",
        category: "일식",
      },
      {
        time: "오후 2:00",
        title: "긴자 쇼핑",
        subtitle: "銀座",
        type: "쇼핑",
        transport: "긴자선 → 긴자역",
        duration: "3시간",
        price: "₩₩₩",
        photo: false,
      },
    ],
  },
];

export function TravelDashboard() {
  const [activeDay, setActiveDay] = useState(1);

  const currentDay = itinerary.find((d) => d.day === activeDay)!;

  return (
    <section className="px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground flex items-center gap-2">
              도쿄 3일 여행 코스
              <GiJapan className="h-8 w-8 text-primary" />
            </h2>
            <p className="mt-2 text-muted-foreground">2025년 3월 15일 - 3월 17일</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Card className="glass-effect flex items-center gap-2 border-0 px-4 py-2 shadow-md">
              <Cloud className="h-5 w-5 text-secondary" />
              <span className="font-medium text-foreground">맑음 18°C</span>
            </Card>
            <Card className="glass-effect flex items-center gap-2 border-0 px-4 py-2 shadow-md">
              <span className="text-sm text-muted-foreground">예산:</span>
              <span className="font-semibold text-primary">₩500,000원</span>
            </Card>
            <Button variant="outline" size="sm" className="gap-2 rounded-xl bg-card">
              <Heart className="h-4 w-4" />
              저장하기
            </Button>
            <Button variant="outline" size="sm" className="gap-2 rounded-xl bg-card">
              <Share2 className="h-4 w-4" />
              공유하기
            </Button>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="mb-6 flex gap-2">
              {itinerary.map((day) => (
                <Button
                  key={day.day}
                  onClick={() => setActiveDay(day.day)}
                  variant={activeDay === day.day ? "default" : "outline"}
                  className={`flex-1 rounded-xl transition-all ${
                    activeDay === day.day ? "bg-primary text-primary-foreground shadow-lg" : "bg-card hover:bg-accent"
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
                  <div className="p-5">
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="font-semibold text-primary">{activity.time}</span>
                      </div>
                      <Badge variant="secondary" className="rounded-lg">
                        {activity.type}
                      </Badge>
                    </div>
                    <h3 className="mb-1 text-lg font-bold text-foreground">{activity.title}</h3>
                    <p className="mb-3 text-sm text-muted-foreground">{activity.subtitle}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-foreground">
                        <Train className="h-4 w-4 text-secondary" />
                        <span>{activity.transport}</span>
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
            <Card className="sticky top-6 h-[600px] overflow-hidden border-0 shadow-xl lg:h-[800px]">
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
                <div className="absolute bottom-6 left-6 right-6 space-y-3">
                  {currentDay.activities.slice(0, 2).map((activity, idx) => (
                    <div
                      key={idx}
                      className="glass-effect animate-in fade-in slide-in-from-bottom-4 rounded-xl border border-white p-4 shadow-lg"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                          {idx + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">{activity.time}</p>
                        </div>
                        {activity.photo && <Camera className="h-5 w-5 text-cta-foreground" />}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="glass-effect absolute right-6 top-6 rounded-xl border border-white px-4 py-2 shadow-lg">
                  <p className="text-sm font-medium text-foreground">총 이동거리: 12.5km</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
