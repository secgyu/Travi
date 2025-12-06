import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Building2, Plane, Hotel, MapPin, Utensils, ShoppingBag } from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function PartnershipPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <PageHeader title="파트너십" />

        {/* Hero Section */}
        <div className="mb-16 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 p-8 md:p-12">
          <h2 className="mb-4 text-3xl font-bold text-foreground">트래비와 함께 여행 산업의 미래를 만들어갑니다</h2>
          <p className="mb-6 text-lg text-muted-foreground leading-relaxed">
            AI 기술로 혁신하는 여행 플랫폼, 트래비와 함께 성장할 기회를 만나보세요.
            <br />
            다양한 파트너십 프로그램을 통해 상호 윈윈할 수 있는 협력 관계를 구축합니다.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            파트너 신청하기
          </Button>
        </div>

        {/* Partnership Types */}
        <div className="mb-16">
          <h3 className="mb-8 text-2xl font-bold text-foreground">파트너십 유형</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* 항공사 파트너 */}
            <Card className="border-2 transition-all hover:border-primary hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Plane className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>항공사 파트너</CardTitle>
                <CardDescription>항공권 예약 연동 및 특가 프로모션</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                    <span>여행 일정에 맞춤 항공권 추천</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                    <span>예약 연동 API 제공</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                    <span>커미션 기반 수익 모델</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 숙박 파트너 */}
            <Card className="border-2 transition-all hover:border-primary hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Hotel className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>숙박 파트너</CardTitle>
                <CardDescription>호텔, 게스트하우스, 민박 제휴</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                    <span>위치 기반 숙소 추천</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                    <span>실시간 예약 시스템 연동</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                    <span>특가 프로모션 노출</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 투어 파트너 */}
            <Card className="border-2 transition-all hover:border-primary hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>투어/액티비티 파트너</CardTitle>
                <CardDescription>현지 투어 및 체험 프로그램 제휴</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                    <span>일정에 맞춤 투어 상품 추천</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                    <span>온라인 예약 및 결제 시스템</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                    <span>리뷰 및 평점 시스템</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 맛집 파트너 */}
            <Card className="border-2 transition-all hover:border-primary hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Utensils className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>맛집 파트너</CardTitle>
                <CardDescription>레스토랑 및 카페 제휴</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                    <span>여행 일정에 맛집 추천 포함</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                    <span>예약 및 할인 쿠폰 제공</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                    <span>트래비 회원 전용 혜택</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 쇼핑 파트너 */}
            <Card className="border-2 transition-all hover:border-primary hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>쇼핑 파트너</CardTitle>
                <CardDescription>면세점 및 쇼핑몰 제휴</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                    <span>쇼핑 명소 추천 및 정보 제공</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                    <span>할인 쿠폰 및 프로모션</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                    <span>트래블 리워드 포인트 적립</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 기업 파트너 */}
            <Card className="border-2 transition-all hover:border-primary hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>기업 파트너</CardTitle>
                <CardDescription>B2B 기업 복지 및 단체 여행</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                    <span>단체 여행 일정 관리 솔루션</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                    <span>임직원 복지 프로그램 제공</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                    <span>전용 대시보드 및 리포트</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-16 rounded-xl bg-card p-8 md:p-12">
          <h3 className="mb-8 text-2xl font-bold text-foreground">파트너 혜택</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-3 text-3xl font-bold text-primary">10만+</div>
              <h4 className="mb-2 font-semibold text-foreground">활성 사용자</h4>
              <p className="text-sm text-muted-foreground">MZ세대 중심의 활발한 여행 커뮤니티</p>
            </div>
            <div>
              <div className="mb-3 text-3xl font-bold text-primary">AI 기반</div>
              <h4 className="mb-2 font-semibold text-foreground">맞춤 추천</h4>
              <p className="text-sm text-muted-foreground">사용자 취향에 맞는 정확한 상품 매칭</p>
            </div>
            <div>
              <div className="mb-3 text-3xl font-bold text-primary">실시간</div>
              <h4 className="mb-2 font-semibold text-foreground">데이터 분석</h4>
              <p className="text-sm text-muted-foreground">트렌드 및 고객 인사이트 제공</p>
            </div>
            <div>
              <div className="mb-3 text-3xl font-bold text-primary">24/7</div>
              <h4 className="mb-2 font-semibold text-foreground">전담 지원</h4>
              <p className="text-sm text-muted-foreground">파트너 전용 지원팀 운영</p>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">파트너 신청</CardTitle>
              <CardDescription>아래 양식을 작성해주시면 담당자가 확인 후 연락드리겠습니다.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="company">회사명/브랜드명</Label>
                    <Input id="company" placeholder="예: 트래블컴퍼니" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">파트너십 유형</Label>
                    <select
                      id="type"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option>선택해주세요</option>
                      <option>항공사</option>
                      <option>숙박</option>
                      <option>투어/액티비티</option>
                      <option>맛집</option>
                      <option>쇼핑</option>
                      <option>기업</option>
                      <option>기타</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">담당자명</Label>
                    <Input id="name" placeholder="홍길동" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">직책</Label>
                    <Input id="position" placeholder="마케팅 팀장" />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">이메일</Label>
                    <Input id="email" type="email" placeholder="contact@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">연락처</Label>
                    <Input id="phone" type="tel" placeholder="010-0000-0000" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">웹사이트/SNS</Label>
                  <Input id="website" placeholder="https://example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">제안 내용</Label>
                  <Textarea
                    id="message"
                    placeholder="협력하고 싶은 내용을 자유롭게 작성해주세요."
                    className="min-h-32"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90">
                  신청서 제출
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact */}
        <div className="rounded-xl bg-muted/50 p-8 text-center">
          <h3 className="mb-4 text-xl font-bold text-foreground">문의하기</h3>
          <p className="mb-6 text-muted-foreground">
            파트너십에 대해 더 자세히 알고 싶으신가요?
            <br />
            언제든지 연락주시면 친절하게 상담해드리겠습니다.
          </p>
          <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
            <p>이메일: partnership@travee.kr</p>
            <p>전화: 02-1234-5678</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
