import type { MDXComponents } from "mdx/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="mb-4 text-4xl font-bold text-foreground text-balance">{children}</h1>,
    h2: ({ children }) => (
      <h2
        className="mt-12 mb-4 text-2xl font-bold text-foreground first:mt-0"
        id={String(children).toLowerCase().replace(/\s+/g, "-")}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => <h3 className="mt-8 mb-3 text-xl font-semibold text-foreground">{children}</h3>,
    p: ({ children }) => <p className="mb-4 text-base leading-relaxed text-foreground/90">{children}</p>,
    ul: ({ children }) => <ul className="mb-6 space-y-2 ml-6">{children}</ul>,
    li: ({ children }) => <li className="text-base text-foreground/90 list-disc">{children}</li>,
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    em: ({ children }) => <em className="italic text-foreground/80">{children}</em>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 py-2 my-6 italic text-foreground/80">{children}</blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-accent px-1.5 py-0.5 rounded text-sm font-mono text-foreground">{children}</code>
    ),
    pre: ({ children }) => <pre className="bg-accent p-4 rounded-lg overflow-x-auto mb-6">{children}</pre>,
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
    Badge,
    Card,
    ...components,
  };
}
