import { CityData } from "./types";

export const tokyo: CityData = {
  name: "도쿄",
  country: "일본",
  region: "아시아",
  emoji: "🗼",
  description:
    "현대와 전통이 공존하는 매력적인 도시. 최첨단 기술과 고즈넉한 신사, 미슐랭 맛집과 라멘 골목이 어우러진 곳입니다.",
  heroImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
  images: [
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=500&q=80",
    "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=500&q=80",
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=500&q=80",
  ],
  bestSeason: "3월-5월 (봄), 9월-11월 (가을)",
  avgTemp: "봄/가을 15-25°C, 여름 25-35°C, 겨울 5-15°C",
  avgBudget: "₩500,000 - ₩800,000 (3-4일)",
  recommendedDays: "3-5일",
  timezone: "GMT+9 (한국과 동일)",
  language: "일본어 (영어 제한적)",
  currency: "엔화 (¥) - 1,000엔 ≈ 9,000원",
  transportation: [
    {
      name: "JR 패스",
      description: "신칸센 포함 JR 노선 무제한 이용. 3일권 약 ₩200,000",
    },
    {
      name: "메트로 1일권",
      description: "도쿄 메트로 전 노선 1일 무제한. 약 ₩6,000",
    },
    {
      name: "택시",
      description: "초기요금 ₩3,500부터. 심야할증 20%",
    },
  ],
  mustVisit: [
    {
      name: "시부야 스크램블",
      category: "관광",
      description: "세계에서 가장 바쁜 교차로. 하루 평균 50만명 통행",
      image: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=400&q=80",
    },
    {
      name: "센소지 (浅草寺)",
      category: "문화",
      description: "도쿄에서 가장 오래된 사찰. 가미나리몬과 나카미세 거리",
      image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80",
    },
    {
      name: "하라주쿠/오모테산도",
      category: "쇼핑",
      description: "최신 패션과 카와이 문화의 중심지",
      image: "https://images.unsplash.com/photo-1555117568-89c39a6f9646?w=400&q=80",
    },
    {
      name: "츠키지 장외시장",
      category: "맛집",
      description: "신선한 해산물과 스시를 맛볼 수 있는 시장",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&q=80",
    },
    {
      name: "도쿄 스카이트리",
      category: "관광",
      description: "634m 높이의 전망대. 도쿄 전경 감상",
      image: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=400&q=80",
    },
    {
      name: "메이지 신궁",
      category: "문화",
      description: "도심 속 고요한 신사. 대형 도리이와 숲길",
      image: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=400&q=80",
    },
  ],
  foods: [
    {
      name: "스시",
      nameLocal: "寿司 (すし)",
      description: "신선한 해산물을 얹은 초밥. 츠키지/긴자 추천",
      price: "₩15,000 - ₩150,000",
    },
    {
      name: "라멘",
      nameLocal: "ラーメン",
      description: "진한 국물의 일본식 면 요리. 이치란/잇푸도 추천",
      price: "₩8,000 - ₩15,000",
    },
    {
      name: "텐동",
      nameLocal: "天丼 (てんどん)",
      description: "튀김 덮밥. 텐야/츠루토탄 추천",
      price: "₩10,000 - ₩18,000",
    },
    {
      name: "오코노미야키",
      nameLocal: "お好み焼き",
      description: "일본식 전. 재료 직접 선택 가능",
      price: "₩12,000 - ₩20,000",
    },
  ],
  tips: [
    "대부분의 식당이 현금만 받으니 엔화 현금 준비 필수",
    "전철에서는 통화 자제, 조용히 이동하는 것이 매너",
    "팁 문화 없음. 오히려 실례가 될 수 있음",
    "편의점이 매우 발달. 세븐일레븐, 로손, 패밀리마트 활용",
    "공공 와이파이가 제한적. 포켓 와이파이 렌탈 권장",
  ],
  highlights: ["벚꽃 명소", "미슐랭 레스토랑 최다 도시", "세계 최고 대중교통", "24시간 활기찬 도시"],
};

