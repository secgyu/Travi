import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { getGuide, getAllGuideSlugs } from "@/lib/mdx";
import { compileMDX } from "next-mdx-remote/rsc";
import { createMDXComponents } from "@/components/mdx-content";
import { GuideTableOfContents } from "@/components/guide-toc";
import { FavoriteButton } from "@/components/favorite-button";

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
    components: createMDXComponents(),
  });

  const headings = content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => line.replace("## ", ""));

  const tableOfContents = headings.map((text, idx) => ({
    id: `section-${idx}`,
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
            <FavoriteButton type="guide" slug={slug} title={metadata.title} category={metadata.category} />
          </div>
        </div>

        <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-2xl">
          <Image src={metadata.image} alt={metadata.title} fill className="object-cover" priority />
        </div>

        <GuideTableOfContents items={tableOfContents} />

        <div className="space-y-8">{MDXContent}</div>

        <div className="mt-16 border-t pt-12">
          <h2 className="mb-6 text-2xl font-bold text-foreground">관련 가이드</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {metadata.relatedGuides.map((related) => (
              <Link key={related.id} href={`/guide/${related.id}`}>
                <Card className="group overflow-hidden border-0 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={related.image}
                      alt={related.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
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
