import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Supabase URL 또는 Service Role Key가 설정되지 않았습니다.");
  console.log("NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl);
  console.log("SUPABASE_SERVICE_ROLE_KEY:", supabaseServiceKey ? "설정됨" : "없음");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// 도쿄 여행 더미 데이터
const tokyoItinerary = [
  {
    day: 1,
    title: "1일차",
    date: "2025년 3월 15일 (토)",
    activities: [
      {
        time: "오전 9:00",
        title: "시부야 스크램블 교차로",
        subtitle: "渋谷スクランブル交差点",
        type: "관광",
        transport: "야마노테선 → 시부야역 하차 (2번 출구)",
        duration: "도보 5분",
        price: "무료",
        photo: true,
      },
      {
        time: "오전 11:00",
        title: "하라주쿠 다케시타 거리",
        subtitle: "原宿竹下通り",
        type: "쇼핑",
        transport: "도보 15분",
        duration: "2시간",
        price: "변동",
        photo: true,
      },
      {
        time: "오후 1:00",
        title: "점심 - 라멘",
        subtitle: "이치란 시부야점 (一蘭)",
        type: "식사",
        transport: "도보 10분",
        duration: "1시간",
        price: "₩15,000원",
        category: "일식",
      },
      {
        time: "오후 3:00",
        title: "메이지 신궁",
        subtitle: "明治神宮",
        type: "관광",
        transport: "야마노테선 → 하라주쿠역",
        duration: "2시간",
        price: "무료",
        photo: true,
      },
      {
        time: "오후 6:00",
        title: "저녁 - 이자카야",
        subtitle: "신주쿠 오모이데 요코초",
        type: "식사",
        transport: "긴자선 → 신주쿠역",
        duration: "2시간",
        price: "₩35,000원",
        category: "일식",
      },
    ],
  },
  {
    day: 2,
    title: "2일차",
    date: "2025년 3월 16일 (일)",
    activities: [
      {
        time: "오전 8:00",
        title: "츠키지 장외시장",
        subtitle: "築地場外市場",
        type: "관광",
        transport: "히비야선 → 츠키지역",
        duration: "3시간",
        price: "무료",
        photo: true,
      },
      {
        time: "오후 12:00",
        title: "아사쿠사 센소지",
        subtitle: "浅草寺",
        type: "관광",
        transport: "긴자선 → 아사쿠사역",
        duration: "2시간",
        price: "무료",
        photo: true,
      },
      {
        time: "오후 3:00",
        title: "스카이트리",
        subtitle: "東京スカイツリー",
        type: "관광",
        transport: "도보 20분",
        duration: "2시간",
        price: "₩25,000원",
        photo: true,
      },
      {
        time: "오후 6:00",
        title: "저녁 - 야키니쿠",
        subtitle: "긴자 야키니쿠 (銀座 焼肉)",
        type: "식사",
        transport: "긴자선 → 긴자역",
        duration: "2시간",
        price: "₩45,000원",
        category: "일식",
      },
    ],
  },
  {
    day: 3,
    title: "3일차",
    date: "2025년 3월 17일 (월)",
    activities: [
      {
        time: "오전 9:00",
        title: "우에노 공원",
        subtitle: "上野公園",
        type: "관광",
        transport: "야마노테선 → 우에노역",
        duration: "2시간",
        price: "무료",
        photo: true,
      },
      {
        time: "오전 11:00",
        title: "아메요코 시장",
        subtitle: "アメ横",
        type: "쇼핑",
        transport: "도보 5분",
        duration: "2시간",
        price: "변동",
        photo: false,
      },
      {
        time: "오후 1:00",
        title: "점심 - 돈카츠",
        subtitle: "토키 (とんき)",
        type: "식사",
        transport: "메구로역",
        duration: "1시간",
        price: "₩18,000원",
        category: "일식",
      },
      {
        time: "오후 3:00",
        title: "긴자 쇼핑",
        subtitle: "銀座",
        type: "쇼핑",
        transport: "긴자선 → 긴자역",
        duration: "3시간",
        price: "변동",
        photo: false,
      },
      {
        time: "오후 7:00",
        title: "저녁 - 스시",
        subtitle: "긴자 스시 (銀座 寿司)",
        type: "식사",
        transport: "도보 10분",
        duration: "2시간",
        price: "₩80,000원",
        category: "일식",
      },
    ],
  },
];

async function seedTokyoTravelPlan() {
  try {
    console.log("🚀 도쿄 여행 계획 더미 데이터 삽입 시작...");

    // 1. 테스트 사용자 생성 또는 조회
    let testUser;
    const { data: existingUser } = await supabase.from("users").select().eq("email", "demo@travi.kr").single();

    if (existingUser) {
      testUser = existingUser;
      console.log("✅ 기존 테스트 사용자 사용:", testUser.id);
    } else {
      const { data: newUser, error: userError } = await supabase
        .from("users")
        .insert({
          email: "demo@travi.kr",
          name: "데모 사용자",
          provider: "credentials",
          bio: "Travi 데모 여행 계획",
        })
        .select()
        .single();

      if (userError) {
        console.error("❌ 사용자 생성 실패:", userError);
        process.exit(1);
      }

      testUser = newUser;
      console.log("✅ 테스트 사용자 생성 완료:", testUser.id);
    }

    // 2. 여행 계획 삽입
    const { data: travelPlan, error: planError } = await supabase
      .from("travel_plans")
      .insert({
        user_id: testUser.id,
        title: "도쿄 3일 여행 코스",
        destination: "도쿄, 일본",
        start_date: "2025-03-15",
        end_date: "2025-03-17",
        budget: 850000,
        currency: "KRW",
        travel_style: ["문화", "음식", "쇼핑"],
        companions: "2인",
        status: "planning",
        itinerary: tokyoItinerary,
        notes: "도쿄 3일 여행 일정 - AI 추천 코스",
        is_public: true,
        likes_count: 42,
        views_count: 128,
      })
      .select()
      .single();

    if (planError) {
      console.error("❌ 여행 계획 삽입 실패:", planError);
      process.exit(1);
    }

    console.log("✅ 도쿄 여행 계획 삽입 완료!");
    console.log("📋 Travel Plan ID:", travelPlan.id);
    console.log("👤 User ID:", testUser.id);
    console.log("🎯 Title:", travelPlan.title);
    console.log("📍 Destination:", travelPlan.destination);
    console.log("📅 Dates:", travelPlan.start_date, "~", travelPlan.end_date);
    console.log("💰 Budget:", travelPlan.budget, travelPlan.currency);
    console.log("\n🔗 결과 페이지 URL:");
    console.log(`   http://localhost:3000/results?id=${travelPlan.id}`);
    console.log("\n✨ 더미 데이터 삽입 완료!");
  } catch (error) {
    console.error("❌ 예상치 못한 오류:", error);
    process.exit(1);
  }
}

seedTokyoTravelPlan();
