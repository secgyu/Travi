import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PageHeaderProps {
  title: string;
  showBackButton?: boolean;
}

export function PageHeader({ title, showBackButton = true }: PageHeaderProps) {
  return (
    <header className="border-b border-border bg-card/50 px-4 py-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-primary">
            AI 여행 플래너
          </Link>
          {showBackButton && (
            <Button asChild variant="ghost" size="sm">
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                뒤로가기
              </Link>
            </Button>
          )}
        </div>
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
      </div>
    </header>
  );
}
