"use client";

import { Search, Calendar, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/logo";
import { useState } from "react";

export function TravelHero() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");

  const handleSearch = () => {
    if (destination.trim()) {
      const params = new URLSearchParams();
      params.set("destination", destination);
      if (dates.trim()) {
        params.set("dates", dates);
      }
      router.push(`/chat?${params.toString()}`);
    } else {
      router.push("/chat");
    }
  };

  const handleQuickDestination = (dest: string) => {
    const params = new URLSearchParams();
    params.set("destination", dest);
    router.push(`/chat?${params.toString()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="relative overflow-hidden px-4 py-12 md:py-20">
      <div className="absolute right-8 top-8 opacity-10">
        <Logo variant="icon" size="lg" className="scale-[2]" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-8 flex flex-col items-center gap-4">
          <Logo variant="full" size="lg" />
        </div>

        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-2 text-sm font-medium text-secondary-foreground">
          <Sparkles className="h-4 w-4" />
          AI 기반 맞춤 여행 계획
        </div>

        <h1 className="mb-6 text-4xl font-bold text-balance text-foreground md:text-5xl">
          어디로 여행을
          <br />
          떠나고 싶으신가요?
        </h1>

        <p className="mb-10 text-lg text-muted-foreground md:text-xl">
          AI가 당신만을 위한 완벽한 여행 일정을 만들어드립니다
        </p>

        {/* Search bar */}
        <div className="mx-auto mb-8 max-w-2xl">
          <div className="glass-effect relative rounded-2xl border-2 border-white p-2 shadow-lg transition-all hover:shadow-xl">
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="도쿄, 오사카, 방콕, 파리..."
                  className="h-12 border-0 pl-10 text-base bg-transparent focus-visible:ring-0"
                />
              </div>

              <div className="relative flex-1">
                <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  value={dates}
                  onChange={(e) => setDates(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="출발일 - 도착일"
                  className="h-12 border-0 pl-10 text-base bg-transparent focus-visible:ring-0"
                />
              </div>
            </div>
          </div>
        </div>

        <Button
          size="lg"
          onClick={handleSearch}
          className="h-14 rounded-xl bg-cta px-8 text-base font-semibold text-cta-foreground shadow-lg transition-all hover:bg-cta/90 hover:shadow-xl hover:scale-105"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          AI가 추천하는 여행 코스 만들기
        </Button>

        {/* Popular destinations */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm text-muted-foreground">여행 테마:</span>
          {[
            { name: "식도락", emoji: "🍜" },
            { name: "힐링", emoji: "💆‍♀️" },
            { name: "쇼핑", emoji: "🛍️" },
            { name: "인생샷", emoji: "📸" },
            { name: "가족여행", emoji: "👨‍👩‍👧‍👦" },
          ].map((theme) => (
            <button
              key={theme.name}
              onClick={() => handleQuickDestination(theme.name)}
              className="rounded-full bg-card px-4 py-2 text-sm font-medium text-card-foreground shadow-sm transition-all hover:bg-primary hover:text-primary-foreground hover:shadow-md"
            >
              {theme.emoji} {theme.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
