import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, Plane, Wallet, MapPin, Languages, FileText } from "lucide-react";
import { getAllGuides } from "@/lib/mdx";

export default async function GuidePage() {
  const allGuides = await getAllGuides();

  const guides = allGuides.map((guide) => ({
    id: guide.slug,
    title: guide.metadata.title,
    description: guide.metadata.description,
    category: guide.metadata.category,
    image: guide.metadata.image,
    readTime: guide.metadata.readTime,
    tags: guide.metadata.tags,
  }));
  const categories = [
    { id: "visa", label: "비자", icon: FileText, count: 12 },
    { id: "money", label: "환전", icon: Wallet, count: 8 },
    { id: "transport", label: "교통", icon: MapPin, count: 15 },
    { id: "culture", label: "문화", icon: Languages, count: 10 },
    { id: "preparation", label: "여행 준비", icon: Plane, count: 18 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/20 via-background to-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">여행 가이드</h1>
          </div>
          <p className="text-lg text-foreground/80">여행 준비부터 현지 팁까지, 알아두면 유용한 모든 정보</p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="궁금한 여행 정보를 검색하세요..." className="h-14 pl-12 text-base" />
          </div>
        </div>

        <div className="mb-12 flex flex-wrap gap-3">
          <Button variant="default" className="gap-2 rounded-xl">
            전체
            <Badge variant="secondary" className="ml-1">
              {guides.length}
            </Badge>
          </Button>
          {categories.map((cat) => (
            <Button key={cat.id} variant="outline" className="gap-2 rounded-xl bg-card">
              <cat.icon className="h-4 w-4" />
              {cat.label}
              <Badge variant="secondary" className="ml-1">
                {cat.count}
              </Badge>
            </Button>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="mb-6 text-2xl font-bold text-foreground">전체 가이드</h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <Link key={guide.id} href={`/guide/${guide.id}`}>
                <Card className="group flex flex-col overflow-hidden border-0 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="relative h-48 w-full shrink-0 overflow-hidden">
                    <img
                      src={guide.image || "/placeholder.svg"}
                      alt={guide.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge className="absolute left-4 top-4 bg-primary/90">{guide.category}</Badge>
                  </div>
                  <CardContent className="flex flex-1 flex-col p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{guide.readTime} 읽기</span>
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-foreground line-clamp-2">{guide.title}</h3>
                    <p className="mb-auto text-sm text-foreground/70 line-clamp-2">{guide.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {guide.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">찾으시는 정보가 없으신가요?</h2>
          <p className="mb-6 text-lg text-foreground/80">고객센터를 통해 문의하시면 빠르게 도와드리겠습니다</p>
          <Button asChild size="lg" className="bg-cta text-cta-foreground hover:bg-cta/90">
            <Link href="/support">고객센터 문의하기</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
