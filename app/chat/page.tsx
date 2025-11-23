"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect, useMemo } from "react";
import { Send, MapPin, Sparkles, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/header";
import { Logo } from "@/components/logo";
import { GiJapan, GiCastle, GiPagoda } from "react-icons/gi";
import { MdWavingHand } from "react-icons/md";
import { FaLandmark } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";

// AI 응답에서 여행 계획 정보 추출
function extractTravelPlanInfo(messages: any[]) {
  const conversationText = messages
    .map((m) =>
      m.parts
        .filter((p: any) => p.type === "text")
        .map((p: any) => p.text)
        .join("")
    )
    .join("\n");

  // 여행지 추출 (예: "도쿄", "오사카", "파리" 등)
  const destinationMatch = conversationText.match(
    /(도쿄|오사카|파리|방콕|뉴욕|런던|바르셀로나|로마|싱가포르|홍콩|타이베이|다낭)[^가-힣]*(여행|가|방문)/
  );
  const destination = destinationMatch ? destinationMatch[1] : "여행지";

  // 여행 기간 추출 (예: "3일", "2박 3일" 등)
  const durationMatch = conversationText.match(/(\d+)일/);
  const duration = durationMatch ? parseInt(durationMatch[1]) : 3;

  // 예산 추출 (예: "100만원", "1000000원" 등)
  const budgetMatch = conversationText.match(/(\d+)만원|(\d{6,})원/);
  let budget = 1000000;
  if (budgetMatch) {
    budget = budgetMatch[1] ? parseInt(budgetMatch[1]) * 10000 : parseInt(budgetMatch[2]);
  }

  // 여행 스타일 추출
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

// AI 응답에서 일정 파싱 (개선된 버전)
function parseItinerary(messageText: string, duration: number) {
  const itinerary: any[] = [];

  // 1단계: 일차별로 분리
  const lines = messageText.split("\n");
  let currentDay: number | null = null;
  let currentActivities: any[] = [];
  let currentActivity: any = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // 일차 감지: "**1일차" 또는 "1일차 -" 형식
    const dayMatch = line.match(/\*?\*?(\d+)일차/);
    if (dayMatch) {
      // 이전 일차 데이터 저장
      if (currentDay !== null && currentActivities.length > 0) {
        itinerary.push({
          day: currentDay,
          title: `${currentDay}일차`,
          date: `Day ${currentDay}`,
          activities: currentActivities,
        });
      }

      // 새로운 일차 시작
      currentDay = parseInt(dayMatch[1]);
      currentActivities = [];
      currentActivity = null;
      continue;
    }

    // 활동 시간 감지: "오전 9:00 -" 형식
    const timeMatch = line.match(/(오전|오후|저녁)\s*(\d{1,2}):(\d{2})\s*[-–—]\s*(.+)/);
    if (timeMatch && currentDay !== null) {
      // 이전 활동 저장
      if (currentActivity) {
        currentActivities.push(currentActivity);
      }

      const period = timeMatch[1];
      const hour = timeMatch[2];
      const minute = timeMatch[3];
      const titleRaw = timeMatch[4].trim();

      // 제목과 부제목 분리
      const titleParts = titleRaw.split("(");
      const title = titleParts[0].trim();
      const subtitle = titleParts[1] ? titleParts[1].replace(")", "").trim() : "";

      // 새 활동 초기화
      currentActivity = {
        time: `${period} ${hour}:${minute}`,
        title: title,
        subtitle: subtitle,
        type: "관광",
        transport: "도보",
        duration: "1시간",
        price: "무료",
        photo: false,
      };

      // 타입 자동 감지
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
        currentActivity.type = "식사";
      } else if (titleLower.includes("쇼핑") || titleLower.includes("시장") || titleLower.includes("market")) {
        currentActivity.type = "쇼핑";
      } else if (
        titleLower.includes("체험") ||
        titleLower.includes("투어") ||
        titleLower.includes("클래스") ||
        titleLower.includes("액티비티")
      ) {
        currentActivity.type = "액티비티";
      }

      continue;
    }

    // 활동이 있을 때만 상세 정보 파싱
    if (currentActivity) {
      // 이동 방법
      if (line.includes("이동:")) {
        const transportMatch = line.match(/이동:\s*(.+)/);
        if (transportMatch) {
          currentActivity.transport = transportMatch[1].trim();
        }
      }

      // 소요 시간
      if (line.includes("소요:")) {
        const durationMatch = line.match(/소요:\s*(.+)/);
        if (durationMatch) {
          currentActivity.duration = durationMatch[1].trim();
        }
      }

      // 비용
      if (line.includes("비용:")) {
        const priceMatch = line.match(/비용:\s*(.+)/);
        if (priceMatch) {
          currentActivity.price = priceMatch[1].trim();
        }
      }

      // 포토존
      if (line.includes("📸")) {
        currentActivity.photo = true;
      }
    }
  }

  // 마지막 일차 저장
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

  // 일정이 비어있으면 기본값 생성
  if (itinerary.length === 0) {
    console.warn("⚠️ 일정 파싱 실패, 기본 일정 생성");
    for (let i = 1; i <= duration; i++) {
      itinerary.push({
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
  }

  return itinerary;
}

// 모든 assistant 메시지를 누적 파싱 (개선된 버전)
function parseAllMessages(messages: any[], duration: number) {
  const allItineraries = new Map<number, any>(); // day -> 일차 데이터

  // 모든 assistant 메시지를 순회
  for (const message of messages) {
    if (message.role === "assistant") {
      const messageText = message.parts
        .filter((p: any) => p.type === "text")
        .map((p: any) => p.text)
        .join("");

      // 이 메시지에서 파싱된 일차들
      const parsed = parseItinerary(messageText, duration);

      // 각 일차를 Map에 저장 (중복되면 최신 것으로 덮어쓰기)
      for (const dayData of parsed) {
        allItineraries.set(dayData.day, dayData);
      }
    }
  }

  // Map을 배열로 변환하고 day 순으로 정렬
  const result = Array.from(allItineraries.values()).sort((a, b) => a.day - b.day);

  // 일정이 비어있으면 기본값 생성
  if (result.length === 0) {
    console.warn("⚠️ 모든 메시지에서 일정 파싱 실패, 기본 일정 생성");
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
  }

  return result;
}

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const showResultsButton = useMemo(() => {
    // AI가 응답 중이면 버튼 표시 안 함
    if (status === "streaming") {
      return false;
    }

    // AI 응답이 완료된 후에만 체크
    if (messages.length >= 2) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "assistant") {
        const messageText = lastMessage.parts
          .filter((part) => part.type === "text")
          .map((part) => {
            if ("text" in part) {
              return part.text;
            }
            return "";
          })
          .join("");

        return (
          messageText.includes("일차") ||
          messageText.includes("1일") ||
          messageText.includes("Day") ||
          messageText.includes("오전") ||
          messageText.includes("오후")
        );
      }
    }
    return false;
  }, [messages, status]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const destination = searchParams.get("destination");
    const dates = searchParams.get("dates");

    if (destination && messages.length === 0) {
      let initialMessage = `${destination}`;
      if (dates) {
        initialMessage += ` ${dates}`;
      }
      initialMessage += " 여행 계획 짜줘";

      sendMessage({ text: initialMessage });
    }
  }, [searchParams, messages.length, sendMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    sendMessage({ text: inputValue });
    setInputValue("");
  };

  const handleQuickReply = (text: string) => {
    sendMessage({ text });
  };

  const handleSaveTravelPlan = async () => {
    try {
      setIsSaving(true);

      console.log("=== 전체 메시지 ===");
      console.log(`총 ${messages.length}개 메시지`);

      const travelInfo = extractTravelPlanInfo(messages);
      console.log("=== 추출된 여행 정보 ===");
      console.log(travelInfo);

      // 모든 메시지를 누적 파싱 (개선!)
      const itinerary = parseAllMessages(messages, travelInfo.duration);
      console.log("=== 누적 파싱된 일정 ===");
      console.log(JSON.stringify(itinerary, null, 2));

      // 날짜 계산
      const today = new Date();
      const startDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // 7일 후
      const endDate = new Date(startDate.getTime() + (travelInfo.duration - 1) * 24 * 60 * 60 * 1000);

      const travelPlanData = {
        title: `${travelInfo.destination} ${travelInfo.duration}일 여행`,
        destination: `${travelInfo.destination}`,
        start_date: startDate.toISOString().split("T")[0],
        end_date: endDate.toISOString().split("T")[0],
        budget: travelInfo.budget,
        currency: "KRW",
        travel_style: travelInfo.styles,
        companions: "AI 추천",
        itinerary,
        notes: "AI 채팅으로 생성된 여행 계획",
        is_public: true,
      };

      console.log("=== 전송할 데이터 ===");
      console.log(JSON.stringify(travelPlanData, null, 2));

      // 여행 계획 저장
      const response = await fetch("/api/travel-plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(travelPlanData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API 오류:", errorData);
        throw new Error(errorData.error || "저장 실패");
      }

      const result = await response.json();
      console.log("=== 저장 성공 ===");
      console.log(result);

      toast({
        title: "여행 계획이 저장되었습니다!",
        description: "상세 일정 페이지로 이동합니다.",
      });

      // 결과 페이지로 리다이렉트
      router.push(`/results?id=${result.data.id}`);
    } catch (error) {
      console.error("여행 계획 저장 실패:", error);
      toast({
        title: "저장 실패",
        description: error instanceof Error ? error.message : "여행 계획 저장에 실패했습니다.",
      });
      setIsSaving(false);
    }
  };

  return (
    <>
      <Header />
      <div className="relative flex h-[calc(100vh-65px)] flex-col bg-gradient-to-b from-accent/30 via-background to-background">
        <div className="flex-1 px-4 py-6 pb-28 overflow-y-auto">
          <div className="mx-auto max-w-4xl space-y-6 min-h-0">
            {messages.length === 0 && (
              <div className="text-center">
                <div className="mb-6 inline-flex">
                  <Logo variant="icon" size="lg" />
                </div>
                <h2 className="mb-3 text-2xl font-bold text-foreground flex items-center justify-center gap-2">
                  안녕하세요!
                  <MdWavingHand className="h-7 w-7 text-primary" />
                </h2>
                <p className="mb-8 text-muted-foreground">
                  어디로 여행을 떠나고 싶으신가요?
                  <br />
                  질문에 답해주시면 맞춤 여행 코스를 만들어드릴게요!
                </p>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">빠른 선택</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => handleQuickReply("도쿄 3일 여행 계획 짜줘")}
                      className="rounded-xl border-2 border-primary/20 bg-card px-4 py-3 text-sm font-medium transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground flex items-center gap-2"
                    >
                      <GiJapan className="h-5 w-5" />
                      도쿄
                    </button>
                    <button
                      onClick={() => handleQuickReply("오사카 2일 여행 계획 짜줘")}
                      className="rounded-xl border-2 border-primary/20 bg-card px-4 py-3 text-sm font-medium transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground flex items-center gap-2"
                    >
                      <GiCastle className="h-5 w-5" />
                      오사카
                    </button>
                    <button
                      onClick={() => handleQuickReply("방콕 4일 여행 계획 짜줘")}
                      className="rounded-xl border-2 border-primary/20 bg-card px-4 py-3 text-sm font-medium transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground flex items-center gap-2"
                    >
                      <GiPagoda className="h-5 w-5" />
                      방콕
                    </button>
                    <button
                      onClick={() => handleQuickReply("파리 5일 여행 계획 짜줘")}
                      className="rounded-xl border-2 border-primary/20 bg-card px-4 py-3 text-sm font-medium transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground flex items-center gap-2"
                    >
                      <FaLandmark className="h-5 w-5" />
                      파리
                    </button>
                  </div>
                </div>
              </div>
            )}
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-card-foreground shadow-sm"
                  }`}
                >
                  {message.parts.map((part, index) => {
                    if (part.type === "text") {
                      return (
                        <p key={index} className="whitespace-pre-wrap text-sm leading-relaxed">
                          {part.text}
                        </p>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            ))}
            {showResultsButton && (
              <div className="flex justify-center animate-in fade-in slide-in-from-bottom-4">
                <div className="w-full max-w-md space-y-4">
                  <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/20 p-6 text-center">
                    <Sparkles className="mx-auto mb-3 h-12 w-12 text-primary animate-pulse" />
                    <h3 className="mb-2 text-lg font-bold text-foreground">여행 일정이 완성되었습니다!</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      지도에서 경로를 확인하고, 일정을 수정하거나 저장할 수 있습니다
                    </p>
                    <Button
                      onClick={handleSaveTravelPlan}
                      disabled={isSaving}
                      className="w-full gap-2 rounded-xl bg-primary py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          저장 중...
                        </>
                      ) : (
                        <>
                          <MapPin className="h-5 w-5" />
                          지도에서 일정 확인하기
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-center text-xs text-muted-foreground">
                    계속 대화하거나 위 버튼을 눌러 상세 일정을 확인하세요
                  </p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 border-t bg-card/95 backdrop-blur-sm">
          <div className="mx-auto max-w-4xl px-4 py-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="메시지를 입력하세요..."
                className="h-12 rounded-xl bg-background"
                disabled={isSaving}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputValue.trim() || isSaving}
                className="h-12 w-12 rounded-xl bg-primary"
              >
                <Send className="h-5 w-5" />
              </Button>
            </form>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              AI가 생성한 답변은 정확하지 않을 수 있습니다
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
