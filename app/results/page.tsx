"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
  Loader2,
  ShieldCheck,
} from "lucide-react";
import GoogleMap from "./GoogleMap";

interface Activity {
  time: string;
  title: string;
  subtitle: string;
  type: string;
  transport: string;
  duration: string;
  price: string;
  photo: boolean;
  category?: string;
  lat?: number;
  lng?: number;
  address?: string;
  gps_confidence?: "high" | "medium" | "low";
}

interface DayItinerary {
  day: number;
  title: string;
  date: string;
  activities: Activity[];
}

interface TravelPlan {
  id: string;
  title: string;
  destination: string;
  start_date: string;
  end_date: string;
  budget: number;
  currency: string;
  itinerary: DayItinerary[];
  travel_style?: string[];
  status: string;
}

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("id");

  const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingActivity, setEditingActivity] = useState<number | null>(null);
  const [localItinerary, setLocalItinerary] = useState<DayItinerary[]>([]);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedActivityIndex, setSelectedActivityIndex] = useState(0);

  const { toast } = useToast();

  useEffect(() => {
    if (planId) {
      fetchTravelPlan(planId);
    } else {
      setIsLoading(false);
      toast({
        title: "오류",
        description: "여행 계획 ID가 필요합니다.",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planId]);

  const fetchTravelPlan = async (id: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/travel-plans/${id}`);

      if (!response.ok) {
        throw new Error("여행 계획을 불러올 수 없습니다");
      }

      const result = await response.json();

      if (result.success && result.data) {
        setTravelPlan(result.data);
        setLocalItinerary(result.data.itinerary || []);
      } else {
        throw new Error("여행 계획 데이터가 올바르지 않습니다");
      }
    } catch {
      toast({
        title: "오류",
        description: "여행 계획을 불러오는데 실패했습니다.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const currentDay = localItinerary.find((d) => d.day === activeDay) || localItinerary[0];

  useEffect(() => {
    setSelectedActivityIndex(0);
  }, [activeDay]);

  const handleActivityClick = (idx: number) => {
    if (!isEditMode) {
      setSelectedActivityIndex(idx);
    }
  };

  const selectedActivity = currentDay?.activities?.[selectedActivityIndex];
  const mapCenter =
    selectedActivity?.lat && selectedActivity?.lng
      ? { lat: selectedActivity.lat, lng: selectedActivity.lng }
      : currentDay?.activities?.[0]?.lat && currentDay?.activities?.[0]?.lng
      ? { lat: currentDay.activities[0].lat, lng: currentDay.activities[0].lng }
      : null;

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-accent/30 via-background to-background flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
            <p className="text-lg font-semibold text-foreground">여행 계획을 불러오는 중...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!travelPlan) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-accent/30 via-background to-background flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">여행 계획을 찾을 수 없습니다</h2>
            <p className="text-muted-foreground mb-6">요청하신 여행 계획이 존재하지 않거나 삭제되었습니다.</p>
            <Link href="/">
              <Button variant="default" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                메인으로 돌아가기
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${days[date.getDay()]})`;
  };

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
    const newActivity: Activity = {
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

  const handleSave = async () => {
    if (!travelPlan?.id) return;

    try {
      const response = await fetch(`/api/travel-plans/${travelPlan.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...travelPlan,
          itinerary: localItinerary,
        }),
      });

      if (!response.ok) {
        throw new Error("저장에 실패했습니다");
      }

      setIsEditMode(false);
      setEditingActivity(null);
      toast({
        title: "저장되었습니다",
        description: "여행 계획이 성공적으로 저장되었습니다.",
      });
    } catch {
      toast({
        title: "저장 실패",
        description: "여행 계획 저장에 실패했습니다.",
      });
    }
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
                        if (travelPlan) {
                          setLocalItinerary(travelPlan.itinerary);
                        }
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
                    {travelPlan.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      <span>
                        {formatDate(travelPlan.start_date)} - {formatDate(travelPlan.end_date)}
                      </span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      <span>{travelPlan.destination}</span>
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

                  <Card className="glass-effect flex flex-1 items-center gap-3 border-0 px-4 py-3 shadow-md lg:flex-none lg:px-6 mb-4">
                    <DollarSign className="h-6 w-6 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground md:text-sm">예상 경비</p>
                      <p className="text-lg font-bold text-primary md:text-xl">
                        ₩{travelPlan.budget?.toLocaleString() || "0"}원
                      </p>
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
                        onClick={() => handleActivityClick(idx)}
                        className={`overflow-hidden shadow-md transition-all hover:shadow-xl cursor-pointer ${
                          isEditMode
                            ? "border-2 border-dashed border-primary"
                            : selectedActivityIndex === idx
                            ? "ring-2 ring-primary border-primary bg-primary/5"
                            : "border-0"
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
                    {currentDay && currentDay.activities && currentDay.activities.length > 0 && mapCenter ? (
                      <div className="relative h-full w-full">
                        <GoogleMap
                          key={`map-${activeDay}-${currentDay.activities.length}`}
                          center={mapCenter}
                          level={15}
                          markers={currentDay.activities
                            .filter((a) => a.lat && a.lng)
                            .map((a) => ({
                              lat: a.lat!,
                              lng: a.lng!,
                              title: a.title,
                            }))}
                          selectedIndex={selectedActivityIndex}
                        />
                        {selectedActivity && (
                          <div className="absolute bottom-3 left-3 right-3 md:bottom-6 md:left-6 md:right-6 pointer-events-none">
                            <div
                              key={selectedActivityIndex}
                              className="glass-effect animate-in fade-in slide-in-from-bottom-4 rounded-xl border border-primary/50 p-3 shadow-lg md:p-4 pointer-events-auto"
                            >
                              <div className="flex items-start gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                                  {selectedActivityIndex + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="truncate font-semibold text-foreground">{selectedActivity.title}</p>
                                  <p className="truncate text-sm text-muted-foreground">{selectedActivity.subtitle}</p>
                                  <p className="truncate text-xs text-primary mt-1">{selectedActivity.time}</p>
                                </div>
                                {selectedActivity.photo && <Camera className="h-5 w-5 shrink-0 text-cta-foreground" />}
                              </div>
                            </div>
                          </div>
                        )}
                        <div className="glass-effect absolute right-3 top-3 rounded-xl border border-white px-4 py-2 shadow-lg md:right-6 md:top-6">
                          <p className="text-sm font-medium text-foreground">총 이동거리: 12.5km</p>
                        </div>
                      </div>
                    ) : (
                      <div className="relative h-full w-full bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center">
                        <div className="text-center">
                          <MapPin className="mx-auto mb-4 h-16 w-16 text-muted-foreground" />
                          <p className="text-lg font-semibold text-foreground">GPS 좌표가 없습니다</p>
                          <p className="mt-2 text-sm text-muted-foreground px-4">
                            AI 채팅으로 생성된 일정은 자동으로 GPS 좌표를 포함합니다
                          </p>
                        </div>
                      </div>
                    )}
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
                      <ShieldCheck className="h-8 w-8 text-secondary" />
                    </div>
                    <h3 className="mb-2 font-semibold text-foreground">여행자 보험</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      해외 의료비는 매우 비싸니 출국 전 여행자 보험에 꼭 가입하세요.
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
                      현금 위주 사용이 많으니 출국 전 충분한 화폐를 준비하세요.
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
