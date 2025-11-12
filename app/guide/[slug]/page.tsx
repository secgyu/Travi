import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Eye, Clock, Share2, Bookmark, ChevronRight } from "lucide-react";
import { getGuide, getAllGuideSlugs } from "@/lib/mdx";
import { compileMDX } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const slugs = await getAllGuideSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = await getGuide(slug);

  if (!guide) notFound();

  const { metadata, content } = guide;

  const { content: MDXContent } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: false,
    },
  });

  const headings = content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => line.replace("## ", ""));

  const tableOfContents = headings.map((text) => ({
    id: text.toLowerCase().replace(/\s+/g, "-"),
    text,
  }));

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <article className="mx-auto max-w-4xl px-4 py-8">
        <Button asChild variant="ghost" className="mb-6 -ml-2">
          <Link href="/guide">
            <ArrowLeft className="mr-2 h-4 w-4" />
            목록으로
          </Link>
        </Button>

        <div className="mb-8">
          <Badge className="mb-4">{metadata.category}</Badge>
          <h1 className="mb-4 text-4xl font-bold text-foreground text-balance">{metadata.title}</h1>
          <p className="mb-6 text-lg text-foreground/80 text-pretty">{metadata.description}</p>

          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {metadata.date}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {metadata.readTime} 읽기
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              조회수 {metadata.views}
            </div>
            <div className="flex items-center gap-1">작성자: {metadata.author}</div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {metadata.tags.map((tag, idx) => (
              <Badge key={idx} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Share2 className="h-4 w-4" />
              공유하기
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Bookmark className="h-4 w-4" />
              저장하기
            </Button>
          </div>
        </div>

        <div className="mb-8 overflow-hidden rounded-2xl">
          <img
            src={metadata.image || "/placeholder.svg"}
            alt={metadata.title}
            className="w-full h-[400px] object-cover"
          />
        </div>

        <div className="mb-12 rounded-xl bg-accent/20 p-6">
          <h2 className="mb-4 text-lg font-bold text-foreground">목차</h2>
          <nav className="space-y-2">
            {tableOfContents.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
                {item.text}
              </a>
            ))}
          </nav>
        </div>

        <div className="prose prose-lg max-w-none">{MDXContent}</div>

        <div className="mt-16 border-t pt-12">
          <h2 className="mb-6 text-2xl font-bold text-foreground">관련 가이드</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {metadata.relatedGuides.map((related) => (
              <Link key={related.id} href={`/guide/${related.id}`}>
                <Card className="group overflow-hidden border-0 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={related.image || "/placeholder.svg"}
                      alt={related.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-foreground line-clamp-2">{related.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-foreground">더 궁금한 점이 있으신가요?</h2>
          <p className="mb-6 text-foreground/80">고객센터를 통해 언제든지 문의해주세요</p>
          <Button asChild size="lg" className="bg-cta text-cta-foreground hover:bg-cta/90">
            <Link href="/support">고객센터 문의하기</Link>
          </Button>
        </div>
      </article>

      <Footer />
    </div>
  );
}
