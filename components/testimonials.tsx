import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Testimonials() {
  const reviews = [
    {
      name: "김민지",
      role: "도쿄 3일 여행",
      image: "/user-avatar.jpg",
      content:
        "AI가 정말 제 취향을 정확히 맞춰줬어요. 특히 추천해준 카페들이 너무 좋았습니다. 계획 짜는 시간이 확 줄어서 행복했어요!",
      rating: 5,
    },
    {
      name: "이준호",
      role: "방콕 4일 여행",
      image: "/placeholder.svg?height=40&width=40",
      content:
        "처음엔 반신반의했는데, 동선이 정말 효율적이었습니다. 현지인만 아는 맛집 추천도 훌륭했고 예산 관리도 편했어요.",
      rating: 5,
    },
    {
      name: "박서연",
      role: "파리 5일 여행",
      image: "/placeholder.svg?height=40&width=40",
      content:
        "혼자 가는 여행이라 막막했는데 트래비 덕분에 완벽한 일정을 짰습니다. 치안 정보까지 알려줘서 안심하고 다녀왔어요.",
      rating: 4,
    },
  ];

  return (
    <section className="bg-secondary/5 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">여행자들의 생생한 후기</h2>
          <p className="text-lg text-muted-foreground">트래비와 함께 여행을 다녀온 분들의 이야기입니다</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {reviews.map((review, index) => (
            <Card key={index} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "fill-accent text-accent" : "fill-muted text-muted"}`}
                    />
                  ))}
                </div>
                <p className="mb-6 text-muted-foreground">"{review.content}"</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={review.image || "/placeholder.svg"} alt={review.name} />
                    <AvatarFallback>{review.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold">{review.name}</div>
                    <div className="text-xs text-muted-foreground">{review.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
