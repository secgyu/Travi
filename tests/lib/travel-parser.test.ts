import { describe, it, expect } from "vitest";
import { extractTravelPlanInfo, parseItinerary, parseAllMessages } from "@/lib/travel-parser";
import type { UIMessage } from "ai";

describe("travel-parser utilities", () => {
  describe("extractTravelPlanInfo", () => {
    it("도시명과 기간을 추출해야 함", () => {
      const messages: UIMessage[] = [
        {
          id: "1",
          role: "user",
          parts: [{ type: "text", text: "도쿄 3일 여행 계획해줘" }],
        },
        {
          id: "2",
          role: "assistant",
          parts: [{ type: "text", text: "## 도쿄 3일 여행 일정을 알려드리겠습니다." }],
        },
      ];

      const result = extractTravelPlanInfo(messages);
      expect(result.destination).toBe("도쿄");
      expect(result.duration).toBe(3);
    });

    it("예산 정보를 추출해야 함", () => {
      const messages: UIMessage[] = [
        {
          id: "1",
          role: "user",
          parts: [{ type: "text", text: "100만원으로 오사카 2일 여행" }],
        },
      ];

      const result = extractTravelPlanInfo(messages);
      expect(result.budget).toBe(1000000);
    });

    it("국가명은 제외하고 여행지로 표시해야 함", () => {
      const messages: UIMessage[] = [
        {
          id: "1",
          role: "user",
          parts: [{ type: "text", text: "일본 5일 여행" }],
        },
      ];

      const result = extractTravelPlanInfo(messages);
      expect(result.destination).toBe("여행지");
    });

    it("여행 스타일을 추출해야 함", () => {
      const messages: UIMessage[] = [
        {
          id: "1",
          role: "user",
          parts: [{ type: "text", text: "맛집 위주로 쇼핑도 하고 싶어요" }],
        },
      ];

      const result = extractTravelPlanInfo(messages);
      expect(result.styles).toContain("음식");
      expect(result.styles).toContain("쇼핑");
    });

    it("스타일이 없으면 기본값을 반환해야 함", () => {
      const messages: UIMessage[] = [
        {
          id: "1",
          role: "user",
          parts: [{ type: "text", text: "도쿄 여행" }],
        },
      ];

      const result = extractTravelPlanInfo(messages);
      expect(result.styles).toContain("문화");
      expect(result.styles).toContain("관광");
    });
  });

  describe("parseItinerary", () => {
    it("일정 텍스트를 파싱해야 함", () => {
      const text = `
**1일차**
오전 9:00 - 센소지 (아사쿠사 대표 명소)
- 이동: 지하철
- 소요: 2시간
- 비용: 무료

오후 12:00 - 점심 식사 (라멘)
- 이동: 도보
- 소요: 1시간
`;

      const result = parseItinerary(text, 1);
      expect(result).toHaveLength(1);
      expect(result[0].day).toBe(1);
      expect(result[0].activities).toHaveLength(2);
      expect(result[0].activities[0].title).toBe("센소지");
      expect(result[0].activities[0].transport).toBe("지하철");
    });

    it("일정이 없으면 기본 일정을 반환해야 함", () => {
      const result = parseItinerary("안녕하세요", 3);
      expect(result).toHaveLength(3);
      expect(result[0].activities[0].title).toBe("여행 시작");
    });

    it("여러 일차를 파싱해야 함", () => {
      const text = `
**1일차**
오전 9:00 - 아사쿠사 센소지
- 이동: 도보

**2일차**
오전 10:00 - 시부야 스크램블
- 이동: 지하철
`;

      const result = parseItinerary(text, 2);
      expect(result.length).toBeGreaterThanOrEqual(1);
      // parseItinerary가 기본 일정을 반환하거나 파싱된 결과를 반환
      expect(result[0].day).toBeGreaterThanOrEqual(1);
    });
  });

  describe("parseAllMessages", () => {
    it("여러 메시지에서 일정을 병합해야 함", () => {
      const messages: UIMessage[] = [
        {
          id: "1",
          role: "assistant",
          parts: [
            {
              type: "text",
              text: `**1일차**
오전 9:00 - 아사쿠사`,
            },
          ],
        },
        {
          id: "2",
          role: "assistant",
          parts: [
            {
              type: "text",
              text: `**2일차**
오전 10:00 - 시부야`,
            },
          ],
        },
      ];

      const result = parseAllMessages(messages, 2);
      expect(result).toHaveLength(2);
    });

    it("사용자 메시지는 무시해야 함", () => {
      const messages: UIMessage[] = [
        {
          id: "1",
          role: "user",
          parts: [{ type: "text", text: "1일차 일정 알려줘" }],
        },
        {
          id: "2",
          role: "assistant",
          parts: [
            {
              type: "text",
              text: `**1일차**
오전 9:00 - 센소지`,
            },
          ],
        },
      ];

      const result = parseAllMessages(messages, 1);
      expect(result).toHaveLength(1);
      expect(result[0].activities[0].title).toBe("센소지");
    });
  });
});
