import { MapPin, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export function TravelPlanPreview() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">트래비가 만든 여행 계획</h2>
          <p className="text-lg text-muted-foreground">AI가 실제로 생성한 맞춤형 여행 일정을 미리 확인해보세요</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          {/* Plan 1 */}
          <Card className="overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl">
            <div className="relative h-48 w-full">
              <Image 
                src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80" 
                alt="Tokyo" 
                fill 
                className="object-cover" 
              />
              <div className="absolute right-4 top-4">
                <Badge className="bg-white/90 text-foreground hover:bg-white">3일 코스</Badge>
              </div>
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold">도쿄 미식 & 쇼핑 투어</h3>
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>2박 3일</span>
                    <span className="mx-2">•</span>
                    <MapPin className="h-4 w-4" />
                    <span>도쿄, 일본</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">예산</div>
                  <div className="font-bold text-primary">₩850,000</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    1
                  </div>
                  <div className="text-sm">
                    <span className="font-bold">오전:</span> 시부야 스크램블 교차로 & 하치코 동상
                    <br />
                    <span className="font-bold">오후:</span> 하라주쿠 다케시타 거리 쇼핑
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    2
                  </div>
                  <div className="text-sm">
                    <span className="font-bold">오전:</span> 츠키지 시장 스시 브런치
                    <br />
                    <span className="font-bold">오후:</span> 긴자 명품 거리 & 카페 투어
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 p-6">
              <Button className="w-full" variant="outline">
                상세 일정 보기 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          {/* Plan 2 */}
          <Card className="overflow-hidden border-0 shadow-lg transition-all hover:shadow-xl">
            <div className="relative h-48 w-full">
              <Image 
                src="https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&q=80" 
                alt="Osaka" 
                fill 
                className="object-cover" 
              />
              <div className="absolute right-4 top-4">
                <Badge className="bg-white/90 text-foreground hover:bg-white">2일 코스</Badge>
              </div>
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold">오사카 먹방 여행</h3>
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>1박 2일</span>
                    <span className="mx-2">•</span>
                    <MapPin className="h-4 w-4" />
                    <span>오사카, 일본</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">예산</div>
                  <div className="font-bold text-primary">₩550,000</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    1
                  </div>
                  <div className="text-sm">
                    <span className="font-bold">오전:</span> 오사카성 산책 & 역사 탐방
                    <br />
                    <span className="font-bold">저녁:</span> 도톤보리 글리코상 & 타코야키
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    2
                  </div>
                  <div className="text-sm">
                    <span className="font-bold">오전:</span> 유니버셜 스튜디오 재팬
                    <br />
                    <span className="font-bold">오후:</span> 우메다 공중정원 야경
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 p-6">
              <Button className="w-full" variant="outline">
                상세 일정 보기 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
