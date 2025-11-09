import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Home, MapPin, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Logo */}
        <div className="flex justify-center">
          <Logo variant="full" size="lg" />
        </div>

        {/* 404 Illustration */}
        <div className="relative">
          <div className="text-[120px] md:text-[180px] font-bold text-primary/10 leading-none">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <MapPin className="w-20 h-20 md:w-32 md:h-32 text-primary animate-bounce" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">길을 잃으셨나요?</h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            찾으시는 페이지가 존재하지 않거나 이동되었습니다.
            <br />
            트래비가 새로운 여행지로 안내해드릴게요!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="min-w-[180px]">
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              홈으로 돌아가기
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="min-w-[180px] bg-transparent">
            <Link href="/explore">
              <Compass className="w-5 h-5 mr-2" />
              여행지 둘러보기
            </Link>
          </Button>
        </div>

        {/* Quick Links */}
        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">이런 페이지를 찾고 계셨나요?</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild variant="ghost" size="sm">
              <Link href="/chat">AI 여행 계획</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/my">마이페이지</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/budget">예산 계산기</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/guide">여행 가이드</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/support">고객지원</Link>
            </Button>
          </div>
        </div>

        {/* Fun Message */}
        <div className="pt-6">
          <p className="text-sm text-muted-foreground italic">"모든 길은 새로운 여행의 시작입니다" ✈️</p>
        </div>
      </div>
    </div>
  );
}
