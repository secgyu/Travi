"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShareModal } from "@/components/share-modal";
import { useToast } from "@/hooks/use-toast";
import {
  MapPin,
  Clock,
  Train,
  Utensils,
  Camera,
  Cloud,
  Navigation,
  ArrowLeft,
  Download,
  Edit,
  Calendar,
  Save,
  X,
  Trash2,
  Plus,
  GripVertical,
  DollarSign,
  Lightbulb,
  Smartphone,
  Banknote,
} from "lucide-react";
import { GiJapan } from "react-icons/gi";

const tokyoItinerary = [
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
        price: "변동",
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
        transport: "긴자선 → 신주쿠역",
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
        price: "무료",
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
      {
        time: "오후 6:00",
        title: "저녁 - 야키니쿠",
        subtitle: "긴자 야키니쿠 (銀座 焼肉)",
        type: "식사",
        transport: "긴자선 → 긴자역",
        duration: "2시간",
        price: "₩45,000원",
        category: "일식",
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
        time: "오전 11:00",
        title: "아메요코 시장",
        subtitle: "アメ横",
        type: "쇼핑",
        transport: "도보 5분",
        duration: "2시간",
        price: "변동",
        photo: false,
      },
      {
        time: "오후 1:00",
        title: "점심 - 돈카츠",
        subtitle: "토키 (とんき)",
        type: "식사",
        transport: "메구로역",
        duration: "1시간",
        price: "₩18,000원",
        category: "일식",
      },
      {
        time: "오후 3:00",
        title: "긴자 쇼핑",
        subtitle: "銀座",
        type: "쇼핑",
        transport: "긴자선 → 긴자역",
        duration: "3시간",
        price: "변동",
        photo: false,
      },
      {
        time: "오후 7:00",
        title: "저녁 - 스시",
        subtitle: "긴자 스시 (銀座 寿司)",
        type: "식사",
        transport: "도보 10분",
        duration: "2시간",
        price: "₩80,000원",
        category: "일식",
      },
    ],
  },
];

