"use client";

import type React from "react";

import { PageHeader } from "@/components/page-header";
import { Footer } from "@/components/footer";
import { Phone, Mail, MessageCircle, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("문의가 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.");
    setFormData({ name: "", email: "", type: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/20 via-background to-background">
      <PageHeader title="고객센터" />

      <main className="mx-auto max-w-5xl px-4 py-12">
        {/* Contact Methods */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-card p-6 text-center shadow-sm">
            <div className="mb-4 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Phone className="h-7 w-7 text-primary" />
              </div>
            </div>
            <h3 className="mb-2 font-bold text-foreground">전화 상담</h3>
            <p className="mb-3 text-2xl font-bold text-primary">1588-0000</p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>평일 09:00-18:00</span>
            </div>
          </div>

          <div className="rounded-xl bg-card p-6 text-center shadow-sm">
            <div className="mb-4 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/20">
                <Mail className="h-7 w-7 text-primary" />
              </div>
            </div>
            <h3 className="mb-2 font-bold text-foreground">이메일 문의</h3>
            <p className="mb-3 text-sm font-medium text-primary">support@aitravelplanner.com</p>
            <p className="text-sm text-muted-foreground">24시간 접수 가능</p>
          </div>

          <div className="rounded-xl bg-card p-6 text-center shadow-sm">
            <div className="mb-4 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cta/20">
                <MessageCircle className="h-7 w-7 text-primary" />
              </div>
            </div>
            <h3 className="mb-2 font-bold text-foreground">카카오톡 채널</h3>
            <p className="mb-3 text-sm font-medium text-primary">@AI여행플래너</p>
            <p className="text-sm text-muted-foreground">실시간 상담 가능</p>
          </div>
        </div>

        {/* Operating Hours */}
        <div className="mb-12 rounded-xl bg-muted/50 p-6">
          <h3 className="mb-4 font-bold text-foreground">운영 시간</h3>
          <div className="grid gap-3 text-sm md:grid-cols-2">
            <div className="flex justify-between">
              <span className="text-foreground/80">평일 (월-금)</span>
              <span className="font-medium text-foreground">09:00 - 18:00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/80">점심시간</span>
              <span className="font-medium text-foreground">12:00 - 13:00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/80">토요일</span>
              <span className="font-medium text-foreground">휴무</span>
            </div>
            <div className="flex justify-between">
              <span className="text-foreground/80">일요일/공휴일</span>
              <span className="font-medium text-foreground">휴무</span>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            * 휴무일에는 이메일 문의를 이용해 주세요. 순차적으로 답변 드리겠습니다.
          </p>
        </div>

        {/* Quick Links */}
        <div className="mb-12 grid gap-4 md:grid-cols-3">
          <Button variant="outline" className="h-auto flex-col gap-2 py-6 bg-transparent" asChild>
            <a href="/faq">
              <span className="text-2xl">❓</span>
              <span className="font-medium">자주 묻는 질문</span>
            </a>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-6 bg-transparent">
            <span className="text-2xl">💬</span>
            <span className="font-medium">1:1 문의하기</span>
          </Button>
          <Button variant="outline" className="h-auto flex-col gap-2 py-6 bg-transparent">
            <span className="text-2xl">📝</span>
            <span className="font-medium">서비스 피드백</span>
          </Button>
        </div>

        {/* Contact Form */}
        <div className="rounded-xl bg-card p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-foreground">문의하기</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  이름 <span className="text-destructive">*</span>
                </label>
                <Input
                  id="name"
                  placeholder="홍길동"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  이메일 <span className="text-destructive">*</span>
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="type" className="text-sm font-medium text-foreground">
                문의 유형 <span className="text-destructive">*</span>
              </label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="문의 유형을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="service">서비스 이용 문의</SelectItem>
                  <SelectItem value="payment">결제/환불 문의</SelectItem>
                  <SelectItem value="technical">기술 지원</SelectItem>
                  <SelectItem value="account">계정 문의</SelectItem>
                  <SelectItem value="partnership">제휴 문의</SelectItem>
                  <SelectItem value="other">기타 문의</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground">
                문의 내용 <span className="text-destructive">*</span>
              </label>
              <Textarea
                id="message"
                placeholder="문의하실 내용을 상세히 입력해 주세요"
                className="min-h-[200px]"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" size="lg" className="gap-2">
                <Send className="h-4 w-4" />
                문의 제출
              </Button>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-8 rounded-lg bg-accent/20 p-6 text-center">
          <p className="text-sm text-foreground/80">
            긴급한 문의사항은 카카오톡 채널을 통해 실시간으로 상담받으실 수 있습니다.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
