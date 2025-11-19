import { notFound } from "next/navigation";
import { DemoResultsClient } from "./demo-results-client";

const demoData = {
  tokyo: {
    title: "도쿄 3일 여행 코스 🗼",
    dates: "2025년 3월 15일 - 3월 17일",
    location: "도쿄, 일본",
    budget: "₩850,000원",
    itinerary: [
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
            transport: "🚇 야마노테선 → 시부야역 하차 (2번 출구)",
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
            price: "₩₩",
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
            transport: "🚇 야마노테선 → 하라주쿠역",
            duration: "2시간",
            price: "무료",
            photo: true,
          },
          {
            time: "오후 6:00",
            title: "저녁 - 이자카야",
            subtitle: "신주쿠 오모이데 요코초",
            type: "식사",
            transport: "🚇 긴자선 → 신주쿠역",
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
            transport: "🚇 히비야선 → 츠키지역",
            duration: "3시간",
            price: "₩₩",
            photo: true,
          },
          {
            time: "오후 12:00",
            title: "아사쿠사 센소지",
            subtitle: "浅草寺",
            type: "관광",
            transport: "🚇 긴자선 → 아사쿠사역",
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
            transport: "🚇 긴자선 → 긴자역",
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
            transport: "🚇 야마노테선 → 우에노역",
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
            price: "₩₩",
            photo: false,
          },
          {
            time: "오후 1:00",
            title: "점심 - 돈카츠",
            subtitle: "토키 (とんき)",
            type: "식사",
            transport: "🚇 메구로역",
            duration: "1시간",
            price: "₩18,000원",
            category: "일식",
          },
          {
            time: "오후 3:00",
            title: "긴자 쇼핑",
            subtitle: "銀座",
            type: "쇼핑",
            transport: "🚇 긴자선 → 긴자역",
            duration: "3시간",
            price: "₩₩₩",
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
    ],
  },
  osaka: {
    title: "오사카 2일 먹방 여행 🐙",
    dates: "2025년 4월 10일 - 4월 11일",
    location: "오사카, 일본",
    budget: "₩550,000원",
    itinerary: [
      {
        day: 1,
        title: "1일차",
        date: "2025년 4월 10일 (목)",
        activities: [
          {
            time: "오전 10:00",
            title: "오사카성",
            subtitle: "大阪城",
            type: "관광",
            transport: "🚇 다니마치선 → 다니마치욘초메역",
            duration: "2시간",
            price: "₩6,000원",
            photo: true,
          },
          {
            time: "오후 1:00",
            title: "점심 - 오코노미야키",
            subtitle: "치보 (千房)",
            type: "식사",
            transport: "도보 15분",
            duration: "1시간",
            price: "₩15,000원",
            category: "일식",
          },
          {
            time: "오후 3:00",
            title: "우메다 공중정원",
            subtitle: "梅田スカイビル",
            type: "관광",
            transport: "🚇 미도스지선 → 우메다역",
            duration: "1.5시간",
            price: "₩15,000원",
            photo: true,
          },
          {
            time: "오후 6:00",
            title: "도톤보리 & 글리코상",
            subtitle: "道頓堀",
            type: "관광",
            transport: "🚇 미도스지선 → 난바역",
            duration: "2시간",
            price: "무료",
            photo: true,
          },
          {
            time: "오후 8:00",
            title: "저녁 - 타코야키 & 맥주",
            subtitle: "앗치치혼포",
            type: "식사",
            transport: "도보 5분",
            duration: "1시간",
            price: "₩10,000원",
            category: "길거리음식",
          },
        ],
      },
      {
        day: 2,
        title: "2일차",
        date: "2025년 4월 11일 (금)",
        activities: [
          {
            time: "오전 9:00",
            title: "유니버셜 스튜디오 재팬",
            subtitle: "USJ",
            type: "관광",
            transport: "🚇 JR 유메사키선 → 유니버셜시티역",
            duration: "종일",
            price: "₩85,000원",
            photo: true,
          },
          {
            time: "오후 7:00",
            title: "저녁 - 규카츠",
            subtitle: "모토무라 규카츠",
            type: "식사",
            transport: "난바역 인근",
            duration: "1.5시간",
            price: "₩25,000원",
            category: "일식",
          },
        ],
      },
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(demoData).map((city) => ({
    city,
  }));
}

export default async function DemoPage({ params }: { params: Promise<{ city: string }> }) {
  const { city } = await params;
  const cityData = demoData[city as keyof typeof demoData];

  if (!cityData) {
    notFound();
  }

  return <DemoResultsClient data={cityData} city={city} />;
}
