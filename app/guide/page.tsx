import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { getAllGuides } from "@/lib/mdx";
import { GuideFilter } from "@/components/guide-filter";

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

        <GuideFilter guides={guides} />

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
