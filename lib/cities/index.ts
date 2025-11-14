import { CityData, CitySlug } from "./types";
import { tokyo } from "./tokyo";
import { osaka } from "./osaka";
import { bangkok } from "./bangkok";
import { paris } from "./paris";
import { newyork } from "./newyork";
import { singapore } from "./singapore";

// 도시 데이터 맵
export const cityDataMap: Record<string, CityData> = {
  도쿄: tokyo,
  오사카: osaka,
  방콕: bangkok,
  파리: paris,
  뉴욕: newyork,
  싱가포르: singapore,
};

// 슬러그 -> 한국어 이름 매핑
export const slugToKorean: Record<string, string> = {
  tokyo: "도쿄",
  osaka: "오사카",
  bangkok: "방콕",
  paris: "파리",
  newyork: "뉴욕",
  singapore: "싱가포르",
};

// 한국어 이름 -> 슬러그 매핑
export const koreanToSlug: Record<string, string> = {
  도쿄: "tokyo",
  오사카: "osaka",
  방콕: "bangkok",
  파리: "paris",
  뉴욕: "newyork",
  싱가포르: "singapore",
};

// 모든 도시 가져오기
export function getAllCities(): CityData[] {
  return Object.values(cityDataMap);
}

// 슬러그로 도시 가져오기
export function getCityBySlug(slug: string): CityData | undefined {
  const koreanName = slugToKorean[slug];
  return koreanName ? cityDataMap[koreanName] : undefined;
}

// 한국어 이름으로 도시 가져오기
export function getCityByKoreanName(name: string): CityData | undefined {
  return cityDataMap[name];
}

// Export types
export * from "./types";

