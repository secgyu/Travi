import { openai } from "@ai-sdk/openai";
import { consumeStream, convertToModelMessages, streamText, type UIMessage } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const prompt = convertToModelMessages(messages);

    const systemMessage = {
      role: "system" as const,
      content: `당신은 트래비(Travi)의 AI 여행 플래너입니다. 
사용자와 친근하게 대화하며 여행 계획을 도와주세요.

다음 정보를 순서대로 물어보세요:
1. 여행지 (어디로 가고 싶은지)
2. 여행 기간 (며칠, 언제 출발)
3. 예산 (대략적인 금액)
4. 여행 스타일 (맛집투어, 관광, 쇼핑, 액티비티 등)
5. 동행인 (혼자, 친구, 가족, 커플)

모든 정보를 수집했으면, 상세한 여행 일정을 생성해주세요.

일정은 다음 형식으로 작성하세요:
- 각 일차별로 구분
- 시간대별 활동 (오전 9시부터 시작)
- 장소명 (한글 + 현지어)
- 이동 방법 (대중교통 상세)
- 소요 시간
- 예상 비용
- 활동 유형 (관광/식사/쇼핑)

예시:
**1일차 - 2025년 3월 15일**

🕘 오전 9:00 - 시부야 스크램블 교차로 (渋谷スクランブル交差点)
🚇 이동: 야마노테선 → 시부야역 하차 (2번 출구)
⏱️ 소요: 도보 5분
💰 비용: 무료
📸 포토존 추천
---

한국어로 답변하고, 이모지를 적절히 사용하며, 친근하고 도움이 되는 톤으로 대화하세요.`,
    };

    const result = streamText({
      model: openai("gpt-4o-mini"),
      messages: [systemMessage, ...prompt],
      abortSignal: req.signal,
    });

    return result.toUIMessageStreamResponse({
      onFinish: async ({ isAborted }) => {
        if (isAborted) {
          console.log("[travi] Chat stream aborted");
        }
      },
      consumeSseStream: consumeStream,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
