"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRequireAuth } from "@/hooks/use-require-auth";
import type { Activity, DayItinerary, TravelPlan, WeatherData } from "@/types/results";
import { track, tag, captureWithTags } from "@/lib/sentry";

export const travelPlanKeys = {
  all: ["travel-plans"] as const,
  detail: (id: string) => ["travel-plans", id] as const,
  weather: (city: string) => ["weather", city] as const,
};

async function fetchTravelPlan(id: string): Promise<TravelPlan> {
  const response = await fetch(`/api/travel-plans/${id}`);
  if (!response.ok) {
    throw new Error("여행 계획을 불러올 수 없습니다");
  }
  const result = await response.json();
  if (!result.success || !result.data) {
    throw new Error("여행 계획 데이터가 올바르지 않습니다");
  }
  return result.data;
}

async function fetchWeather(city: string): Promise<WeatherData> {
  const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}&days=3`);
  if (!response.ok) {
    throw new Error("날씨 정보를 가져올 수 없습니다");
  }
  const result = await response.json();
  if (!result.success || !result.data) {
    throw new Error("날씨 데이터가 올바르지 않습니다");
  }
  return result.data;
}

async function updateTravelPlan(plan: TravelPlan & { itinerary: DayItinerary[] }): Promise<TravelPlan> {
  const response = await fetch(`/api/travel-plans/${plan.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plan),
  });
  if (!response.ok) {
    throw new Error("저장에 실패했습니다");
  }
  const result = await response.json();
  return result.data;
}

interface UseTravelPlanProps {
  planId: string | null;
}

export function useTravelPlan({ planId }: UseTravelPlanProps) {
  const queryClient = useQueryClient();
  const { isLoading: authLoading, requireAuth } = useRequireAuth();
  const [localItinerary, setLocalItinerary] = useState<DayItinerary[]>([]);

  // 여행 계획 조회
  const {
    data: travelPlan,
    isLoading,
    error: travelPlanError,
  } = useQuery({
    queryKey: travelPlanKeys.detail(planId || ""),
    queryFn: () => {
      track.travel.viewPlan(planId!);
      return fetchTravelPlan(planId!);
    },
    enabled: !!planId,
    staleTime: 5 * 60 * 1000,
  });

  if (travelPlan && localItinerary.length === 0 && travelPlan.itinerary?.length > 0) {
    setLocalItinerary(travelPlan.itinerary);
    tag.travel.destination(travelPlan.destination);
    tag.feature("travel-plan");
  }


  if (travelPlanError) {
    captureWithTags.travel(travelPlanError as Error, "unknown", { planId: planId || "" });
  }

  const cityName = travelPlan?.destination?.split(",")[0].trim();
  const {
    data: weather,
    isLoading: isWeatherLoading,
  } = useQuery({
    queryKey: travelPlanKeys.weather(cityName || ""),
    queryFn: () => fetchWeather(cityName!),
    enabled: !!cityName && cityName !== "여행지",
    staleTime: 30 * 60 * 1000,
  });

  const saveMutation = useMutation({
    mutationFn: (_options: { saveToMyTrips?: boolean }) => {
      if (!travelPlan) throw new Error("여행 계획이 없습니다");
      return updateTravelPlan({ ...travelPlan, itinerary: localItinerary });
    },
    onMutate: (options: { saveToMyTrips?: boolean }) => {
      if (travelPlan) {
        if (options.saveToMyTrips) {
          track.travel.saveToMyTrips(travelPlan.destination, travelPlan.id);
        } else {
          track.travel.savePlan(travelPlan.destination, travelPlan.id);
        }
      }
    },
    onSuccess: (_, options) => {
      queryClient.invalidateQueries({ queryKey: travelPlanKeys.all });

      if (options.saveToMyTrips) {
        toast.success("내 여행에 저장되었습니다", { description: "마이페이지에서 확인하실 수 있습니다." });
      } else {
        toast.success("저장되었습니다", { description: "여행 계획이 성공적으로 저장되었습니다." });
      }
    },
    onError: (error, options) => {
      if (travelPlan) {
        captureWithTags.travel(error as Error, travelPlan.destination, {
          action: options.saveToMyTrips ? "saveToMyTrips" : "save",
          planId: travelPlan.id,
        });
      }
      toast.error("저장 실패", { description: "여행 계획 저장에 실패했습니다." });
    },
  });

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
    if (!requireAuth({ callbackUrl: `/results?id=${planId}`, description: "여행 계획을 저장하려면 로그인해주세요." })) {
      return;
    }

    saveMutation.mutate({ saveToMyTrips: false }, { onSuccess: callbacks?.onSuccess });
  };

  const handleSaveToMyTrips = async () => {
    if (!travelPlan?.id) return;
    if (authLoading) return;
    if (!requireAuth({ callbackUrl: `/results?id=${planId}`, description: "여행 계획을 저장하려면 로그인해주세요." })) {
      return;
    }

    saveMutation.mutate({ saveToMyTrips: true });
  };

  const resetItinerary = () => {
    if (travelPlan) {
      setLocalItinerary(travelPlan.itinerary);
    }
  };

  return {
    travelPlan: travelPlan ?? null,
    isLoading,
    localItinerary,
    weather: weather ?? null,
    isWeatherLoading,
    isSaving: saveMutation.isPending,
    handleDeleteActivity,
    handleAddActivity,
    handleMoveActivity,
    handleUpdateActivity,
    handleSave,
    handleSaveToMyTrips,
    resetItinerary,
  };
}
