import { CityData } from "./types";
import { tokyo } from "./tokyo";
import { osaka } from "./osaka";
import { bangkok } from "./bangkok";
import { paris } from "./paris";
import { newyork } from "./newyork";
import { singapore } from "./singapore";
import { danang } from "./danang";
import { hongkong } from "./hongkong";
import { taipei } from "./taipei";
import { dubai } from "./dubai";
import { rome } from "./rome";
import { barcelona } from "./barcelona";

export const cityDataMap: Record<string, CityData> = {
  도쿄: tokyo,
  오사카: osaka,
  방콕: bangkok,
  파리: paris,
  뉴욕: newyork,
  싱가포르: singapore,
  다낭: danang,
  홍콩: hongkong,
  타이베이: taipei,
  두바이: dubai,
  로마: rome,
  바르셀로나: barcelona,
};

export const slugToKorean: Record<string, string> = {
  tokyo: "도쿄",
  osaka: "오사카",
  bangkok: "방콕",
  paris: "파리",
  newyork: "뉴욕",
  singapore: "싱가포르",
  danang: "다낭",
  hongkong: "홍콩",
  taipei: "타이베이",
  dubai: "두바이",
  rome: "로마",
  barcelona: "바르셀로나",
};

export const koreanToSlug: Record<string, string> = {
  도쿄: "tokyo",
  오사카: "osaka",
  방콕: "bangkok",
  파리: "paris",
  뉴욕: "newyork",
  싱가포르: "singapore",
  다낭: "danang",
  홍콩: "hongkong",
  타이베이: "taipei",
  두바이: "dubai",
  로마: "rome",
  바르셀로나: "barcelona",
};

export function getAllCities(): CityData[] {
  return Object.values(cityDataMap);
}

export function getCityBySlug(slug: string): CityData | undefined {
  const koreanName = slugToKorean[slug];
  return koreanName ? cityDataMap[koreanName] : undefined;
}

export function getCityByKoreanName(name: string): CityData | undefined {
  return cityDataMap[name];
}

export * from "./types";

