import { Utensils, Landmark, ShoppingBag, Mountain, type LucideIcon } from "lucide-react";

export interface Theme {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  longDescription: string;
  color: string;
  bgColor: string;
  gradientFrom: string;
  gradientTo: string;
  cities: string[]; // 한국어 도시명
  tips: string[];
  relatedGuides: string[]; // 가이드 slug
  budgetRange: string;
  recommendedDuration: string;
}

export const themes: Record<string, Theme> = {
  food: {
    id: "food",
    title: "미식 투어",
    icon: Utensils,
    description: "현지 맛집과 전통 음식을 찾아 떠나는 여행",
    longDescription:
      "세계 각지의 전통 음식과 현지 맛집을 탐험하며 미각으로 떠나는 특별한 여행. 미슐랭 레스토랑부터 골목길 숨은 맛집까지, 음식을 통해 그 나라의 문화를 깊이 있게 경험할 수 있습니다.",
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    gradientFrom: "from-orange-500",
    gradientTo: "to-red-500",
    cities: ["오사카", "방콕", "타이베이", "도쿄", "싱가포르", "홍콩"],
    tips: [
      "현지인이 많은 식당을 찾아보세요. 보통 맛집일 확률이 높습니다",
      "점심 시간대는 저녁보다 저렴하게 고급 레스토랑을 경험할 수 있어요",
      "식사 전 사진 촬영이 허용되는지 확인하세요",
      "알레르기가 있다면 미리 현지어로 카드를 준비하세요",
      "팁 문화가 있는 나라인지 미리 확인하세요",
    ],
    relatedGuides: [
      "restaurant-etiquette",
      "tipping-culture",
      "mobile-payment",
      "currency-exchange",
    ],
    budgetRange: "₩300,000 - ₩1,000,000",
    recommendedDuration: "4-7일",
  },
  culture: {
    id: "culture",
    title: "문화 탐방",
    icon: Landmark,
    description: "역사와 문화유산을 체험하는 여행",
    longDescription:
      "유네스코 세계문화유산과 박물관, 역사적 건축물을 통해 깊이 있는 문화 체험을 하는 여행. 수천 년의 역사와 예술, 건축의 아름다움을 직접 눈으로 확인하고 그 시대의 이야기에 빠져보세요.",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    gradientFrom: "from-purple-500",
    gradientTo: "to-pink-500",
    cities: ["로마", "파리", "바르셀로나", "두바이"],
    tips: [
      "주요 관광지는 온라인 사전 예약으로 대기 시간을 줄이세요",
      "박물관과 유적지는 아침 일찍 방문하는 것이 좋습니다",
      "종교 시설 방문 시 복장 규정을 확인하세요",
      "오디오 가이드나 투어를 활용하면 더 깊이 있는 경험이 가능합니다",
      "박물관 무료 입장일을 확인해보세요",
    ],
    relatedGuides: [
      "photo-etiquette",
      "schengen-visa",
      "travel-insurance",
      "currency-exchange",
    ],
    budgetRange: "₩800,000 - ₩2,000,000",
    recommendedDuration: "5-10일",
  },
  shopping: {
    id: "shopping",
    title: "쇼핑 천국",
    icon: ShoppingBag,
    description: "쇼핑과 트렌디한 거리를 즐기는 여행",
    longDescription:
      "세계적인 브랜드 매장부터 로컬 디자이너 부티크까지, 쇼핑의 즐거움을 만끽하는 여행. 최신 트렌드를 한눈에 볼 수 있는 패션 거리와 면세점, 아울렛을 둘러보며 특별한 아이템을 찾아보세요.",
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    gradientFrom: "from-pink-500",
    gradientTo: "to-rose-500",
    cities: ["도쿄", "뉴욕", "홍콩", "싱가포르", "두바이", "바르셀로나"],
    tips: [
      "면세 한도를 미리 확인하고 영수증을 잘 보관하세요",
      "할인 시즌(블랙프라이데이, 썸머세일 등)을 노려보세요",
      "현지 브랜드와 로컬 마켓도 방문해보세요",
      "환급 가능한 Tax Free 매장을 활용하세요",
      "쇼핑백을 위한 여유 공간을 가방에 남겨두세요",
    ],
    relatedGuides: [
      "overseas-card",
      "shopping-etiquette",
      "currency-exchange",
      "mobile-payment",
    ],
    budgetRange: "₩1,000,000 - ₩5,000,000",
    recommendedDuration: "3-7일",
  },
  nature: {
    id: "nature",
    title: "자연 힐링",
    icon: Mountain,
    description: "자연 속에서 힐링하는 여유로운 여행",
    longDescription:
      "아름다운 자연 경관 속에서 일상의 스트레스를 내려놓고 진정한 휴식을 취하는 여행. 맑은 공기, 푸른 산과 바다, 별이 쏟아지는 밤하늘 아래에서 자연과 하나 되는 경험을 해보세요.",
    color: "text-green-500",
    bgColor: "bg-green-50",
    gradientFrom: "from-green-500",
    gradientTo: "to-emerald-500",
    cities: ["다낭"],
    tips: [
      "계절과 날씨를 확인하고 적절한 옷을 준비하세요",
      "트레킹화나 편한 운동화는 필수입니다",
      "자외선 차단제와 모자, 선글라스를 챙기세요",
      "야외 활동 시 응급약품을 준비하세요",
      "자연 보호를 위해 쓰레기는 꼭 가져가세요",
    ],
    relatedGuides: [
      "packing-checklist",
      "travel-insurance",
      "rental-car",
      "sim-card-guide",
    ],
    budgetRange: "₩500,000 - ₩1,500,000",
    recommendedDuration: "4-7일",
  },
};

export function getThemeById(id: string): Theme | undefined {
  return themes[id];
}

export function getAllThemes(): Theme[] {
  return Object.values(themes);
}

export const themeSlugToId: Record<string, string> = {
  "미식투어": "food",
  "문화탐방": "culture",
  "쇼핑천국": "shopping",
  "자연힐링": "nature",
  food: "food",
  culture: "culture",
  shopping: "shopping",
  nature: "nature",
};

