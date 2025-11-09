import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, DollarSign, Thermometer, Train, Clock, Utensils, Info, ArrowRight } from "lucide-react";

const slugToKorean: Record<string, string> = {
  tokyo: "도쿄",
  osaka: "오사카",
  bangkok: "방콕",
  paris: "파리",
  "new-york": "뉴욕",
  singapore: "싱가포르",
};

const cityData: Record<
  string,
  {
    name: string;
    country: string;
    emoji: string;
    description: string;
    heroImage: string;
    images: string[];
    bestSeason: string;
    avgTemp: string;
    avgBudget: string;
    recommendedDays: string;
    timezone: string;
    language: string;
    currency: string;
    transportation: { name: string; description: string }[];
    mustVisit: { name: string; description: string; category: string; image: string }[];
    foods: { name: string; nameLocal: string; description: string; price: string }[];
    tips: string[];
    highlights: string[];
  }
> = {
  도쿄: {
    name: "도쿄",
    country: "일본",
    emoji: "🗼",
    description:
      "현대와 전통이 공존하는 매력적인 도시. 최첨단 기술과 고즈넉한 신사, 미슐랭 맛집과 라멘 골목이 어우러진 곳입니다.",
    heroImage: "/tokyo-cityscape.jpg",
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
  },
  오사카: {
    name: "오사카",
    country: "일본",
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
  },
  방콕: {
    name: "방콕",
    country: "태국",
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
  },
  파리: {
    name: "파리",
    country: "프랑스",
    emoji: "🗼",
    description: "낭만과 예술의 도시. 에펠탑, 루브르, 샹젤리제가 있는 세계에서 가장 아름다운 도시입니다.",
    heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&q=80",
      "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=500&q=80",
      "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=500&q=80",
    ],
    bestSeason: "4월-6월, 9월-10월",
    avgTemp: "봄/가을 10-20°C, 여름 20-30°C, 겨울 0-10°C",
    avgBudget: "₩1,200,000 - ₩2,000,000 (5-7일)",
    recommendedDays: "5-7일",
    timezone: "GMT+1 (한국보다 8시간 느림)",
    language: "프랑스어 (영어 제한적)",
    currency: "유로 (€) - 1유로 ≈ 1,450원",
    transportation: [
      {
        name: "메트로",
        description: "파리 지하철. 1회권 ₩2,700, 1일권 ₩10,000",
      },
      {
        name: "파리 뮤지엄 패스",
        description: "60개 이상 박물관 무료 입장. 2일권 ₩75,000",
      },
      {
        name: "벨리브",
        description: "공공 자전거 대여 서비스. 30분 무료",
      },
    ],
    mustVisit: [
      {
        name: "에펠탑",
        category: "랜드마크",
        description: "파리의 상징. 야경이 특히 아름다움",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80",
      },
      {
        name: "루브르 박물관",
        category: "문화",
        description: "세계 3대 박물관. 모나리자, 밀로의 비너스",
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80",
      },
      {
        name: "샹젤리제 거리",
        category: "쇼핑",
        description: "세계에서 가장 아름다운 거리. 개선문까지 2km",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80",
      },
      {
        name: "몽마르트",
        category: "관광",
        description: "예술가의 언덕. 사크레콥르 대성당",
        image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400&q=80",
      },
    ],
    foods: [
      {
        name: "크루아상",
        nameLocal: "Croissant",
        description: "바삭한 프랑스 페이스트리",
        price: "₩2,000 - ₩4,000",
      },
      {
        name: "에스카르고",
        nameLocal: "Escargot",
        description: "달팽이 요리. 마늘 버터 소스",
        price: "₩15,000 - ₩25,000",
      },
      {
        name: "크렘 브륄레",
        nameLocal: "Crème brûlée",
        description: "캐러멜화된 설탕의 달콤한 디저트",
        price: "₩8,000 - ₩12,000",
      },
      {
        name: "프렌치 어니언 수프",
        nameLocal: "Soupe à l'oignon",
        description: "양파 수프에 치즈를 녹여서",
        price: "₩10,000 - ₩15,000",
      },
    ],
    tips: [
      "프랑스어로 먼저 인사하면 친절해짐. Bonjour!",
      "레스토랑 팁은 포함되어 있지만 5-10% 추가 가능",
      "일요일은 대부분 상점이 문을 닫음",
      "소매치기 주의. 특히 에펠탑과 메트로",
      "박물관은 예약 필수. 현장 줄이 매우 김",
    ],
    highlights: ["예술과 문화의 중심", "미슐랭 레스토랑", "세계적인 패션", "낭만적인 거리"],
  },
  뉴욕: {
    name: "뉴욕",
    country: "미국",
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
  },
  싱가포르: {
    name: "싱가포르",
    country: "싱가포르",
    emoji: "🦁",
    description: "미래 도시와 다문화의 조화. 깨끗하고 안전한 아시아의 허브 도시입니다.",
    heroImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=500&q=80",
      "https://images.unsplash.com/photo-1506351421178-63b52a2d2562?w=500&q=80",
      "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=400&q=80",
    ],
    bestSeason: "2월-4월 (비교적 건조)",
    avgTemp: "연중 25-32°C (열대기후)",
    avgBudget: "₩700,000 - ₩1,000,000 (3-4일)",
    recommendedDays: "3-4일",
    timezone: "GMT+8 (한국보다 1시간 느림)",
    language: "영어, 중국어, 말레이어, 타밀어",
    currency: "싱가포르 달러 (S$) - 1달러 ≈ 1,000원",
    transportation: [
      {
        name: "MRT",
        description: "깨끗하고 정확한 지하철. 1회 ₩1,500-3,000",
      },
      {
        name: "싱가포르 투어리스트 패스",
        description: "대중교통 무제한. 1일권 ₩13,000",
      },
      {
        name: "그랩",
        description: "동남아 우버. 안전하고 편리",
      },
    ],
    mustVisit: [
      {
        name: "마리나 베이 샌즈",
        category: "랜드마크",
        description: "배 모양 옥상의 스카이파크. 인피니티 풀",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&q=80",
      },
      {
        name: "가든스 바이 더 베이",
        category: "자연",
        description: "미래형 정원. 슈퍼트리 그로브",
        image: "https://images.unsplash.com/photo-1506351421178-63b52a2d2562?w=400&q=80",
      },
      {
        name: "센토사 섬",
        category: "관광",
        description: "유니버설 스튜디오, 해변, 수족관",
        image: "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=400&q=80",
      },
      {
        name: "차이나타운",
        category: "문화",
        description: "중국 문화와 먹거리. 호커센터",
        image: "https://images.unsplash.com/photo-1555633514-abcee6ab92e1?w=400&q=80",
      },
    ],
    foods: [
      {
        name: "칠리 크랩",
        nameLocal: "Chili Crab",
        description: "싱가포르 대표 요리. 토마토 칠리 소스",
        price: "₩40,000 - ₩60,000",
      },
      {
        name: "하이난 치킨 라이스",
        nameLocal: "Hainanese Chicken Rice",
        description: "부드러운 닭고기와 향긋한 밥",
        price: "₩5,000 - ₩8,000",
      },
      {
        name: "락사",
        nameLocal: "Laksa",
        description: "코코넛 밀크의 매콤한 국수",
        price: "₩6,000 - ₩10,000",
      },
      {
        name: "카야 토스트",
        nameLocal: "Kaya Toast",
        description: "코코넛 잼을 바른 토스트. 아침 정식",
        price: "₩4,000 - ₩6,000",
      },
    ],
    tips: [
      "껌 금지, 길거리 흡연 벌금 등 법규 엄격",
      "호커센터는 저렴하고 맛있는 로컬 푸드",
      "영어가 잘 통해 여행하기 편함",
      "물가가 비싼 편. 특히 술값이 높음",
      "덥고 습하지만 실내는 에어컨으로 춥기도 함",
    ],
    highlights: ["최첨단 도시", "안전하고 깨끗", "다문화 융합", "쇼핑 천국"],
  },
};

