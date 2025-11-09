"use client";

import type React from "react";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect } from "react";
import { Send, Loader2, ArrowLeft } from "lucide-react";
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

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const destination = searchParams.get("destination");
    const dates = searchParams.get("dates");

    if (destination && messages.length === 0 && status === "ready") {
      let initialMessage = `${destination}`;
      if (dates) {
        initialMessage += ` ${dates}`;
      }
      initialMessage += " 여행 계획 짜줘";

      sendMessage({ text: initialMessage });
    }
  }, [searchParams, messages.length, status, sendMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || status === "in_progress") return;

    sendMessage({ text: inputValue });
    setInputValue("");
  };

  const handleQuickReply = (text: string) => {
    if (status === "in_progress") return;
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

            {/* Loading indicator */}
            {status === "in_progress" && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-card px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">트래비가 생각 중...</span>
                  </div>
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
                disabled={status === "in_progress"}
                className="h-12 rounded-xl bg-background"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputValue.trim() || status === "in_progress"}
                className="h-12 w-12 rounded-xl bg-primary"
              >
                {status === "in_progress" ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
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
