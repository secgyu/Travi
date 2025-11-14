import { CityData } from "./types";

export const taipei: CityData = {
  name: "타이베이",
  country: "대만",
  region: "아시아",
  emoji: "🏙️",
  description: "가까운 친근한 여행지. 맛있는 야시장 음식, 따뜻한 사람들, 합리적인 물가로 언제나 편안한 여행이 가능합니다.",
  heroImage: "https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=800&q=80",
  images: [
    "https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=500&q=80",
    "https://images.unsplash.com/photo-1562992688-b8a0c8accc2b?w=500&q=80",
    "https://images.unsplash.com/photo-1549488344-cbb1e439957b?w=500&q=80",
  ],
  bestSeason: "10월-12월 (가을), 3월-5월 (봄)",
  avgTemp: "봄/가을 18-28°C, 여름 28-35°C, 겨울 12-20°C",
  avgBudget: "₩400,000 - ₩600,000 (3-4일)",
  recommendedDays: "3-4일",
  timezone: "GMT+8 (한국보다 1시간 느림)",
  language: "중국어 (번체), 영어 제한적",
  currency: "대만 달러 (NT$) - 1달러 ≈ 43원",
  transportation: [
    {
      name: "MRT (지하철)",
      description: "깨끗하고 편리한 지하철. 1회 ₩1,000-2,000",
    },
    {
      name: "유유카드",
      description: "교통카드. 편의점에서 구매 가능",
    },
    {
      name: "타이완 트립패스",
      description: "3-5일 무제한 교통 패스. 약 ₩20,000",
    },
  ],
  mustVisit: [
    {
      name: "타이베이 101",
      category: "랜드마크",
      description: "과거 세계 최고층 빌딩. 전망대와 쇼핑몰",
      image: "https://images.unsplash.com/photo-1508248467877-aec1b08de376?w=400&q=80",
    },
    {
      name: "스린 야시장",
      category: "야시장",
      description: "타이베이 최대 야시장. 먹거리 천국",
      image: "https://images.unsplash.com/photo-1562992688-b8a0c8accc2b?w=400&q=80",
    },
    {
      name: "지우펀",
      category: "관광",
      description: "센과 치히로 배경. 산골 마을과 차 문화",
      image: "https://images.unsplash.com/photo-1549488344-cbb1e439957b?w=400&q=80",
    },
    {
      name: "중정기념당",
      category: "문화",
      description: "대만 역사의 상징. 웅장한 건축물",
      image: "https://images.unsplash.com/photo-1562992688-b8a0c8accc2b?w=400&q=80",
    },
  ],
  foods: [
    {
      name: "샤오롱바오",
      nameLocal: "小籠包",
      description: "딘타이펑의 수제 만두. 육즙이 가득",
      price: "₩10,000 - ₩15,000",
    },
    {
      name: "루러우판",
      nameLocal: "滷肉飯",
      description: "대만식 돼지고기 덮밥. 국민 음식",
      price: "₩3,000 - ₩5,000",
    },
    {
      name: "지파이",
      nameLocal: "雞排",
      description: "대만식 치킨. 얼굴만한 크기",
      price: "₩4,000 - ₩6,000",
    },
    {
      name: "망고빙수",
      nameLocal: "芒果冰",
      description: "신선한 망고가 가득한 빙수",
      price: "₩6,000 - ₩10,000",
    },
  ],
  tips: [
    "한자가 번체자라 읽기 어려움. 구글 번역 활용",
    "편의점이 매우 발달. 세븐일레븐, 패밀리마트",
    "팁 문화 없음. 편하게 여행 가능",
    "대중교통에서 음식 금지. 벌금 있음",
    "여름은 덥고 습함. 우산 필수 (비 자주)",
    "야시장은 저녁 6시 이후부터 시작",
  ],
  highlights: ["야시장 천국", "샤오롱바오", "친절한 사람들", "합리적 물가"],
};