export default function CityDetailPage({ params }: { params: { city: string } }) {
  const koreanName = slugToKorean[params.city];
  const city = koreanName ? cityData[koreanName] : undefined;

  if (!city) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <img src={city.heroImage || "/placeholder.svg"} alt={city.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-6xl">{city.emoji}</span>
              <div>
                <h1 className="text-5xl font-bold text-white mb-2">{city.name}</h1>
                <p className="text-xl text-white/90">{city.country}</p>
              </div>
            </div>
            <p className="text-lg text-white/90 max-w-3xl">{city.description}</p>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-12">
        {/* Highlights */}
        <div className="mb-12 flex flex-wrap gap-3">
          {city.highlights.map((highlight, index) => (
            <Badge key={index} variant="secondary" className="px-4 py-2 text-sm">
              {highlight}
            </Badge>
          ))}
        </div>

        {/* Quick Info Grid */}
        <div className="mb-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="flex items-start gap-3 p-6">
              <Calendar className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">최적 시즌</p>
                <p className="font-medium">{city.bestSeason}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-start gap-3 p-6">
              <Thermometer className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">평균 기온</p>
                <p className="font-medium text-sm">{city.avgTemp}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-start gap-3 p-6">
              <DollarSign className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">예상 예산</p>
                <p className="font-medium">{city.avgBudget}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-start gap-3 p-6">
              <Clock className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">권장 일정</p>
                <p className="font-medium">{city.recommendedDays}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Must Visit Places */}
        <section className="mb-16">
          <div className="mb-8 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">꼭 가봐야 할 곳</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {city.mustVisit.map((place, index) => (
              <Card key={index} className="overflow-hidden border-0 shadow-md transition-shadow hover:shadow-lg">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={place.image || "/placeholder.svg"}
                    alt={place.name}
                    className="h-full w-full object-cover"
                  />
                  <Badge className="absolute top-4 right-4">{place.category}</Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-lg font-bold">{place.name}</h3>
                  <p className="text-sm text-muted-foreground">{place.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Foods */}
        <section className="mb-16">
          <div className="mb-8 flex items-center gap-2">
            <Utensils className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">현지 음식</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {city.foods.map((food, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold">{food.name}</h3>
                      <p className="text-sm text-muted-foreground">{food.nameLocal}</p>
                    </div>
                    <Badge variant="secondary">{food.price}</Badge>
                  </div>
                  <p className="text-sm text-foreground/80">{food.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Transportation */}
        <section className="mb-16">
          <div className="mb-8 flex items-center gap-2">
            <Train className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">교통수단</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {city.transportation.map((transport, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="mb-2 font-bold">{transport.name}</h3>
                  <p className="text-sm text-muted-foreground">{transport.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Travel Tips */}
        <section className="mb-16">
          <div className="mb-8 flex items-center gap-2">
            <Info className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold">여행 팁</h2>
          </div>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-3">
                {city.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {index + 1}
                    </span>
                    <span className="text-foreground/80">{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Basic Info */}
        <section className="mb-16">
          <h2 className="mb-6 text-3xl font-bold">기본 정보</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <p className="mb-1 text-sm text-muted-foreground">시차</p>
                <p className="font-medium">{city.timezone}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="mb-1 text-sm text-muted-foreground">언어</p>
                <p className="font-medium">{city.language}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="mb-1 text-sm text-muted-foreground">통화</p>
                <p className="font-medium">{city.currency}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">{city.name} 여행 계획을 만들어볼까요?</h2>
          <p className="mb-6 text-lg text-foreground/80">AI가 당신의 취향에 맞는 완벽한 여행 코스를 만들어드려요</p>
          <Button asChild size="lg" className="bg-cta text-cta-foreground hover:bg-cta/90">
            <Link href={`/chat?destination=${encodeURIComponent(city.name)}`}>
              <ArrowRight className="mr-2 h-5 w-5" />
              {city.name} 여행 계획 시작하기
            </Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
