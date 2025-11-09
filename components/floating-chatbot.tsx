"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/logo";

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-br from-primary to-secondary p-0 shadow-xl transition-all hover:scale-110 hover:shadow-2xl md:h-16 md:w-16"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-primary-foreground" />
        ) : (
          <Logo variant="icon" size="sm" className="text-primary-foreground" />
        )}
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-40 w-80 animate-in slide-in-from-bottom-4 overflow-hidden border-0 shadow-2xl md:w-96">
          <div className="bg-gradient-to-r from-primary to-secondary p-4">
            <div className="flex items-center gap-2">
              <Logo variant="icon" size="sm" className="text-primary-foreground" />
              <div>
                <h3 className="text-lg font-bold text-primary-foreground">트래비</h3>
                <p className="text-xs text-primary-foreground/90">Travel + AI</p>
              </div>
            </div>
            <p className="mt-2 text-sm text-primary-foreground/90">무엇을 도와드릴까요?</p>
          </div>

          <div className="p-6">
            <div className="space-y-3">
              <button className="w-full rounded-xl bg-accent p-4 text-left transition-all hover:bg-accent/80">
                <p className="font-medium text-accent-foreground">✈️ 항공권 검색하기</p>
              </button>

              <button className="w-full rounded-xl bg-accent p-4 text-left transition-all hover:bg-accent/80">
                <p className="font-medium text-accent-foreground">🏨 숙소 추천받기</p>
              </button>

              <button className="w-full rounded-xl bg-accent p-4 text-left transition-all hover:bg-accent/80">
                <p className="font-medium text-accent-foreground">🍜 맛집 찾기</p>
              </button>

              <button className="w-full rounded-xl bg-accent p-4 text-left transition-all hover:bg-accent/80">
                <p className="font-medium text-accent-foreground">💬 문의하기</p>
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-muted-foreground">AI가 실시간으로 답변드립니다</p>
          </div>
        </Card>
      )}
    </>
  );
}
