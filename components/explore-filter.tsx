"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";

interface Destination {
  city: string;
  slug: string;
  country: string;
  emoji: string;
  description: string;
  image: string;
  tags: string[];
  avgBudget: string;
  travelTime: string;
  region: string;
}

interface ExploreFilterProps {
  destinations: Destination[];
}

export function ExploreFilter({ destinations }: ExploreFilterProps) {
  const [selectedRegion, setSelectedRegion] = useState<string>("전체");
  const [selectedBudget, setSelectedBudget] = useState<string>("전체");
  const [searchQuery, setSearchQuery] = useState("");

  // 지역 목록 및 카운트
  const regions = useMemo(() => {
    const regionMap = new Map<string, number>();
    regionMap.set("전체", destinations.length);

    destinations.forEach((dest) => {
      regionMap.set(dest.region, (regionMap.get(dest.region) || 0) + 1);
    });

    return regionMap;
  }, [destinations]);

  // 예산 범위 정의
  const budgetRanges = useMemo(() => {
    const ranges = new Map<string, number>();
    ranges.set("전체", destinations.length);

    destinations.forEach((dest) => {
      const budget = parseInt(dest.avgBudget.replace(/[^0-9]/g, ""));
      if (budget < 600000) {
        ranges.set("저렴", (ranges.get("저렴") || 0) + 1);
      } else if (budget < 1200000) {
        ranges.set("중간", (ranges.get("중간") || 0) + 1);
      } else {
        ranges.set("고가", (ranges.get("고가") || 0) + 1);
      }
    });

    return ranges;
  }, [destinations]);

  // 필터링된 여행지
  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      // 지역 필터
      if (selectedRegion !== "전체" && dest.region !== selectedRegion) {
        return false;
      }

      // 예산 필터
      if (selectedBudget !== "전체") {
        const budget = parseInt(dest.avgBudget.replace(/[^0-9]/g, ""));
        if (selectedBudget === "저렴" && budget >= 600000) return false;
        if (selectedBudget === "중간" && (budget < 600000 || budget >= 1200000)) return false;
        if (selectedBudget === "고가" && budget < 1200000) return false;
      }

      // 검색 필터
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          dest.city.toLowerCase().includes(query) ||
          dest.country.toLowerCase().includes(query) ||
          dest.description.toLowerCase().includes(query) ||
          dest.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [destinations, selectedRegion, selectedBudget, searchQuery]);

  return (
    <div>
      {/* 검색 바 */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="도시, 국가, 테마로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>
      </div>

      {/* 지역 필터 */}
      <div className="mb-6">
        <h3 className="mb-3 text-sm font-semibold text-foreground">지역</h3>
        <div className="flex flex-wrap gap-2">
          {Array.from(regions.entries()).map(([region, count]) => (
            <Button
              key={region}
              variant={selectedRegion === region ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedRegion(region)}
              className="gap-2"
            >
              {region}
              <span className="text-xs opacity-70">({count})</span>
            </Button>
          ))}
        </div>
      </div>

      {/* 예산 필터 */}
      <div className="mb-8">
        <h3 className="mb-3 text-sm font-semibold text-foreground">예산</h3>
        <div className="flex flex-wrap gap-2">
          {Array.from(budgetRanges.entries()).map(([range, count]) => (
            <Button
              key={range}
              variant={selectedBudget === range ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedBudget(range)}
              className="gap-2"
            >
              {range}
              {range !== "전체" && (
                <span className="text-xs opacity-70">
                  ({range === "저렴" ? "~60만원" : range === "중간" ? "60-120만원" : "120만원~"})
                </span>
              )}
              <span className="text-xs opacity-70">({count})</span>
            </Button>
          ))}
        </div>
      </div>

      {/* 결과 헤더 */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          {selectedRegion !== "전체" || selectedBudget !== "전체" || searchQuery
            ? `검색 결과 (${filteredDestinations.length}개)`
            : "모든 여행지"}
        </h2>
        {(selectedRegion !== "전체" || selectedBudget !== "전체" || searchQuery) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedRegion("전체");
              setSelectedBudget("전체");
              setSearchQuery("");
            }}
          >
            필터 초기화
          </Button>
        )}
      </div>

      {/* 여행지 그리드 */}
      {filteredDestinations.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-muted-foreground">검색 결과가 없습니다</p>
          <p className="mt-2 text-sm text-muted-foreground">다른 검색어나 필터를 시도해보세요</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDestinations.map((destination, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.city}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="text-4xl">{destination.emoji}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">{destination.city}</h3>
                    <p className="text-sm text-white/90">{destination.country}</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="mb-4 text-sm text-foreground/80">{destination.description}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {destination.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                  <span>예산: {destination.avgBudget}</span>
                  <span>기간: {destination.travelTime}</span>
                </div>
                <Button asChild className="w-full" size="sm">
                  <Link href={`/explore/${destination.slug}`}>
                    <MapPin className="mr-2 h-4 w-4" />
                    자세히 보기
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
