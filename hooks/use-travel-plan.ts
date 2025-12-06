"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRequireAuth } from "@/hooks/use-require-auth";
import type { Activity, DayItinerary, TravelPlan, WeatherData } from "@/types/results";
import { track, tag, captureWithTags } from "@/lib/sentry";

interface UseTravelPlanProps {
  planId: string | null;
}

export function useTravelPlan({ planId }: UseTravelPlanProps) {
  const { isLoading: authLoading, requireAuth } = useRequireAuth();

  const [travelPlan, setTravelPlan] = useState<TravelPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [localItinerary, setLocalItinerary] = useState<DayItinerary[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isWeatherLoading, setIsWeatherLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (planId) {
      fetchTravelPlan(planId);
    } else {
      setIsLoading(false);
      toast.error("오류", { description: "여행 계획 ID가 필요합니다." });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planId]);

  useEffect(() => {
    if (travelPlan?.destination && travelPlan.destination !== "여행지") {
      const cityName = travelPlan.destination.split(",")[0].trim();
      if (cityName && cityName !== "여행지") {
        fetchWeather(cityName);
      }
    }
  }, [travelPlan?.destination]);

  const fetchTravelPlan = async (id: string) => {
    track.travel.viewPlan(id);

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

        // 여행지 태그 설정
        tag.travel.destination(result.data.destination);
        tag.feature("travel-plan");
      } else {
        throw new Error("여행 계획 데이터가 올바르지 않습니다");
      }
    } catch (error) {
      captureWithTags.travel(error as Error, "unknown", { planId: id });
      toast.error("오류", { description: "여행 계획을 불러오는데 실패했습니다." });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeather = async (destination: string) => {
    try {
      setIsWeatherLoading(true);
      const response = await fetch(`/api/weather?city=${encodeURIComponent(destination)}&days=3`);

      if (!response.ok) {
        throw new Error("날씨 정보를 가져올 수 없습니다");
      }

      const result = await response.json();

      if (result.success && result.data) {
        setWeather(result.data);
      }
    } finally {
      setIsWeatherLoading(false);
    }
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
    toast.success("장소가 삭제되었습니다", { description: "일정에서 선택한 장소를 삭제했습니다." });
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
    toast.success("새 장소가 추가되었습니다", { description: "상세 정보를 입력하고 저장해주세요." });
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

  const handleUpdateActivity = (dayNum: number, activityIdx: number, field: keyof Activity, value: string | boolean) => {
    setLocalItinerary(
      localItinerary.map((day) => {
        if (day.day === dayNum) {
          return {
            ...day,
            activities: day.activities.map((activity, idx) => {
              if (idx === activityIdx) {
                return { ...activity, [field]: value };
              }
              return activity;
            }),
          };
        }
        return day;
      })
    );
  };

  const handleSave = async (callbacks?: { onSuccess?: () => void }) => {
    if (!travelPlan?.id) return;
    if (authLoading) return;
    if (!requireAuth({ callbackUrl: `/results?id=${planId}`, description: "여행 계획을 저장하려면 로그인해주세요." }))
      return;

    track.travel.savePlan(travelPlan.destination, travelPlan.id);

    try {
      const response = await fetch(`/api/travel-plans/${travelPlan.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...travelPlan, itinerary: localItinerary }),
      });

      if (!response.ok) {
        throw new Error("저장에 실패했습니다");
      }

      toast.success("저장되었습니다", { description: "여행 계획이 성공적으로 저장되었습니다." });
      callbacks?.onSuccess?.();
    } catch (error) {
      captureWithTags.travel(error as Error, travelPlan.destination, {
        action: "save",
        planId: travelPlan.id,
      });
      toast.error("저장 실패", { description: "여행 계획 저장에 실패했습니다." });
    }
  };

  const handleSaveToMyTrips = async () => {
    if (authLoading) return;
    if (!requireAuth({ callbackUrl: `/results?id=${planId}`, description: "여행 계획을 저장하려면 로그인해주세요." }))
      return;
    if (!travelPlan?.id) return;

    track.travel.saveToMyTrips(travelPlan.destination, travelPlan.id);

    try {
      setIsSaving(true);

      const response = await fetch(`/api/travel-plans/${travelPlan.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...travelPlan, itinerary: localItinerary }),
      });

      if (!response.ok) {
        throw new Error("저장에 실패했습니다");
      }

      toast.success("내 여행에 저장되었습니다", { description: "마이페이지에서 확인하실 수 있습니다." });
    } catch (error) {
      captureWithTags.travel(error as Error, travelPlan.destination, {
        action: "saveToMyTrips",
        planId: travelPlan.id,
      });
      toast.error("저장 실패", { description: "여행 계획 저장에 실패했습니다. 다시 시도해주세요." });
    } finally {
      setIsSaving(false);
    }
  };

  const resetItinerary = () => {
    if (travelPlan) {
      setLocalItinerary(travelPlan.itinerary);
    }
  };

  return {
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
  };
}

