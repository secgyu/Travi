import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Brain, Clock, Globe, Shield, Zap } from "lucide-react";
import { Footer } from "@/components/footer";

export default function AIIntroPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <PageHeader title="트래비 AI 소개" description="당신만을 위한 완벽한 여행을 만드는 AI 기술" />

      <div className="mx-auto max-w-4xl space-y-12 px-4 py-12">
        {/* Hero Section */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="mb-2 text-2xl font-bold text-foreground">트래비 AI란?</h2>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  트래비는 최신 인공지능 기술을 활용하여 사용자의 취향, 예산, 일정에 맞는 최적의 여행 계획을 자동으로
                  생성하는 AI 여행 플래너입니다. 복잡한 여행 계획을 단 몇 분 만에 완성할 수 있습니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Core Features */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-foreground">핵심 기능</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">대화형 AI</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  자연스러운 대화를 통해 여행지, 기간, 예산, 취향을 파악하고 맞춤형 일정을 생성합니다. 마치 여행
                  전문가와 대화하는 것처럼 편안하게 계획을 세울 수 있습니다.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">실시간 최적화</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  교통 시간, 운영 시간, 동선을 고려하여 가장 효율적인 여행 코스를 구성합니다. 시간 낭비 없이 더 많은
                  것을 경험할 수 있습니다.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">글로벌 데이터</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  전 세계 주요 도시의 관광지, 맛집, 교통 정보를 실시간으로 반영합니다. 최신 정보를 바탕으로 한 정확한
                  추천을 받을 수 있습니다.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="mb-4 inline-block rounded-lg bg-primary/10 p-3">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">빠른 생성</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  몇 시간이 걸리던 여행 계획을 단 3분 만에 완성합니다. 바쁜 일상 속에서도 쉽고 빠르게 여행을 준비할 수
                  있습니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How it works */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-foreground">작동 원리</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 font-semibold text-foreground">정보 수집</h3>
                    <p className="text-sm text-muted-foreground">
                      AI가 대화를 통해 여행지, 기간, 예산, 인원, 취향(맛집/관광/쇼핑 등)을 자연스럽게 수집합니다.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 font-semibold text-foreground">데이터 분석</h3>
                    <p className="text-sm text-muted-foreground">
                      수집된 정보를 바탕으로 수천 개의 관광지, 레스토랑, 교통 옵션을 분석하고 최적의 조합을 찾습니다.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 font-semibold text-foreground">일정 생성</h3>
                    <p className="text-sm text-muted-foreground">
                      동선, 시간, 예산을 고려하여 시간대별 상세 일정을 생성합니다. 교통편, 소요시간, 비용까지 모두
                      포함됩니다.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 font-semibold text-foreground">맞춤 조정</h3>
                    <p className="text-sm text-muted-foreground">
                      생성된 일정을 사용자가 직접 편집하거나, AI에게 수정을 요청하여 완벽한 일정으로 다듬을 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* AI Technology */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-foreground">사용 기술</h2>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="secondary">GPT-4</Badge>
                    <h3 className="font-semibold text-foreground">대규모 언어 모델</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    OpenAI의 최신 GPT-4 모델을 활용하여 자연스러운 대화와 정확한 여행 계획을 생성합니다.
                  </p>
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="secondary">Machine Learning</Badge>
                    <h3 className="font-semibold text-foreground">머신러닝</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    사용자의 피드백과 여행 패턴을 학습하여 점점 더 정확한 추천을 제공합니다.
                  </p>
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Badge variant="secondary">Real-time Data</Badge>
                    <h3 className="font-semibold text-foreground">실시간 데이터 연동</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    날씨, 운영시간, 교통 정보 등 실시간 데이터를 반영하여 현실적인 일정을 제공합니다.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Privacy & Security */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-foreground">개인정보 보호</h2>
          <Card className="border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-lg font-semibold text-foreground">안전한 데이터 관리</h3>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    트래비 AI는 사용자의 개인정보를 안전하게 보호합니다. 대화 내용과 여행 계획은 암호화되어 저장되며, AI
                    학습에는 개인 식별 정보가 제거된 익명화된 데이터만 사용됩니다.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      대화 내용 암호화 저장
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      개인정보 익명화 처리
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      사용자 동의 없는 데이터 활용 금지
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      언제든 데이터 삭제 가능
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <Card className="border-primary bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardContent className="p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-foreground">지금 바로 시작해보세요</h2>
            <p className="mb-6 text-muted-foreground">트래비 AI와 함께 특별한 여행을 계획해보세요</p>
            <a
              href="/chat"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Sparkles className="h-5 w-5" />
              AI 여행 계획 시작하기
            </a>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
