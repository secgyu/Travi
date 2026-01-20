"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect, useMemo } from "react";
import { Send, MapPin, Sparkles, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/header";
import { Logo } from "@/components/logo";
import { GiJapan, GiCastle, GiPagoda } from "react-icons/gi";
import { MdWavingHand } from "react-icons/md";
import { FaLandmark } from "react-icons/fa";
import { toast } from "sonner";
import { track, tag, captureWithTags } from "@/lib/sentry";
import { extractTravelPlanInfo, parseAllMessages } from "@/lib/travel-parser";
import type { Activity } from "@/types/results";

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const showResultsButton = useMemo(() => {
    if (status === "streaming") {
      return false;
    }

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

    track.chat.sendMessage(inputValue);
    sendMessage({ text: inputValue });
    setInputValue("");
  };

  const handleQuickReply = (text: string) => {
    sendMessage({ text });
  };

  const handleSaveTravelPlan = async () => {
    const travelInfo = extractTravelPlanInfo(messages);

    // 태그 설정
    tag.feature("chat");
    tag.travel.destination(travelInfo.destination);
    tag.travel.duration(travelInfo.duration);

    track.travel.generatePlan(travelInfo.destination, travelInfo.duration, travelInfo.budget);

    try {
      setIsSaving(true);
      const itinerary = parseAllMessages(messages, travelInfo.duration);

      const enrichedItinerary = await Promise.all(
        itinerary.map(async (day) => ({
          ...day,
          activities: await Promise.all(
            day.activities.map(async (activity: Activity) => {
              try {
                const response = await fetch("/api/geocode", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    title: activity.title,
                    subtitle: activity.subtitle,
                    destination: travelInfo.destination,
                  }),
                });

                if (response.ok) {
                  const result = await response.json();
                  if (result.success && result.data) {
                    return {
                      ...activity,
                      lat: result.data.lat,
                      lng: result.data.lng,
                      address: result.data.address,
                      gps_confidence: result.data.confidence,
                    };
                  }
                }

                return activity;
              } catch {
                // GPS 조회 실패 시 조용히 원본 activity 반환 (서비스 중단 방지)
                return activity;
              }
            })
          ),
        }))
      );

      const startDate = travelInfo.startDate;
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
        itinerary: enrichedItinerary,
        notes: "AI 채팅으로 생성된 여행 계획",
        is_public: true,
      };

      const response = await fetch("/api/travel-plans", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(travelPlanData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "저장 실패");
      }

      const result = await response.json();

      toast.success("여행 계획이 저장되었습니다!", { description: "상세 일정 페이지로 이동합니다." });

      router.push(`/results?id=${result.data.id}`);
    } catch (error) {
      captureWithTags.chat(error as Error, {
        destination: travelInfo.destination,
        duration: travelInfo.duration,
        action: "generatePlan",
      });
      toast.error("저장 실패", {
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
                          GPS 위치 조회 중...
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
            <form onSubmit={handleSubmit} className="flex gap-2 items-end">
              <Textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    if (inputValue.trim() && !isSaving) {
                      handleSubmit(e);
                    }
                  }
                }}
                placeholder="메시지를 입력하세요... (Shift+Enter로 줄바꿈)"
                className="min-h-12 max-h-40 rounded-xl bg-background resize-none"
                disabled={isSaving}
                rows={1}
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputValue.trim() || isSaving}
                className="h-12 w-12 rounded-xl bg-primary shrink-0"
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
