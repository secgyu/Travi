export const CITY_KO_TO_EN: Record<string, string> = {
  // 일본
  "도쿄": "Tokyo",
  "오사카": "Osaka",
  "교토": "Kyoto",
  "후쿠오카": "Fukuoka",
  "삿포로": "Sapporo",
  "나고야": "Nagoya",
  "요코하마": "Yokohama",
  "나라": "Nara",
  "고베": "Kobe",
  "오키나와": "Okinawa",

  // 유럽
  "파리": "Paris",
  "런던": "London",
  "바르셀로나": "Barcelona",
  "로마": "Rome",
  "밀라노": "Milan",
  "베니스": "Venice",
  "프라하": "Prague",
  "빈": "Vienna",
  "암스테르담": "Amsterdam",
  "베를린": "Berlin",
  "뮌헨": "Munich",
  "취리히": "Zurich",
  "마드리드": "Madrid",
  "리스본": "Lisbon",
  "아테네": "Athens",
  "부다페스트": "Budapest",

  // 미국
  "뉴욕": "New York",
  "로스앤젤레스": "Los Angeles",
  "샌프란시스코": "San Francisco",
  "라스베가스": "Las Vegas",
  "시카고": "Chicago",
  "하와이": "Hawaii",
  "마이애미": "Miami",
  "시애틀": "Seattle",
  "보스턴": "Boston",

  // 동남아
  "방콕": "Bangkok",
  "싱가포르": "Singapore",
  "다낭": "Da Nang",
  "하노이": "Hanoi",
  "호치민": "Ho Chi Minh City",
  "발리": "Bali",
  "세부": "Cebu",
  "보라카이": "Boracay",
  "푸켓": "Phuket",
  "치앙마이": "Chiang Mai",
  "쿠알라룸푸르": "Kuala Lumpur",
  "자카르타": "Jakarta",

  // 중화권
  "홍콩": "Hong Kong",
  "타이베이": "Taipei",
  "상하이": "Shanghai",
  "베이징": "Beijing",
  "마카오": "Macau",

  // 오세아니아
  "시드니": "Sydney",
  "멜버른": "Melbourne",
  "브리즈번": "Brisbane",
  "괌": "Guam",
  "사이판": "Saipan",
  "오클랜드": "Auckland",

  // 중동/아프리카
  "두바이": "Dubai",
  "아부다비": "Abu Dhabi",
  "이스탄불": "Istanbul",
  "카이로": "Cairo",
  "케이프타운": "Cape Town",
  "요하네스버그": "Johannesburg",

  // 한국
  "서울": "Seoul",
  "부산": "Busan",
  "제주": "Jeju",
  "인천": "Incheon",
  "경주": "Gyeongju",
};

export function toEnglishCityName(koreanName: string): string {
  if (CITY_KO_TO_EN[koreanName]) {
    return CITY_KO_TO_EN[koreanName];
  }

  for (const [ko, en] of Object.entries(CITY_KO_TO_EN)) {
    if (koreanName.includes(ko)) {
      return en;
    }
  }

  return koreanName;
}

