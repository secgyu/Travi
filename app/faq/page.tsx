"use client";

import { PageHeader } from "@/components/page-header";
import { Footer } from "@/components/footer";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = {
    general: {
      title: "일반",
      items: [
        {
          question: "AI 여행 플래너는 무료인가요?",
          answer:
            "기본적인 여행 일정 생성 기능은 무료로 제공됩니다. 더 많은 기능과 세밀한 커스터마이징을 원하시면 프리미엄 플랜을 이용하실 수 있습니다. 프리미엄 플랜은 월 9,900원이며, 무제한 일정 생성, 오프라인 저장, 우선 고객지원 등의 혜택이 제공됩니다.",
        },
        {
          question: "추천받은 일정을 수정할 수 있나요?",
          answer:
            "네, 물론입니다! AI가 생성한 일정은 자유롭게 수정하실 수 있습니다. 장소 추가/삭제, 순서 변경, 메모 추가, 시간 조정 등 모든 편집 기능을 제공합니다. 또한 수정한 내용은 자동으로 저장되어 언제든지 다시 확인할 수 있습니다.",
        },
        {
          question: "오프라인에서도 사용 가능한가요?",
          answer:
            "프리미엄 회원의 경우 오프라인 모드를 지원합니다. 일정을 미리 다운로드하면 인터넷 연결 없이도 여행 계획을 확인할 수 있습니다. 무료 회원은 PDF로 다운로드하여 오프라인에서 열람하실 수 있습니다.",
        },
        {
          question: "여러 명이 함께 일정을 공유할 수 있나요?",
          answer:
            "네, 가능합니다. 일정 공유 기능을 통해 친구나 가족과 함께 실시간으로 일정을 확인하고 편집할 수 있습니다. 카카오톡, 이메일, 링크 등 다양한 방법으로 공유가 가능하며, 권한 설정을 통해 보기만 가능하게 하거나 편집 권한을 부여할 수 있습니다.",
        },
        {
          question: "예약 기능도 제공하나요?",
          answer:
            "현재는 여행 계획 및 일정 관리 기능에 집중하고 있습니다. 하지만 추천된 장소에 대한 예약 링크를 제공하여 쉽게 예약하실 수 있도록 돕고 있습니다. 향후 직접 예약 기능도 추가할 예정입니다.",
        },
        {
          question: "지원하는 여행지는 어디인가요?",
          answer:
            "전 세계 주요 도시와 관광지를 지원합니다. 일본, 태국, 베트남 등 인기 여행지는 물론, 유럽, 미국, 중동 등 다양한 지역의 여행 계획을 만들 수 있습니다. 지속적으로 데이터를 업데이트하여 더 많은 여행지를 추가하고 있습니다.",
        },
      ],
    },
    payment: {
      title: "결제",
      items: [
        {
          question: "환불 정책은 어떻게 되나요?",
          answer:
            "프리미엄 플랜 구독 후 7일 이내에는 100% 환불이 가능합니다. 7일 이후에는 사용하지 않은 기간에 대해 일할 계산하여 환불해 드립니다. 환불은 결제 수단에 따라 3-5영업일 내에 처리됩니다.",
        },
        {
          question: "결제 수단은 무엇이 있나요?",
          answer:
            "신용카드, 체크카드, 계좌이체, 카카오페이, 네이버페이, 토스페이 등 다양한 결제 수단을 지원합니다. 모든 결제는 안전하게 암호화되어 처리됩니다.",
        },
        {
          question: "구독을 취소하려면 어떻게 하나요?",
          answer:
            "마이페이지 > 구독 관리에서 언제든지 구독을 취소하실 수 있습니다. 구독 취소 후에도 남은 기간 동안은 프리미엄 기능을 계속 이용하실 수 있습니다.",
        },
        {
          question: "영수증 발급이 가능한가요?",
          answer:
            "네, 결제 내역 페이지에서 언제든지 영수증을 출력하거나 이메일로 받으실 수 있습니다. 사업자의 경우 세금계산서 발행도 가능합니다.",
        },
      ],
    },
    technical: {
      title: "기술지원",
      items: [
        {
          question: "지원하는 브라우저는 무엇인가요?",
          answer:
            "Chrome, Safari, Firefox, Edge 등 주요 브라우저를 모두 지원합니다. 최신 버전의 브라우저를 사용하시는 것을 권장합니다.",
        },
        {
          question: "모바일 앱도 있나요?",
          answer:
            "현재는 웹 버전만 제공하고 있으며, 모바일 브라우저에서도 최적화되어 사용하실 수 있습니다. iOS와 Android 앱은 개발 중이며, 곧 출시될 예정입니다.",
        },
        {
          question: "일정이 저장되지 않아요",
          answer:
            "브라우저의 쿠키 설정을 확인해 주세요. 쿠키가 차단되어 있으면 일정이 저장되지 않을 수 있습니다. 또한 로그인 상태를 유지해야 일정이 정상적으로 저장됩니다. 문제가 계속되면 고객센터로 문의해 주세요.",
        },
        {
          question: "AI 추천이 느려요",
          answer:
            "여행지와 기간에 따라 처리 시간이 다를 수 있습니다. 일반적으로 30초 이내에 결과가 생성되며, 복잡한 일정의 경우 최대 1분 정도 소요될 수 있습니다. 네트워크 상태도 확인해 주세요.",
        },
      ],
    },
    account: {
      title: "계정",
      items: [
        {
          question: "비밀번호를 잊어버렸어요",
          answer:
            "로그인 페이지에서 '비밀번호 찾기'를 클릭하시면 가입하신 이메일로 비밀번호 재설정 링크를 보내드립니다. 이메일이 오지 않으면 스팸함을 확인해 주세요.",
        },
        {
          question: "회원 탈퇴는 어떻게 하나요?",
          answer:
            "마이페이지 > 계정 설정 > 회원 탈퇴에서 진행하실 수 있습니다. 탈퇴 시 모든 일정과 데이터가 삭제되며, 복구가 불가능하니 신중히 결정해 주세요. 진행 중인 구독이 있다면 먼저 취소해 주셔야 합니다.",
        },
        {
          question: "이메일 주소를 변경하고 싶어요",
          answer:
            "마이페이지 > 계정 설정에서 이메일 주소를 변경하실 수 있습니다. 새로운 이메일 주소로 인증 메일을 보내드리며, 인증 완료 후 변경이 완료됩니다.",
        },
        {
          question: "소셜 로그인을 연동하고 싶어요",
          answer:
            "마이페이지 > 계정 설정 > 소셜 로그인 연동에서 카카오, 네이버, 구글 계정을 연동하실 수 있습니다. 연동 후에는 소셜 계정으로 간편하게 로그인하실 수 있습니다.",
        },
      ],
    },
  };

  const filterFAQs = (items: typeof faqCategories.general.items) => {
    if (!searchQuery) return items;
    return items.filter(
      (item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/20 via-background to-background">
      <PageHeader title="자주 묻는 질문" />

      <main className="mx-auto max-w-5xl px-4 py-12">
        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="궁금한 내용을 검색하세요..."
              className="h-14 pl-12 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* FAQ Tabs */}
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-4">
            <TabsTrigger value="general">{faqCategories.general.title}</TabsTrigger>
            <TabsTrigger value="payment">{faqCategories.payment.title}</TabsTrigger>
            <TabsTrigger value="technical">{faqCategories.technical.title}</TabsTrigger>
            <TabsTrigger value="account">{faqCategories.account.title}</TabsTrigger>
          </TabsList>

          {Object.entries(faqCategories).map(([key, category]) => (
            <TabsContent key={key} value={key}>
              <div className="rounded-xl bg-card p-8 shadow-sm">
                <Accordion type="single" collapsible className="w-full">
                  {filterFAQs(category.items).map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left text-base font-medium text-foreground">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-foreground/80 leading-relaxed">{item.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                {filterFAQs(category.items).length === 0 && (
                  <div className="py-12 text-center text-muted-foreground">
                    검색 결과가 없습니다. 다른 키워드로 검색해 보세요.
                  </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Contact CTA */}
        <div className="mt-12 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 p-8 text-center">
          <h3 className="mb-2 text-xl font-bold text-foreground">원하는 답변을 찾지 못하셨나요?</h3>
          <p className="mb-6 text-foreground/80">고객센터를 통해 문의하시면 빠르게 도와드리겠습니다.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/support"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              고객센터 바로가기
            </a>
            <a
              href="mailto:support@aitravelplanner.com"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 font-medium text-foreground transition-colors hover:bg-accent"
            >
              이메일 문의
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
