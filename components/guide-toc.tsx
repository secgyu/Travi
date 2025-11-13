"use client";

import { ChevronRight } from "lucide-react";

interface TableOfContentsProps {
  items: { id: string; text: string }[];
}

export function GuideTableOfContents({ items }: TableOfContentsProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <div className="mb-12 rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="rounded-lg bg-primary/10 p-2">
          <ChevronRight className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground">목차</h2>
      </div>
      <nav className="space-y-3">
        {items.map((item, idx) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className="group flex items-start gap-3 rounded-lg px-3 py-2 text-foreground/80 transition-all hover:bg-accent hover:text-primary cursor-pointer"
          >
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              {idx + 1}
            </span>
            <span className="text-sm font-medium leading-relaxed">{item.text}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
