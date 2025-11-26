"use client";

import { Card } from "@/components/ui/card";
import { Cloud, Loader2 } from "lucide-react";

interface WeatherData {
  location: string;
  current: {
    temp: number;
    condition: string;
    icon: string;
  };
}

interface WeatherCardProps {
  weather: WeatherData | null;
  isLoading: boolean;
}

export function WeatherCard({ weather, isLoading }: WeatherCardProps) {
  return (
    <Card className="glass-effect flex flex-1 items-center gap-3 border-0 px-4 py-3 shadow-md lg:flex-none lg:px-6">
      {isLoading ? (
        <>
          <Loader2 className="h-6 w-6 text-secondary animate-spin" />
          <div>
            <p className="text-xs text-muted-foreground md:text-sm">날씨</p>
            <p className="text-sm font-semibold text-foreground md:text-base">로딩중...</p>
          </div>
        </>
      ) : weather ? (
        <>
          {weather.current.icon ? (
            <img
              src={weather.current.icon.startsWith("//") ? `https:${weather.current.icon}` : weather.current.icon}
              alt={weather.current.condition}
              className="h-10 w-10"
            />
          ) : (
            <Cloud className="h-6 w-6 text-secondary" />
          )}
          <div>
            <p className="text-xs text-muted-foreground md:text-sm">{weather.location} 날씨</p>
            <p className="text-sm font-semibold text-foreground md:text-base">
              {weather.current.condition} {weather.current.temp}°C
            </p>
          </div>
        </>
      ) : (
        <>
          <Cloud className="h-6 w-6 text-secondary" />
          <div>
            <p className="text-xs text-muted-foreground md:text-sm">날씨</p>
            <p className="text-sm font-semibold text-muted-foreground md:text-base">정보 없음</p>
          </div>
        </>
      )}
    </Card>
  );
}
