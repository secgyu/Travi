"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const faqs = [
    {
      question: "트래비는 무료인가요?",
      answer:
        "네, 트래비의 기본 여행 계획 생성 기능은 무료로 제공됩니다. 누구나 AI와 대화하며 맞춤형 여행 일정을 만들 수 있습니다.",
    },
    {
      question: "어떤 나라의 여행 계획을 만들 수 있나요?",
      answer:
        "전 세계 대부분의 주요 여행지를 지원합니다. 도쿄, 오사카, 방콕, 파리, 뉴욕 등 인기 도시는 물론 숨겨진 명소까지 AI가 안내해드립니다.",
    },
    {
      question: "생성된 일정을 수정할 수 있나요?",
      answer:
        "물론입니다! 생성된 일정은 자유롭게 편집할 수 있습니다. 장소를 추가하거나 삭제하고, 순서를 변경하여 나만의 완벽한 일정을 완성해보세요.",
    },
    {
      question: "친구와 일정을 공유할 수 있나요?",
      answer: "네, 생성된 여행 계획은 링크 복사나 카카오톡 공유를 통해 친구들과 쉽게 공유할 수 있습니다.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-3xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">자주 묻는 질문</h2>
          <p className="text-lg text-muted-foreground">궁금한 점이 있으신가요?</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="overflow-hidden rounded-lg border bg-card transition-all">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-6 text-left font-medium transition-colors hover:bg-muted/50"
              >
                {faq.question}
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="border-t bg-muted/20 p-6 text-muted-foreground">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