export default function ResultsPage() {
  const [activeDay, setActiveDay] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingActivity, setEditingActivity] = useState<number | null>(null);
  const [localItinerary, setLocalItinerary] = useState(tokyoItinerary);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const { toast } = useToast();

  const currentDay = localItinerary.find((d) => d.day === activeDay) || localItinerary[0];

  const handleDeleteActivity = (dayNum: number, activityIdx: number) => {
    setLocalItinerary(
      localItinerary.map((day) => {
        if (day.day === dayNum) {
          return {
            ...day,
            activities: day.activities.filter((_, idx) => idx !== activityIdx),
          };
        }
        return day;
      })
    );
    toast({
      title: "장소가 삭제되었습니다",
      description: "일정에서 선택한 장소를 삭제했습니다.",
    });
  };

  const handleAddActivity = (dayNum: number) => {
    const newActivity = {
      time: "시간 선택",
      title: "새 장소",
      subtitle: "",
      type: "관광",
      transport: "이동 방법 입력",
      duration: "소요시간",
      price: "무료",
      photo: false,
    };

    setLocalItinerary(
      localItinerary.map((day) => {
        if (day.day === dayNum) {
          return {
            ...day,
            activities: [...day.activities, newActivity],
          };
        }
        return day;
      })
    );
    toast({
      title: "새 장소가 추가되었습니다",
      description: "상세 정보를 입력하고 저장해주세요.",
    });
  };

  const handleMoveActivity = (dayNum: number, fromIdx: number, direction: "up" | "down") => {
    const toIdx = direction === "up" ? fromIdx - 1 : fromIdx + 1;

    setLocalItinerary(
      localItinerary.map((day) => {
        if (day.day === dayNum) {
          const newActivities = [...day.activities];
          const temp = newActivities[fromIdx];
          newActivities[fromIdx] = newActivities[toIdx];
          newActivities[toIdx] = temp;
          return {
            ...day,
            activities: newActivities,
          };
        }
        return day;
      })
    );
  };

  const handleSave = () => {
    setIsEditMode(false);
    setEditingActivity(null);
    toast({
      title: "저장되었습니다",
      description: "여행 계획이 성공적으로 저장되었습니다.",
    });
  };

  const handleSaveToMyTrips = () => {
    toast({
      title: "내 여행에 저장되었습니다",
      description: "마이페이지에서 확인하실 수 있습니다.",
    });
  };

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

              <div className="flex items-center gap-3">
                {!isEditMode ? (
                  <>
                    <Button
                      variant="default"
                      size="sm"
                      className="gap-2 rounded-xl bg-primary"
                      onClick={handleSaveToMyTrips}
                    >
                      <Save className="h-4 w-4" />
                      <span className="hidden md:inline">저장하기</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 rounded-xl bg-transparent"
                      onClick={() => setIsShareModalOpen(true)}
                    >
                      <span className="hidden md:inline">공유하기</span>
                      <span className="md:hidden">공유</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 rounded-xl bg-transparent"
                      onClick={() => setIsEditMode(true)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="hidden md:inline">수정하기</span>
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2 rounded-xl bg-transparent">
                      <Download className="h-4 w-4" />
                      <span className="hidden md:inline">PDF 다운로드</span>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="default" size="sm" className="gap-2 rounded-xl bg-primary" onClick={handleSave}>
                      <Save className="h-4 w-4" />
                      <span className="hidden md:inline">저장하기</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 rounded-xl bg-transparent"
                      onClick={() => {
                        setIsEditMode(false);
                        setEditingActivity(null);
                        setLocalItinerary(tokyoItinerary);
                      }}
                    >
                      <X className="h-4 w-4" />
                      <span className="hidden md:inline">취소</span>
                    </Button>
                  </>
                )}
              </div>
            </div>
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
                  <h1 className="mb-3 text-3xl font-bold text-foreground md:text-4xl flex items-center gap-2">
                    도쿄 3일 여행 코스
                    <GiJapan className="h-8 w-8 text-primary" />
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <span>2025년 3월 15일 - 3월 17일</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      <span>도쿄, 일본</span>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-row gap-3 lg:w-auto lg:flex-col">
                  <Card className="glass-effect flex flex-1 items-center gap-3 border-0 px-4 py-3 shadow-md lg:flex-none lg:px-6">
                    <Cloud className="h-6 w-6 text-secondary" />
                    <div>
                      <p className="text-xs text-muted-foreground md:text-sm">날씨</p>
                      <p className="text-sm font-semibold text-foreground md:text-base">맑음 18°C</p>
                    </div>
                  </Card>

                  <Card className="glass-effect flex flex-1 items-center gap-3 border-0 px-4 py-3 shadow-md lg:flex-none lg:px-6">
                    <DollarSign className="h-6 w-6 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground md:text-sm">예상 경비</p>
                      <p className="text-lg font-bold text-primary md:text-xl">₩850,000원</p>
                    </div>
                  </Card>
                </div>
              </div>

              {isEditMode && (
                <div className="mb-6 rounded-xl border-2 border-cta bg-cta/10 p-4">
                  <div className="flex items-center gap-3">
                    <Edit className="h-5 w-5 text-cta-foreground" />
                    <div>
                      <p className="font-semibold text-cta-foreground">편집 모드</p>
                      <p className="text-sm text-muted-foreground">
                        장소를 클릭하여 수정하거나, 삭제/추가 버튼을 사용하세요. 위아래 화살표로 순서를 변경할 수
                        있습니다.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid gap-6 lg:grid-cols-5">
                <div className="lg:col-span-2">
                  <div className="scrollbar-hide -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
                    {localItinerary.map((day) => (
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
                      <Card
                        key={idx}
                        className={`overflow-hidden border-0 shadow-md transition-all hover:shadow-xl ${
                          isEditMode ? "border-2 border-dashed border-primary" : ""
                        }`}
                      >
                        <div className="p-4 md:p-5">
                          {isEditMode && (
                            <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  disabled={idx === 0}
                                  onClick={() => handleMoveActivity(activeDay, idx, "up")}
                                >
                                  ↑
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  disabled={idx === currentDay.activities.length - 1}
                                  onClick={() => handleMoveActivity(activeDay, idx, "down")}
                                >
                                  ↓
                                </Button>
                                <GripVertical className="h-4 w-4 text-muted-foreground" />
                              </div>

                              <div className="flex items-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="gap-2 text-primary"
                                  onClick={() => setEditingActivity(editingActivity === idx ? null : idx)}
                                >
                                  <Edit className="h-4 w-4" />
                                  {editingActivity === idx ? "완료" : "수정"}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="gap-2 text-destructive"
                                  onClick={() => handleDeleteActivity(activeDay, idx)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  삭제
                                </Button>
                              </div>
                            </div>
                          )}

                          {isEditMode && editingActivity === idx ? (
                            <div className="space-y-4">
                              <div>
                                <Label>시간</Label>
                                <Input defaultValue={activity.time} className="mt-1" />
                              </div>
                              <div>
                                <Label>장소명</Label>
                                <Input defaultValue={activity.title} className="mt-1" />
                              </div>
                              <div>
                                <Label>현지명</Label>
                                <Input defaultValue={activity.subtitle} className="mt-1" />
                              </div>
                              <div>
                                <Label>이동 방법</Label>
                                <Input defaultValue={activity.transport} className="mt-1" />
                              </div>
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <Label>소요 시간</Label>
                                  <Input defaultValue={activity.duration} className="mt-1" />
                                </div>
                                <div>
                                  <Label>예상 비용</Label>
                                  <Input defaultValue={activity.price} className="mt-1" />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <>
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
                                <div className="flex items-center gap-2 text-sm text-foreground">
                                  <Train className="h-4 w-4 text-secondary" />
                                  <span>{activity.transport}</span>
                                </div>

                                <div className="flex items-center gap-4 text-sm">
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <Navigation className="h-4 w-4" />
                                    {activity.duration}
                                  </div>
                                  <div className="flex items-center gap-2 font-medium text-forest">
                                    {activity.price}
                                  </div>
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
                            </>
                          )}
                        </div>
                      </Card>
                    ))}
                    {isEditMode && (
                      <Button
                        variant="outline"
                        className="w-full gap-2 rounded-xl border-2 border-dashed border-primary py-6 hover:bg-primary/5 bg-transparent"
                        onClick={() => handleAddActivity(activeDay)}
                      >
                        <Plus className="h-5 w-5" />
                        새로운 장소 추가
                      </Button>
                    )}
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
                <h2 className="mb-6 text-2xl font-bold text-foreground flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 text-primary" />
                  여행 팁
                </h2>
                <div className="grid gap-4 md:grid-cols-3">
                  <Card className="border-0 p-6 shadow-md">
                    <div className="mb-3">
                      <Train className="h-8 w-8 text-secondary" />
                    </div>
                    <h3 className="mb-2 font-semibold text-foreground">교통패스</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      도쿄 메트로 72시간 패스를 구매하면 1,500엔으로 무제한 이용 가능합니다.
                    </p>
                  </Card>

                  <Card className="border-0 p-6 shadow-md">
                    <div className="mb-3">
                      <Smartphone className="h-8 w-8 text-secondary" />
                    </div>
                    <h3 className="mb-2 font-semibold text-foreground">유심/포켓와이파이</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      공항에서 포켓와이파이를 대여하거나 현지 유심을 구매하세요.
                    </p>
                  </Card>

                  <Card className="border-0 p-6 shadow-md">
                    <div className="mb-3">
                      <Banknote className="h-8 w-8 text-secondary" />
                    </div>
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

        <ShareModal open={isShareModalOpen} onOpenChange={setIsShareModalOpen} />
      </div>
    </>
  );
}
