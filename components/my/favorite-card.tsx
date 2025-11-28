"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, BookOpen, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface FavoriteCardProps {
  favorite: {
    id: string;
    type: "guide" | "city";
    slug: string;
    name: string;
    category: string;
  };
}

export function FavoriteCard({ favorite }: FavoriteCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`"${favorite.name}"을(를) 즐겨찾기에서 삭제하시겠습니까?`)) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/favorites?type=${favorite.type}&slug=${favorite.slug}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("삭제 실패");
      }
      toast.success("삭제 완료", { description: "즐겨찾기에서 삭제되었습니다." });
      router.refresh();
    } catch {
      toast.error("삭제 실패", { description: "다시 시도해주세요." });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClick = () => {
    if (favorite.type === "guide") {
      router.push(`/guide/${favorite.slug}`);
    } else {
      router.push(`/explore/${favorite.slug}`);
    }
  };

  return (
    <Card className="transition-colors hover:bg-accent/50">
      <CardContent className="flex items-center justify-between p-4">
        <button onClick={handleClick} className="flex flex-1 items-center gap-4 text-left">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
            {favorite.type === "guide" ? (
              <BookOpen className="h-6 w-6 text-primary" />
            ) : (
              <MapPin className="h-6 w-6 text-primary" />
            )}
          </div>
          <div>
            <h4 className="font-semibold text-foreground">{favorite.name}</h4>
            <p className="text-sm text-muted-foreground">{favorite.category}</p>
          </div>
        </button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-destructive hover:text-destructive"
        >
          {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Heart className="h-4 w-4 fill-current" />}
        </Button>
      </CardContent>
    </Card>
  );
}
