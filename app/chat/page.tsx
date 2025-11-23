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
  const destinationMatch = conversationText.match(/(도쿄|오사카|파리|방콕|뉴욕|런던|바르셀로나|로마|싱가포르|홍콩|타이베이|다낭)[^가-힣]*(여행|가|방문)/);
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

// AI 응답에서 일정 파싱
function parseItinerary(messageText: string, duration: number) {
  const itinerary: any[] = [];
  
  // 일차별로 분리
  const dayPattern = /(?:(\d+)일차|Day\s*(\d+))/gi;
  const dayMatches = [...messageText.matchAll(dayPattern)];
  
  if (dayMatches.length === 0) {
    // 일차 구분이 없으면 기본 구조 생성
    return Array.from({ length: duration }, (_, i) => ({
      day: i + 1,
      title: `${i + 1}일차`,
      date: `Day ${i + 1}`,
      activities: [
        {
          time: "오전 9:00",
          title: "여행 시작",
          subtitle: "",
          type: "관광",
          transport: "대중교통",
          duration: "1시간",
          price: "무료",
          photo: true,
        },
      ],
    }));
  }

  for (let i = 0; i < dayMatches.length; i++) {
    const dayNum = parseInt(dayMatches[i][1] || dayMatches[i][2]);
    const startPos = dayMatches[i].index!;
    const endPos = dayMatches[i + 1]?.index || messageText.length;
    const dayContent = messageText.substring(startPos, endPos);

    // 시간대별 활동 추출
    const activities: any[] = [];
    const timePattern = /🕐*\s*(?:오전|오후|저녁)?\s*(\d{1,2}):?(\d{2})?\s*[-~]?\s*([^🚇\n]+)/g;
    let activityMatch;

    while ((activityMatch = timePattern.exec(dayContent)) !== null) {
      const hour = parseInt(activityMatch[1]);
      const minute = activityMatch[2] || "00";
      const title = activityMatch[3].trim();

      // 해당 활동의 상세 정보 추출
      const activityStartPos = activityMatch.index;
      const nextActivityMatch = timePattern.exec(dayContent);
      timePattern.lastIndex = activityStartPos + activityMatch[0].length;
      
      const activityEndPos = nextActivityMatch?.index || dayContent.length;
      const activityContent = dayContent.substring(activityStartPos, activityEndPos);

      // 이동 방법 추출
      const transportMatch = activityContent.match(/🚇[^\n]*/);
      const transport = transportMatch ? transportMatch[0].replace(/🚇\s*이동:\s*/, "").trim() : "도보";

      // 소요 시간 추출
      const durationMatch = activityContent.match(/⏱️[^\n]*/);
      const duration = durationMatch ? durationMatch[0].replace(/⏱️\s*소요:\s*/, "").trim() : "1시간";

      // 비용 추출
      const priceMatch = activityContent.match(/💰[^\n]*/);
      const price = priceMatch ? priceMatch[0].replace(/💰\s*비용:\s*/, "").trim() : "변동";

      // 포토존 여부
      const isPhotoSpot = activityContent.includes("📸") || activityContent.includes("포토");

      // 활동 타입 결정
      let type = "관광";
      if (title.includes("식사") || title.includes("점심") || title.includes("저녁") || title.includes("아침")) {
        type = "식사";
      } else if (title.includes("쇼핑") || title.includes("시장")) {
        type = "쇼핑";
      }

      activities.push({
        time: `${hour < 12 ? "오전" : "오후"} ${hour}:${minute}`,
        title,
        subtitle: "",
        type,
        transport,
        duration,
        price,
        photo: isPhotoSpot,
      });
    }

    // 활동이 없으면 기본 활동 추가
    if (activities.length === 0) {
      activities.push({
        time: "오전 9:00",
        title: `${dayNum}일차 여행`,
        subtitle: "",
        type: "관광",
        transport: "대중교통",
        duration: "종일",
        price: "변동",
        photo: false,
      });
    }

    itinerary.push({
      day: dayNum,
      title: `${dayNum}일차`,
      date: `Day ${dayNum}`,
      activities,
    });
  }

  return itinerary;
}

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const showResultsButton = useMemo(() => {
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
  }, [messages]);

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

      // AI 메시지에서 여행 정보 추출
      const lastMessage = messages[messages.length - 1];
      const messageText = lastMessage.parts
        .filter((part: any) => part.type === "text")
        .map((part: any) => part.text)
        .join("");

      const travelInfo = extractTravelPlanInfo(messages);
      const itinerary = parseItinerary(messageText, travelInfo.duration);

      // 날짜 계산
      const today = new Date();
      const startDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000); // 7일 후
      const endDate = new Date(startDate.getTime() + (travelInfo.duration - 1) * 24 * 60 * 60 * 1000);

      // 여행 계획 저장
      const response = await fetch("/api/travel-plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
        }),
      });

      if (!response.ok) {
        throw new Error("저장 실패");
      }

      const result = await response.json();

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
        description: "여행 계획 저장에 실패했습니다. 다시 시도해주세요.",
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
