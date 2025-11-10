"use client";

import type React from "react";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect, useMemo } from "react";
import { Send, ArrowLeft, MapPin, Sparkles } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/header";
import { Logo } from "@/components/logo";

export default function ChatPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  // 여행 일정이 완성되었는지 계산
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

        // 여행 일정이 포함되어 있는지 확인 (간단한 키워드 검색)
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

  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-accent/30 via-background to-background">
        {/* Header */}
        <div className="border-b bg-card/50 backdrop-blur-sm">
          <div className="mx-auto flex max-w-4xl items-center gap-4 px-4 py-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Logo variant="icon" size="sm" />
              <div>
                <h1 className="font-bold text-foreground">트래비와 대화하기</h1>
                <p className="text-xs text-muted-foreground">AI가 맞춤 여행을 만들어드려요</p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="mx-auto max-w-4xl space-y-6">
            {/* Welcome message */}
            {messages.length === 0 && (
              <div className="text-center">
                <div className="mb-6 inline-flex">
                  <Logo variant="icon" size="lg" />
                </div>
                <h2 className="mb-3 text-2xl font-bold text-foreground">안녕하세요! 👋</h2>
                <p className="mb-8 text-muted-foreground">
                  어디로 여행을 떠나고 싶으신가요?
                  <br />
                  질문에 답해주시면 맞춤 여행 코스를 만들어드릴게요!
                </p>

                {/* Quick reply buttons */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-muted-foreground">빠른 선택</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => handleQuickReply("도쿄 3일 여행 계획 짜줘")}
                      className="rounded-xl border-2 border-primary/20 bg-card px-4 py-3 text-sm font-medium transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      도쿄 🗼
                    </button>
                    <button
                      onClick={() => handleQuickReply("오사카 2일 여행 계획 짜줘")}
                      className="rounded-xl border-2 border-primary/20 bg-card px-4 py-3 text-sm font-medium transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      오사카 🏯
                    </button>
                    <button
                      onClick={() => handleQuickReply("방콕 4일 여행 계획 짜줘")}
                      className="rounded-xl border-2 border-primary/20 bg-card px-4 py-3 text-sm font-medium transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      방콕 🛕
                    </button>
                    <button
                      onClick={() => handleQuickReply("파리 5일 여행 계획 짜줘")}
                      className="rounded-xl border-2 border-primary/20 bg-card px-4 py-3 text-sm font-medium transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      파리 🗼
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Chat messages */}
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

            {/* Results button */}
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
                      onClick={() => router.push("/results")}
                      className="w-full gap-2 rounded-xl bg-primary py-6 text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    >
                      <MapPin className="h-5 w-5" />
                      지도에서 일정 확인하기
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

        {/* Input form */}
        <div className="border-t bg-card/50 backdrop-blur-sm">
          <div className="mx-auto max-w-4xl px-4 py-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="메시지를 입력하세요..."
                className="h-12 rounded-xl bg-background"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputValue.trim()}
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
