import { MapPin, Instagram, Youtube, BookOpen, MessageCircle } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Main footer content */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Company info */}
          <div className="lg:col-span-1">
            <h3 className="mb-4 text-xl font-bold text-foreground">AI 여행 플래너</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI가 만들어주는
              <br />
              나만의 맞춤 여행
            </p>
          </div>

          {/* Column 1 - 서비스 */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">서비스</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/how-to-use"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  이용방법
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  요금제
                </Link>
              </li>
              <li>
                <Link
                  href="/ai-intro"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  AI 소개
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  파트너십
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 - 고객지원 */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">고객지원</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/support" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  고객센터
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  1:1 문의
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  피드백
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 - 정책 */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">정책</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  쿠키 정책
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  환불 정책
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - 소셜미디어 */}
          <div>
            <h4 className="mb-4 font-semibold text-foreground">소셜미디어</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Instagram className="h-4 w-4" />
                  인스타그램
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Youtube className="h-4 w-4" />
                  유튜브
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <BookOpen className="h-4 w-4" />
                  블로그
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <MessageCircle className="h-4 w-4" />
                  카카오톡 채널
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12 w-full border-t border-border" />

      {/* Bottom bar */}
      <div className="mx-auto max-w-7xl px-4 pt-8">
        <div className="flex flex-col gap-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p>Copyright © 2025 AI Travel Planner. All rights reserved.</p>
            <span className="hidden md:inline">•</span>
            <p>사업자등록번호: 123-45-67890</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p>대표: 홍길동</p>
            <span className="hidden md:inline">•</span>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <p>서울특별시 강남구</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
