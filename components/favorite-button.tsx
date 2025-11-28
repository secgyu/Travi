"use client";

import { useState, useEffect } from "react";
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

export function FavoriteButton({
  type,
  slug,
  title,
  category,
  variant = "default",
  className = "",
}: FavoriteButtonProps) {
  const { isAuthenticated, requireAuth } = useRequireAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!isAuthenticated) {
        setIsChecking(false);
        return;
      }

      try {
        const response = await fetch("/api/favorites");
        if (response.ok) {
          const data = await response.json();
          const favorites = type === "guide" ? data.guides : data.cities;
          const slugField = type === "guide" ? "guide_slug" : "city_slug";
          setIsFavorite(favorites.some((f: Record<string, string>) => f[slugField] === slug));
        }
      } catch {
      } finally {
        setIsChecking(false);
      }
    };

    checkFavorite();
  }, [isAuthenticated, type, slug]);

  const handleClick = async () => {
    if (!requireAuth({ description: "즐겨찾기 기능은 로그인 후 이용 가능합니다." })) return;

    setIsLoading(true);

    try {
      if (isFavorite) {
        const response = await fetch(`/api/favorites?type=${type}&slug=${slug}`, { method: "DELETE" });

        if (!response.ok) throw new Error("삭제 실패");

        setIsFavorite(false);
        toast.success("즐겨찾기 삭제", { description: `"${title}"이(가) 즐겨찾기에서 삭제되었습니다.` });
      } else {
        const response = await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type, slug, title, category }),
        });

        if (!response.ok) {
          const data = await response.json();
          if (response.status === 409) {
            setIsFavorite(true);
            toast("이미 추가됨", { description: "이미 즐겨찾기에 추가되어 있습니다." });
            return;
          }
          throw new Error(data.error || "추가 실패");
        }

        setIsFavorite(true);
        toast.success("즐겨찾기 추가", { description: `"${title}"이(가) 즐겨찾기에 추가되었습니다.` });
      }
    } catch {
      toast.error("오류 발생", { description: "다시 시도해주세요." });
    } finally {
      setIsLoading(false);
    }
  };

  if (isChecking) {
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
