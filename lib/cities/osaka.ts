import { CityData } from "./types";

export const osaka: CityData = {
  name: "오사카",
  country: "일본",
  region: "아시아",
  emoji: "🏯",
  description: "일본의 부엌이라 불리는 미식의 도시. 친근하고 활기찬 분위기의 상업 중심지입니다.",
  heroImage: "/osaka-food.jpg",
  images: [
    "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=500&q=80",
    "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?w=500&q=80",
    "https://images.unsplash.com/photo-1555117568-89c39a6f9646?w=500&q=80",
  ],
  bestSeason: "3월-5월 (봄), 9월-11월 (가을)",
  avgTemp: "봄/가을 15-25°C, 여름 28-35°C, 겨울 3-12°C",
  avgBudget: "₩450,000 - ₩700,000 (2-4일)",
  recommendedDays: "2-4일",
  timezone: "GMT+9 (한국과 동일)",
  language: "일본어 (오사카 사투리)",
  currency: "엔화 (¥) - 1,000엔 ≈ 9,000원",
  transportation: [
    {
      name: "오사카 어메이징 패스",
      description: "지하철/버스 무제한 + 관광지 무료 입장. 1일권 ₩22,000",
    },
    {
      name: "JR 오사카 루프라인",
      description: "주요 관광지 순환. 1일권 ₩6,000",
    },
    {
      name: "자전거 대여",
      description: "도톤보리 주변 자전거 투어 인기. 2시간 ₩8,000",
    },
  ],
  mustVisit: [
    {
      name: "도톤보리",
      category: "맛집",
      description: "오사카 최고의 먹자골목. 글리코 간판과 네온사인",
      image: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=400&q=80",
    },
    {
      name: "오사카성",
      category: "문화",
      description: "일본 3대 명성. 벚꽃 명소",
      image: "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?w=400&q=80",
    },
    {
      name: "신사이바시",
      category: "쇼핑",
      description: "오사카 최대 쇼핑 거리. 600m 아케이드",
      image: "https://images.unsplash.com/photo-1555117568-89c39a6f9646?w=400&q=80",
    },
    {
      name: "우메다 스카이 빌딩",
      category: "관광",
      description: "173m 높이 공중정원 전망대",
      image: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400&q=80",
    },
  ],
  foods: [
    {
      name: "타코야키",
      nameLocal: "たこ焼き",
      description: "오사카 대표 길거리 음식. 문어가 들어간 둥근 전",
      price: "₩3,000 - ₩6,000",
    },
    {
      name: "오코노미야키",
      nameLocal: "お好み焼き",
      description: "오사카식 철판구이. 도톤보리 본점 추천",
      price: "₩10,000 - ₩18,000",
    },
    {
      name: "쿠시카츠",
      nameLocal: "串カツ",
      description: "꼬치 튀김. 소스는 한 번만 찍기!",
      price: "₩1,500 - ₩3,000/개",
    },
    {
      name: "이카야키",
      nameLocal: "いか焼き",
      description: "오징어 통구이. 신사이바시 명물",
      price: "₩4,000 - ₩7,000",
    },
  ],
  tips: [
    "도쿄보다 물가가 약간 저렴하고 양이 푸짐함",
    "오사카 사람들은 매우 친근하고 유머러스함",
    "도톤보리는 밤이 더 아름다움. 저녁 방문 추천",
    "교토, 나라가 가까워 당일치기 가능 (30-60분)",
    "먹방 투어가 목적이라면 오사카가 도쿄보다 좋음",
  ],
  highlights: ["일본의 부엌", "타코야키 본고장", "저렴한 물가", "친근한 분위기"],
};

