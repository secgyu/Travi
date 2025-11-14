import { CityData } from "./types";

export const rome: CityData = {
  name: "로마",
  country: "이탈리아",
  region: "유럽",
  emoji: "🏛️",
  description: "영원의 도시. 콜로세움, 트레비 분수, 바티칸이 있는 2,000년 역사가 살아 숨 쉬는 도시입니다.",
  heroImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
  images: [
    "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=500&q=80",
    "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=500&q=80",
    "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=500&q=80",
  ],
  bestSeason: "4월-6월, 9월-10월",
  avgTemp: "봄/가을 15-25°C, 여름 25-35°C, 겨울 5-15°C",
  avgBudget: "₩1,300,000 - ₩2,000,000 (5-7일)",
  recommendedDays: "4-6일",
  timezone: "GMT+1 (한국보다 8시간 느림)",
  language: "이탈리아어 (영어 제한적)",
  currency: "유로 (€) - 1유로 ≈ 1,450원",
  transportation: [
    {
      name: "메트로",
      description: "A, B, C 라인. 1회권 ₩2,000",
    },
    {
      name: "로마 패스",
      description: "교통 + 박물관 무료. 3일권 ₩80,000",
    },
    {
      name: "도보",
      description: "주요 명소가 가까워 걷기 좋은 도시",
    },
  ],
  mustVisit: [
    {
      name: "콜로세움",
      category: "유적",
      description: "고대 로마 원형 경기장. 사전 예약 필수",
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80",
    },
    {
      name: "바티칸 시국",
      category: "문화",
      description: "세계 최소 국가. 시스티나 성당과 미켈란젤로",
      image: "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=400&q=80",
    },
    {
      name: "트레비 분수",
      category: "관광",
      description: "동전 던지기로 유명. 로마 재방문 기원",
      image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&q=80",
    },
    {
      name: "스페인 계단",
      category: "랜드마크",
      description: "135개 계단. 영화 '로마의 휴일' 배경",
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80",
    },
  ],
  foods: [
    {
      name: "카르보나라",
      nameLocal: "Carbonara",
      description: "로마 대표 파스타. 계란과 베이컨",
      price: "₩15,000 - ₩25,000",
    },
    {
      name: "피자 알 타글리오",
      nameLocal: "Pizza al Taglio",
      description: "네모 피자. 양에 따라 가격 책정",
      price: "₩5,000 - ₩10,000",
    },
    {
      name: "젤라또",
      nameLocal: "Gelato",
      description: "이탈리아 아이스크림. 진짜 과일 사용",
      price: "₩4,000 - ₩7,000",
    },
    {
      name: "수플리",
      nameLocal: "Supplì",
      description: "치즈가 든 라이스볼. 로마 길거리 음식",
      price: "₩3,000 - ₩5,000",
    },
  ],
  tips: [
    "소매치기 매우 주의. 특히 관광지와 지하철",
    "레스토랑 좌석 요금 (Coperto) 별도. 1인 ₩3,000-5,000",
    "일요일 대부분 상점 휴무",
    "바티칸은 드레스 코드 있음. 어깨와 무릎 가리기",
    "8월은 휴가철. 많은 가게 문 닫음",
    "물 (Acqua) 주문 시 '타파'(수돗물) 요청하면 무료",
  ],
  highlights: ["고대 로마 유적", "예술과 역사", "정통 이탈리아 음식", "바티칸"],
};

