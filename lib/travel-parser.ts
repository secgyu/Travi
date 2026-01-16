import type { UIMessage } from "ai";
import type { Activity, DayItinerary } from "@/types/results";

interface TextPart {
  type: "text";
  text: string;
}

// 국가/대륙명 제외 리스트
const EXCLUDE_DESTINATIONS = [
  "일본",
  "한국",
  "미국",
  "중국",
  "유럽",
  "아시아",
  "동남아",
  "북미",
  "남미",
];

/**
 * AI 채팅 메시지에서 여행 계획 정보를 추출
 */
export function extractTravelPlanInfo(messages: UIMessage[]) {
  const conversationText = messages
    .map((m) =>
      m.parts
        .filter((p): p is TextPart => p.type === "text" && "text" in p)
        .map((p) => p.text)
        .join("")
    )
    .join("\n");

  // 도시명 자동 추출
  // 1. AI 응답에서 "## 도시명 N일 여행" 패턴 우선 검색
  let destinationMatch = conversationText.match(/##\s*(.+?)\s+\d+일\s*(여행|일정|코스)/);

  // 2. 없으면 "도시명 N일 여행/일정" 패턴 검색
  if (!destinationMatch) {
    destinationMatch = conversationText.match(/([가-힣A-Za-z]+)\s+\d+일\s*(여행|일정|코스)/);
  }

  // 3. 국가/대륙명은 제외
  let destination = destinationMatch ? destinationMatch[1].trim() : "여행지";

  if (EXCLUDE_DESTINATIONS.includes(destination)) {
    destination = "여행지";
  }

  const durationMatch = conversationText.match(/(\d+)일/);
  const duration = durationMatch ? parseInt(durationMatch[1]) : 3;

  const budgetMatch = conversationText.match(/(\d+)만원|(\d{6,})원/);
  let budget = 1000000;

  if (budgetMatch) {
    budget = budgetMatch[1] ? parseInt(budgetMatch[1]) * 10000 : parseInt(budgetMatch[2]);
  }

  const styles: string[] = [];
  if (conversationText.includes("맛집") || conversationText.includes("음식")) styles.push("음식");
  if (conversationText.includes("관광") || conversationText.includes("명소")) styles.push("관광");
  if (conversationText.includes("쇼핑")) styles.push("쇼핑");
  if (conversationText.includes("액티비티") || conversationText.includes("활동")) styles.push("액티비티");
  if (styles.length === 0) styles.push("문화", "관광");

  return {
    destination,
    duration,
    budget,
    styles,
  };
}

/**
 * 활동 타입 결정 (식사/쇼핑/액티비티/관광)
 */
function determineActivityType(title: string): string {
  const titleLower = title.toLowerCase();

  if (
    titleLower.includes("식사") ||
    titleLower.includes("점심") ||
    titleLower.includes("저녁") ||
    titleLower.includes("아침") ||
    titleLower.includes("맛집") ||
    titleLower.includes("라멘") ||
    titleLower.includes("스시")
  ) {
    return "식사";
  }

  if (titleLower.includes("쇼핑") || titleLower.includes("시장") || titleLower.includes("market")) {
    return "쇼핑";
  }

  if (
    titleLower.includes("체험") ||
    titleLower.includes("투어") ||
    titleLower.includes("클래스") ||
    titleLower.includes("액티비티")
  ) {
    return "액티비티";
  }

  return "관광";
}

/**
 * 기본 일정 생성
 */
function createDefaultItinerary(duration: number): DayItinerary[] {
  const result: DayItinerary[] = [];

  for (let i = 1; i <= duration; i++) {
    result.push({
      day: i,
      title: `${i}일차`,
      date: `Day ${i}`,
      activities: [
        {
          time: "오전 9:00",
          title: "여행 시작",
          subtitle: "",
          type: "관광",
          transport: "대중교통",
          duration: "종일",
          price: "변동",
          photo: false,
        },
      ],
    });
  }

  return result;
}

/**
 * 단일 메시지에서 일정 파싱
 */
export function parseItinerary(messageText: string, duration: number): DayItinerary[] {
  const itinerary: DayItinerary[] = [];
  const lines = messageText.split("\n");

  let currentDay: number | null = null;
  let currentActivities: Activity[] = [];
  let currentActivity: Activity | null = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // 일차 패턴 매칭
    const dayMatch = line.match(/\*?\*?(\d+)일차/);
    if (dayMatch) {
      if (currentDay !== null && currentActivities.length > 0) {
        itinerary.push({
          day: currentDay,
          title: `${currentDay}일차`,
          date: `Day ${currentDay}`,
          activities: currentActivities,
        });
      }

      currentDay = parseInt(dayMatch[1]);
      currentActivities = [];
      currentActivity = null;
      continue;
    }

    // 시간/장소 패턴 매칭
    const timeMatch = line.match(/(오전|오후|저녁)\s*(\d{1,2}):(\d{2})\s*[-–—]\s*(.+)/);
    if (timeMatch && currentDay !== null) {
      if (currentActivity) {
        currentActivities.push(currentActivity);
      }

      const period = timeMatch[1];
      const hour = timeMatch[2];
      const minute = timeMatch[3];
      const titleRaw = timeMatch[4].trim();
      const titleParts = titleRaw.split("(");
      const title = titleParts[0].trim();
      const subtitle = titleParts[1] ? titleParts[1].replace(")", "").trim() : "";

      currentActivity = {
        time: `${period} ${hour}:${minute}`,
        title: title,
        subtitle: subtitle,
        type: determineActivityType(title),
        transport: "도보",
        duration: "1시간",
        price: "무료",
        photo: false,
      };

      continue;
    }

    // 활동 상세 정보 파싱
    if (currentActivity) {
      if (line.includes("이동:")) {
        const transportMatch = line.match(/이동:\s*(.+)/);
        if (transportMatch) {
          currentActivity.transport = transportMatch[1].trim();
        }
      }

      if (line.includes("소요:")) {
        const durationMatch = line.match(/소요:\s*(.+)/);
        if (durationMatch) {
          currentActivity.duration = durationMatch[1].trim();
        }
      }

      if (line.includes("비용:")) {
        const priceMatch = line.match(/비용:\s*(.+)/);
        if (priceMatch) {
          currentActivity.price = priceMatch[1].trim();
        }
      }

      if (line.includes("📸")) {
        currentActivity.photo = true;
      }
    }
  }

  // 마지막 일차 처리
  if (currentDay !== null) {
    if (currentActivity) {
      currentActivities.push(currentActivity);
    }
    if (currentActivities.length > 0) {
      itinerary.push({
        day: currentDay,
        title: `${currentDay}일차`,
        date: `Day ${currentDay}`,
        activities: currentActivities,
      });
    }
  }

  // 파싱 결과가 없으면 기본 일정 반환
  if (itinerary.length === 0) {
    return createDefaultItinerary(duration);
  }

  return itinerary;
}

/**
 * 모든 메시지에서 일정 파싱 및 병합
 */
export function parseAllMessages(messages: UIMessage[], duration: number): DayItinerary[] {
  const allItineraries = new Map<number, DayItinerary>();

  for (const message of messages) {
    if (message.role === "assistant") {
      const messageText = message.parts
        .filter((p): p is TextPart => p.type === "text" && "text" in p)
        .map((p) => p.text)
        .join("");

      const parsed = parseItinerary(messageText, duration);

      for (const dayData of parsed) {
        allItineraries.set(dayData.day, dayData);
      }
    }
  }

  const result = Array.from(allItineraries.values()).sort((a, b) => a.day - b.day);

  // 결과가 없으면 기본 일정 반환
  if (result.length === 0) {
    return createDefaultItinerary(duration);
  }

  return result;
}
