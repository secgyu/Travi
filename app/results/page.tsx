"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ShareModal } from "@/components/share-modal";
import { MapPin, ArrowLeft, Download, Edit, Calendar, Save, X, Plus, DollarSign, Loader2, Camera } from "lucide-react";
import GoogleMap from "../../components/results/GoogleMap";
import { usePdfDownload } from "@/hooks/use-pdf-download";
import { useTravelPlan } from "@/hooks/use-travel-plan";
import { WeatherCard } from "@/components/results/weather-card";
import { TravelTips } from "@/components/results/travel-tips";
import { ActivityCard } from "@/components/results/activity-card";
import { toast } from "sonner";

function ResultsLoading() {
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

function ResultsContent() {
  const searchParams = useSearchParams();
  const planId = searchParams.get("id");
  const editParam = searchParams.get("edit");

  const {
    travelPlan,
    isLoading,
    localItinerary,
    weather,
    isWeatherLoading,
    isSaving,
    handleDeleteActivity,
    handleAddActivity,
    handleMoveActivity,
    handleUpdateActivity,
    handleSave,
    handleSaveToMyTrips,
    resetItinerary,
  } = useTravelPlan({ planId });

  const [activeDay, setActiveDay] = useState(1);
  const [isEditMode, setIsEditMode] = useState(editParam === "true");
  const [editingActivity, setEditingActivity] = useState<number | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedActivityIndex, setSelectedActivityIndex] = useState(0);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 (${days[date.getDay()]})`;
  };

  const { isDownloading, downloadPDF } = usePdfDownload({
    travelPlan,
    itinerary: localItinerary,
    formatDate,
    onStart: () => {
      toast("PDF 생성 중...", { description: "잠시만 기다려주세요." });
    },
    onSuccess: () => {
      toast.success("PDF 다운로드 완료!", { description: "파일이 저장되었습니다." });
    },
    onError: () => {
      toast.error("PDF 생성 실패", { description: "PDF 생성 중 오류가 발생했습니다." });
    },
  });

  const currentDay = localItinerary.find((d) => d.day === activeDay) || localItinerary[0];

  const handleDayChange = (day: number) => {
    setActiveDay(day);
    setSelectedActivityIndex(0);
  };

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

  const onSaveComplete = () => {
    setIsEditMode(false);
    setEditingActivity(null);
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
                      disabled={isSaving}
                    >
                      {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                      <span className="hidden md:inline">{isSaving ? "저장중..." : "저장하기"}</span>
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
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 rounded-xl bg-transparent"
                      onClick={downloadPDF}
                      disabled={isDownloading}
                    >
                      {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                      <span className="hidden md:inline">{isDownloading ? "생성중..." : "PDF 다운로드"}</span>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="default"
                      size="sm"
                      className="gap-2 rounded-xl bg-primary"
                      onClick={() => handleSave({ onSuccess: onSaveComplete })}
                    >
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
                        resetItinerary();
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
                  <WeatherCard weather={weather} isLoading={isWeatherLoading} />

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
                        onClick={() => handleDayChange(day.day)}
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
                      <ActivityCard
                        key={idx}
                        activity={activity}
                        idx={idx}
                        isEditMode={isEditMode}
                        isEditing={editingActivity === idx}
                        isSelected={selectedActivityIndex === idx}
                        isFirst={idx === 0}
                        isLast={idx === currentDay.activities.length - 1}
                        activeDay={activeDay}
                        onActivityClick={handleActivityClick}
                        onMoveActivity={handleMoveActivity}
                        onDeleteActivity={handleDeleteActivity}
                        onUpdateActivity={handleUpdateActivity}
                        onToggleEdit={setEditingActivity}
                      />
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

              <TravelTips />
            </div>
          </div>
        </main>

        <Footer />

        <ShareModal open={isShareModalOpen} onOpenChange={setIsShareModalOpen} planId={planId || undefined} />
      </div>
    </>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<ResultsLoading />}>
      <ResultsContent />
    </Suspense>
  );
}
