"use client";

import { Card } from "@/components/ui/card";
import { Lightbulb, ShieldCheck, Smartphone, Banknote } from "lucide-react";

export function TravelTips() {
  return (
    <div className="mt-12">
      <h2 className="mb-6 text-2xl font-bold text-foreground flex items-center gap-2">
        <Lightbulb className="h-6 w-6 text-primary" />
        여행 팁
      </h2>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-0 p-6 shadow-md">
          <div className="mb-3">
            <ShieldCheck className="h-8 w-8 text-secondary" />
          </div>
          <h3 className="mb-2 font-semibold text-foreground">여행자 보험</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            해외 의료비는 매우 비싸니 출국 전 여행자 보험에 꼭 가입하세요.
          </p>
        </Card>

        <Card className="border-0 p-6 shadow-md">
          <div className="mb-3">
            <Smartphone className="h-8 w-8 text-secondary" />
          </div>
          <h3 className="mb-2 font-semibold text-foreground">유심/포켓와이파이</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            공항에서 포켓와이파이를 대여하거나 현지 유심을 구매하세요.
          </p>
        </Card>

        <Card className="border-0 p-6 shadow-md">
          <div className="mb-3">
            <Banknote className="h-8 w-8 text-secondary" />
          </div>
          <h3 className="mb-2 font-semibold text-foreground">환전</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            현금 위주 사용이 많으니 출국 전 충분한 화폐를 준비하세요.
          </p>
        </Card>
      </div>
    </div>
  );
}
