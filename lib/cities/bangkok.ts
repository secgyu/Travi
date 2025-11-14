import { CityData } from "./types";

export const bangkok: CityData = {
  name: "방콕",
  country: "태국",
  region: "아시아",
  emoji: "🛕",
  description: "황금 사원과 열대의 활력이 넘치는 도시. 저렴한 물가와 맛있는 음식, 활기찬 야시장이 매력입니다.",
  heroImage: "/bangkok-temple.jpg",
  images: [
    "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=500&q=80",
    "https://images.unsplash.com/photo-1528181304800-259b08848526?w=500&q=80",
    "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=500&q=80",
  ],
  bestSeason: "11월-2월 (건기)",
  avgTemp: "연중 25-35°C (열대기후)",
  avgBudget: "₩400,000 - ₩600,000 (3-5일)",
  recommendedDays: "3-5일",
  timezone: "GMT+7 (한국보다 2시간 느림)",
  language: "태국어 (영어 가능)",
  currency: "바트 (฿) - 100바트 ≈ 3,800원",
  transportation: [
    {
      name: "BTS/MRT",
      description: "스카이트레인과 지하철. 편리하고 저렴. 1회 ₩1,000-2,000",
    },
    {
      name: "그랩 (Grab)",
      description: "동남아 우버. 택시보다 안전하고 저렴",
    },
    {
      name: "툭툭",
      description: "방콕 명물 삼륜차. 가격 흥정 필수. 단거리 ₩4,000-6,000",
    },
  ],
  mustVisit: [
    {
      name: "왓 프라깨우 (왕궁)",
      category: "문화",
      description: "에메랄드 불상이 있는 황금 궁전. 방콕 최고 명소",
      image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&q=80",
    },
    {
      name: "왓 아룬",
      category: "문화",
      description: "새벽 사원. 차오프라야 강변의 아름다운 탑",
      image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=400&q=80",
    },
    {
      name: "짜뚜짝 시장",
      category: "쇼핑",
      description: "세계 최대 주말시장. 1만 5천개 점포",
      image: "https://images.unsplash.com/photo-1519451241324-20b4ea2c4220?w=400&q=80",
    },
    {
      name: "카오산로드",
      category: "관광",
      description: "배낭여행자의 메카. 활기찬 밤거리",
      image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&q=80",
    },
  ],
  foods: [
    {
      name: "팟타이",
      nameLocal: "ผัดไทย",
      description: "태국식 볶음면. 달콤새콤매콤한 맛",
      price: "₩3,000 - ₩6,000",
    },
    {
      name: "똠얌꿍",
      nameLocal: "ต้มยำกุ้ง",
      description: "새우 넣은 매콤한 수프. 태국 대표 음식",
      price: "₩5,000 - ₩10,000",
    },
    {
      name: "망고 스티키 라이스",
      nameLocal: "ข้าวเหนียวมะม่วง",
      description: "달콤한 망고와 찹쌀 디저트",
      price: "₩3,000 - ₩5,000",
    },
    {
      name: "카오 팟",
      nameLocal: "ข้าวผัด",
      description: "태국식 볶음밥. 저렴하고 맛있음",
      price: "₩2,000 - ₩4,000",
    },
  ],
  tips: [
    "사원 입장 시 어깨와 무릎이 가려지는 복장 필수",
    "4월 송크란 축제(물축제) 기간은 매우 혼잡함",
    "길거리 음식이 저렴하고 맛있음. 위생 괜찮음",
    "흥정 문화. 시장에서는 30-50% 깎는 것이 일반적",
    "덥고 습하니 가벼운 옷과 선크림 필수",
    "영어가 잘 통하는 편. 관광지는 더욱 편리",
  ],
  highlights: ["황금 사원", "저렴한 물가", "야시장 천국", "태국 마사지"],
};

