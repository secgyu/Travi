import { CityData } from "./types";

export const newyork: CityData = {
  name: "뉴욕",
  country: "미국",
  region: "미주",
  emoji: "🗽",
  description: "세계의 중심, 꿈의 도시. 24시간 잠들지 않는 도시에서 무한한 가능성을 경험하세요.",
  heroImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
  images: [
    "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=500&q=80",
    "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=500&q=80",
    "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=500&q=80",
  ],
  bestSeason: "4월-6월, 9월-11월",
  avgTemp: "봄/가을 10-20°C, 여름 25-32°C, 겨울 -5-5°C",
  avgBudget: "₩1,500,000 - ₩2,500,000 (5-7일)",
  recommendedDays: "5-7일",
  timezone: "GMT-5 (한국보다 14시간 느림)",
  language: "영어",
  currency: "달러 ($) - 1달러 ≈ 1,320원",
  transportation: [
    {
      name: "지하철 (Subway)",
      description: "24시간 운행. 1회 $2.90 (₩3,800)",
    },
    {
      name: "시티패스",
      description: "주요 관광지 입장권 묶음. 40% 할인",
    },
    {
      name: "우버/리프트",
      description: "택시보다 편리하고 저렴",
    },
  ],
  mustVisit: [
    {
      name: "자유의 여신상",
      category: "랜드마크",
      description: "뉴욕의 상징. 페리로 이동",
      image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=400&q=80",
    },
    {
      name: "타임스퀘어",
      category: "관광",
      description: "세계의 교차로. 밤에 더 화려함",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80",
    },
    {
      name: "센트럴 파크",
      category: "자연",
      description: "도심 속 거대한 공원. 341만㎡",
      image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&q=80",
    },
    {
      name: "브루클린 브릿지",
      category: "랜드마크",
      description: "맨해튼과 브루클린을 잇는 다리. 야경 명소",
      image: "https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=400&q=80",
    },
  ],
  foods: [
    {
      name: "뉴욕 피자",
      nameLocal: "NY Pizza",
      description: "얇고 넓은 뉴욕 스타일. 조각 판매",
      price: "₩4,000 - ₩6,000/조각",
    },
    {
      name: "베이글",
      nameLocal: "Bagel",
      description: "뉴욕 아침의 정석. 크림치즈와 함께",
      price: "₩5,000 - ₩8,000",
    },
    {
      name: "핫도그",
      nameLocal: "Hot Dog",
      description: "길거리 푸드카트 명물",
      price: "₩3,000 - ₩5,000",
    },
    {
      name: "스테이크",
      nameLocal: "Steak",
      description: "두툼한 미국식 스테이크",
      price: "₩40,000 - ₩100,000",
    },
  ],
  tips: [
    "팁 문화. 레스토랑 15-20%, 택시 10-15%",
    "지하철은 24시간이지만 밤에는 주의",
    "브로드웨이 뮤지컬 당일권은 50% 할인",
    "물가가 매우 비쌈. 예산 여유있게 준비",
    "걸어다니기 좋은 도시. 편한 신발 필수",
  ],
  highlights: ["브로드웨이 뮤지컬", "마천루", "다양한 문화", "24시간 도시"],
};

