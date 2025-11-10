import { openai } from "@ai-sdk/openai";
import { consumeStream, convertToModelMessages, streamText, type UIMessage } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const prompt = convertToModelMessages(messages);

    const systemMessage = {
      role: "system" as const,
      content: `당신은 트래비(Travee)의 AI 여행 플래너입니다. 
사용자와 친근하게 대화하며 여행 계획을 도와주세요.

다음 정보를 순서대로 물어보세요:
1. 여행지 (어디로 가고 싶은지)
2. 여행 기간 (며칠, 언제 출발)
3. 예산 (대략적인 금액)
4. 여행 스타일 (맛집투어, 관광, 쇼핑, 액티비티 등)
5. 동행인 (혼자, 친구, 가족, 커플)

모든 정보를 수집했으면, "완벽해요! 지금 바로 맞춤 여행 계획을 만들어드릴게요 ✈️" 라고 답하고 
간단한 3일치 여행 일정을 생성해주세요.

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
