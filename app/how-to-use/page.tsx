import { PageHeader } from "@/components/page-header";
import { Footer } from "@/components/footer";
import { Search, Calendar, Sparkles, Edit, Share2, HelpCircle, Clock, MapPin, DollarSign } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HowToUsePage() {
  const steps = [
    {
      icon: Search,
      title: "목적지 검색",
      description: "가고 싶은 여행지를 검색하세요. 국내외 모든 여행지를 지원합니다.",
      details: "도시명, 국가명 또는 관광지명으로 검색이 가능합니다. AI가 자동으로 최적의 여행 계획을 준비합니다.",
    },
    {
      icon: Calendar,
      title: "날짜 선택",
      description: "여행 시작일과 종료일을 선택하세요.",
      details: "여행 기간에 따라 AI가 최적의 일정 밀도를 자동으로 조절합니다.",
    },
    {
      icon: Sparkles,
      title: "AI 추천받기",
      description: "AI가 당신의 취향에 맞는 완벽한 여행 일정을 생성합니다.",
      details: "방문할 장소, 이동 경로, 소요 시간, 예상 비용까지 모든 정보를 한눈에 확인할 수 있습니다.",
    },
    {
      icon: Edit,
      title: "일정 커스터마이징",
      description: "생성된 일정을 자유롭게 수정하고 편집하세요.",
      details: "장소 추가/삭제, 순서 변경, 메모 추가 등 모든 편집 기능을 제공합니다.",
    },
    {
      icon: Share2,
      title: "저장 및 공유",
      description: "완성된 일정을 저장하고 친구들과 공유하세요.",
      details: "카카오톡, 링크 공유 등 다양한 방법으로 일정을 공유할 수 있습니다.",
    },
  ];

  const faqs = [
    {
      question: "추천받은 일정을 나중에 다시 볼 수 있나요?",
      answer: "네, 회원가입 후 '내 일정' 페이지에서 언제든지 저장된 일정을 확인하고 수정할 수 있습니다.",
    },
    {
      question: "여러 명이 함께 일정을 만들 수 있나요?",
      answer: "네, 일정 공유 기능을 통해 친구나 가족과 함께 실시간으로 일정을 편집할 수 있습니다.",
    },
    {
      question: "오프라인에서도 일정을 볼 수 있나요?",
      answer: "네, 일정을 PDF로 다운로드하거나 앱에서 오프라인 저장 기능을 활용할 수 있습니다.",
    },
    {
      question: "AI가 추천하는 기준은 무엇인가요?",
      answer:
        "여행지의 인기도, 계절성, 이동 거리, 소요 시간, 사용자 리뷰 등 다양한 데이터를 종합적으로 분석하여 최적의 일정을 추천합니다.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/20 via-background to-background">
      <PageHeader title="AI 여행 플래너 이용방법" />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-12 text-center">
          <p className="text-lg text-foreground/80">5단계만 거치면 당신만의 완벽한 여행 계획이 완성됩니다</p>
        </div>
        <div className="mb-16 space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-6 rounded-xl bg-card p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                </div>
                <p className="mb-2 text-foreground/90">{step.description}</p>
                <p className="text-sm text-muted-foreground">{step.details}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mb-16 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 p-8">
          <h2 className="mb-6 text-center text-2xl font-bold text-foreground">이런 일정을 만들 수 있어요</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-card p-6 shadow-sm">
              <div className="mb-3 text-sm font-medium text-primary">DAY 1 오전</div>
              <h4 className="mb-2 font-bold text-foreground">시부야 (渋谷)</h4>
              <p className="mb-3 text-sm text-foreground/80">도쿄의 젊음과 트렌드가 모이는 곳</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>2시간</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>시부야역</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  <span>무료</span>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-card p-6 shadow-sm">
              <div className="mb-3 text-sm font-medium text-primary">DAY 1 오후</div>
              <h4 className="mb-2 font-bold text-foreground">하라주쿠 (原宿)</h4>
              <p className="mb-3 text-sm text-foreground/80">독특한 패션과 카페가 가득한 거리</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>3시간</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>하라주쿠역</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3" />
                  <span>₩30,000</span>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            * AI가 자동으로 이동 경로와 시간을 최적화합니다
          </p>
        </div>
        <div className="rounded-xl bg-card p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <HelpCircle className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">자주 묻는 질문</h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-foreground">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-foreground/80">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
      <Footer />
    </div>
  );
}
