"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, BookOpen, MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { favoriteKeys } from "@/components/favorite-button";

interface FavoriteCardProps {
  favorite: {
    id: string;
    type: "guide" | "city";
    slug: string;
    name: string;
    category: string;
  };
}

async function removeFavorite(params: { type: string; slug: string }): Promise<void> {
  const response = await fetch(`/api/favorites?type=${params.type}&slug=${params.slug}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("삭제 실패");
}

export function FavoriteCard({ favorite }: FavoriteCardProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: favoriteKeys.all });
      router.refresh();
      toast.success("삭제 완료", { description: "즐겨찾기에서 삭제되었습니다." });
    },
    onError: () => {
      toast.error("삭제 실패", { description: "다시 시도해주세요." });
    },
  });

  const onDeleteClick = () => {
    if (!confirm(`"${favorite.name}"을(를) 즐겨찾기에서 삭제하시겠습니까?`)) return;
    deleteMutation.mutate({ type: favorite.type, slug: favorite.slug });
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
          onClick={onDeleteClick}
          disabled={deleteMutation.isPending}
          className="text-destructive hover:text-destructive"
        >
          {deleteMutation.isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Heart className="h-4 w-4 fill-current" />
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
