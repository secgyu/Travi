import { Users, Star, Clock } from "lucide-react";

export function StatsSection() {
  return (
    <section className="border-y bg-white/50 py-12 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 text-center md:grid-cols-3">
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Users className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-foreground">10,000+</div>
            <div className="text-sm text-muted-foreground">생성된 여행 계획</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
              <Star className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-foreground">4.8/5.0</div>
            <div className="text-sm text-muted-foreground">사용자 만족도</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary">
              <Clock className="h-6 w-6" />
            </div>
            <div className="text-3xl font-bold text-foreground">3분</div>
            <div className="text-sm text-muted-foreground">평균 계획 완성 시간</div>
          </div>
        </div>
      </div>
    </section>
  );
}
