"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Plane, Wallet, MapPin, Languages, FileText } from "lucide-react";

interface Guide {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  readTime: string;
  tags: string[];
}

interface GuideFilterProps {
  guides: Guide[];
}

const categoryConfig = [
  { id: "비자", label: "비자", icon: FileText },
  { id: "환전", label: "환전", icon: Wallet },
  { id: "교통", label: "교통", icon: MapPin },
  { id: "문화", label: "문화", icon: Languages },
  { id: "여행 준비", label: "여행 준비", icon: Plane },
];

export function GuideFilter({ guides }: GuideFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    guides.forEach((guide) => {
      counts[guide.category] = (counts[guide.category] || 0) + 1;
    });
    return counts;
  }, [guides]);

  const filteredGuides = useMemo(() => {
    return guides.filter((guide) => {
      if (selectedCategory && guide.category !== selectedCategory) {
        return false;
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          guide.title.toLowerCase().includes(query) ||
          guide.description.toLowerCase().includes(query) ||
          guide.tags.some((tag) => tag.toLowerCase().includes(query))
        );
      }

      return true;
    });
  }, [guides, selectedCategory, searchQuery]);

  return (
    <>
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="궁금한 여행 정보를 검색하세요..."
            className="h-14 pl-12 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-12 flex flex-wrap gap-3">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          className="gap-2 rounded-xl"
          onClick={() => setSelectedCategory(null)}
        >
          전체
          <Badge variant="secondary" className="ml-1">
            {guides.length}
          </Badge>
        </Button>
        {categoryConfig.map((cat) => {
          const count = categoryCounts[cat.id] || 0;
          return (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? "default" : "outline"}
              className="gap-2 rounded-xl bg-card"
              onClick={() => setSelectedCategory(cat.id)}
            >
              <cat.icon className="h-4 w-4" />
              {cat.label}
              <Badge variant="secondary" className="ml-1">
                {count}
              </Badge>
            </Button>
          );
        })}
      </div>

      <div className="mb-8">
        <h2 className="mb-6 text-2xl font-bold text-foreground">
          {selectedCategory ? `${selectedCategory} 가이드` : "전체 가이드"}
          {searchQuery && ` - "${searchQuery}" 검색 결과`}
        </h2>

        {filteredGuides.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground">검색 결과가 없습니다.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredGuides.map((guide) => (
              <Link key={guide.id} href={`/guide/${guide.id}`}>
                <Card className="group flex flex-col overflow-hidden border-0 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="relative h-48 w-full shrink-0 overflow-hidden">
                    <Image
                      src={guide.image || "/placeholder.svg"}
                      alt={guide.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
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
        )}
      </div>
    </>
  );
}
