import { CityData } from "./types";

export const danang: CityData = {
  name: "다낭",
  country: "베트남",
  region: "아시아",
  emoji: "🏖️",
  description: "한국인이 가장 사랑하는 휴양지. 아름다운 해변과 저렴한 물가, 맛있는 베트남 음식이 어우러진 가족 여행 최적지입니다.",
  heroImage: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&q=80",
  images: [
    "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=500&q=80",
    "https://images.unsplash.com/photo-1559592413-7cff6ab392ce?w=500&q=80",
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=500&q=80",
  ],
  bestSeason: "2월-5월 (건기)",
  avgTemp: "연중 25-35°C (열대기후)",
  avgBudget: "₩400,000 - ₩600,000 (3-4일)",
  recommendedDays: "3-4일",
  timezone: "GMT+7 (한국보다 2시간 느림)",
  language: "베트남어 (영어 제한적)",
  currency: "동 (₫) - 10,000동 ≈ 500원",
  transportation: [
    {
      name: "그랩 (Grab)",
      description: "동남아 우버. 공항-시내 ₩8,000-12,000",
    },
    {
      name: "택시",
      description: "미터기 택시 이용 권장. 초기요금 ₩2,000",
    },
    {
      name: "렌터카/바이크",
      description: "국제면허 필요. 하루 ₩30,000-50,000",
    },
  ],
  mustVisit: [
    {
      name: "미케 비치",
      category: "해변",
      description: "세계 6대 해변. 깨끗한 백사장과 투명한 바다",
      image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&q=80",
    },
    {
      name: "골든 브릿지",
      category: "관광",
      description: "거대한 손이 받치고 있는 황금 다리",
      image: "https://images.unsplash.com/photo-1559592413-7cff6ab392ce?w=400&q=80",
    },
    {
      name: "호이안 고도시",
      category: "문화",
      description: "유네스코 세계문화유산. 등불 축제 유명",
      image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400&q=80",
    },
    {
      name: "바나 힐",
      category: "테마파크",
      description: "케이블카와 프랑스풍 테마파크",
      image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&q=80",
    },
  ],
  foods: [
    {
      name: "반미",
      nameLocal: "Bánh mì",
      description: "바삭한 프랑스 빵에 고기와 채소를 넣은 샌드위치",
      price: "₩2,000 - ₩3,000",
    },
    {
      name: "분짜",
      nameLocal: "Bún chả",
      description: "숯불 돼지고기와 쌀국수. 오바마가 먹은 음식",
      price: "₩3,000 - ₩5,000",
    },
    {
      name: "꼼가",
      nameLocal: "Cơm gà",
      description: "닭고기 덮밥. 다낭 명물 요리",
      price: "₩3,000 - ₩5,000",
    },
    {
      name: "반쎄오",
      nameLocal: "Bánh xèo",
      description: "베트남식 부침개. 새우와 고기가 들어감",
      price: "₩4,000 - ₩6,000",
    },
  ],
  tips: [
    "환전은 한국에서 미리 하거나 현지 금은방 이용",
    "4-5성급 리조트가 한국 3성급 모텔 가격",
    "택시는 비나선, 마이린 택시만 이용 (바가지 주의)",
    "선크림 필수. SPF50+ 권장",
    "물가 협상 가능. 처음 부르는 가격의 70% 제시",
    "베트남 커피는 연유가 들어가 매우 달콤함",
  ],
  highlights: ["한국인 최애 휴양지", "저렴한 리조트", "맛있는 베트남 음식", "가족 여행 최적"],
};

