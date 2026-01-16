"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRequireAuth } from "@/hooks/use-require-auth";

interface FavoriteButtonProps {
  type: "guide" | "city";
  slug: string;
  title: string;
  category?: string;
  variant?: "default" | "icon";
  className?: string;
}

export const favoriteKeys = {
  all: ["favorites"] as const,
  check: (type: string, slug: string) => ["favorites", type, slug] as const,
};

async function fetchFavorites(): Promise<{ guides: Record<string, string>[]; cities: Record<string, string>[] }> {
  const response = await fetch("/api/favorites");
  if (!response.ok) throw new Error("Failed to fetch favorites");
  return response.json();
}

async function addFavorite(params: { type: string; slug: string; title: string; category?: string }): Promise<void> {
  const response = await fetch("/api/favorites", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const data = await response.json();
    if (response.status === 409) {
      throw new Error("ALREADY_EXISTS");
    }
    throw new Error(data.error || "추가 실패");
  }
}

async function removeFavorite(params: { type: string; slug: string }): Promise<void> {
  const response = await fetch(`/api/favorites?type=${params.type}&slug=${params.slug}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("삭제 실패");
}

export function FavoriteButton({
  type,
  slug,
  title,
  category,
  variant = "default",
  className = "",
}: FavoriteButtonProps) {
  const queryClient = useQueryClient();
  const { isAuthenticated, requireAuth } = useRequireAuth();

  const { data: favorites, isLoading: isChecking } = useQuery({
    queryKey: favoriteKeys.all,
    queryFn: fetchFavorites,
    enabled: isAuthenticated,
    staleTime: 2 * 60 * 1000,
  });

  const isFavorite = (() => {
    if (!favorites) return false;
    const list = type === "guide" ? favorites.guides : favorites.cities;
    const slugField = type === "guide" ? "guide_slug" : "city_slug";
    return list.some((f) => f[slugField] === slug);
  })();

  const addMutation = useMutation({
    mutationFn: addFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: favoriteKeys.all });
      toast.success("즐겨찾기 추가", { description: `"${title}"이(가) 즐겨찾기에 추가되었습니다.` });
    },
    onError: (error: Error) => {
      if (error.message === "ALREADY_EXISTS") {
        queryClient.invalidateQueries({ queryKey: favoriteKeys.all });
        toast("이미 추가됨", { description: "이미 즐겨찾기에 추가되어 있습니다." });
      } else {
        toast.error("오류 발생", { description: "다시 시도해주세요." });
      }
    },
  });

  const removeMutation = useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: favoriteKeys.all });
      toast.success("즐겨찾기 삭제", { description: `"${title}"이(가) 즐겨찾기에서 삭제되었습니다.` });
    },
    onError: () => {
      toast.error("오류 발생", { description: "다시 시도해주세요." });
    },
  });

  const isLoading = addMutation.isPending || removeMutation.isPending;

  const handleClick = () => {
    if (!requireAuth({ description: "즐겨찾기 기능은 로그인 후 이용 가능합니다." })) return;

    if (isFavorite) {
      removeMutation.mutate({ type, slug });
    } else {
      addMutation.mutate({ type, slug, title, category });
    }
  };

  if (isChecking && isAuthenticated) {
    return variant === "icon" ? (
      <Button variant="outline" size="icon" disabled className={className}>
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    ) : (
      <Button variant="outline" disabled className={className}>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        확인 중...
      </Button>
    );
  }

  if (variant === "icon") {
    return (
      <Button variant="outline" size="icon" onClick={handleClick} disabled={isLoading} className={className}>
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
        )}
      </Button>
    );
  }

  return (
    <Button
      variant={isFavorite ? "default" : "outline"}
      onClick={handleClick}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Heart className={`mr-2 h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
      )}
      {isFavorite ? "즐겨찾기됨" : "즐겨찾기"}
    </Button>
  );
}
