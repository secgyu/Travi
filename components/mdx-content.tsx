import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, Lightbulb, Info } from "lucide-react";
import { ReactNode } from "react";

function createMDXComponents() {
  let headingCounter = 0;

  return {
    h2: ({ children }: { children: ReactNode }) => {
      const id = `section-${headingCounter}`;
      headingCounter++;
      return (
        <div id={id} className="scroll-mt-24 mb-6">
          <div className="flex items-center gap-3 border-l-4 border-primary pl-4">
            <h2 className="text-2xl font-bold text-foreground">{children}</h2>
          </div>
        </div>
      );
    },

    h3: ({ children }: { children: ReactNode }) => (
      <h3 className="text-xl font-bold text-foreground mb-4 mt-6">{children}</h3>
    ),

    p: ({ children }: { children: ReactNode }) => {
      const text = String(children);

      if (text.includes("팁") || text.includes("추천") || text.includes("Tip") || text.includes("💡")) {
        return (
          <Card className="border-l-4 border-l-green-500 bg-green-50 dark:bg-green-950/20 my-4">
            <CardContent className="flex gap-3 p-4">
              <Lightbulb className="h-5 w-5 shrink-0 text-green-600 dark:text-green-400 mt-0.5" />
              <div className="text-sm leading-relaxed text-foreground">{children}</div>
            </CardContent>
          </Card>
        );
      }

      if (text.includes("주의") || text.includes("확인") || text.includes("⚠️") || text.includes("경고")) {
        return (
          <Card className="border-l-4 border-l-orange-500 bg-orange-50 dark:bg-orange-950/20 my-4">
            <CardContent className="flex gap-3 p-4">
              <AlertCircle className="h-5 w-5 shrink-0 text-orange-600 dark:text-orange-400 mt-0.5" />
              <div className="text-sm leading-relaxed text-foreground">{children}</div>
            </CardContent>
          </Card>
        );
      }

      if (text.includes("참고") || text.includes("알아두기") || text.includes("ℹ️")) {
        return (
          <Card className="border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-950/20 my-4">
            <CardContent className="flex gap-3 p-4">
              <Info className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div className="text-sm leading-relaxed text-foreground">{children}</div>
            </CardContent>
          </Card>
        );
      }

      return <p className="text-base leading-relaxed text-foreground/90 my-4">{children}</p>;
    },

    ul: ({ children }: { children: ReactNode }) => (
      <Card className="border-0 shadow-sm my-4">
        <CardContent className="p-6">
          <ul className="space-y-3">{children}</ul>
        </CardContent>
      </Card>
    ),

    ol: ({ children }: { children: ReactNode }) => (
      <Card className="border-0 shadow-sm my-4">
        <CardContent className="p-6">
          <ol className="space-y-3 list-decimal list-inside">{children}</ol>
        </CardContent>
      </Card>
    ),

    li: ({ children }: { children: ReactNode }) => (
      <li className="flex items-start gap-3 text-base text-foreground/90">
        <CheckCircle2 className="h-5 w-5 shrink-0 text-primary mt-0.5" />
        <span className="leading-relaxed">{children}</span>
      </li>
    ),

    strong: ({ children }: { children: ReactNode }) => (
      <strong className="font-bold text-foreground">{children}</strong>
    ),

    em: ({ children }: { children: ReactNode }) => <em className="italic text-foreground/80">{children}</em>,

    code: ({ children }: { children: ReactNode }) => (
      <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono text-foreground">{children}</code>
    ),

    pre: ({ children }: { children: ReactNode }) => (
      <pre className="rounded-lg bg-muted p-4 overflow-x-auto my-4">
        <code className="text-sm font-mono">{children}</code>
      </pre>
    ),

    blockquote: ({ children }: { children: ReactNode }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic text-foreground/80 my-4">{children}</blockquote>
    ),

    hr: () => <hr className="my-8 border-border" />,

    a: ({ href, children }: { href?: string; children: ReactNode }) => (
      <a
        href={href}
        className="text-primary hover:underline font-medium"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),

    table: ({ children }: { children: ReactNode }) => (
      <div className="overflow-x-auto my-4">
        <table className="w-full border-collapse border border-border">{children}</table>
      </div>
    ),

    th: ({ children }: { children: ReactNode }) => (
      <th className="border border-border bg-muted p-2 text-left font-bold">{children}</th>
    ),

    td: ({ children }: { children: ReactNode }) => <td className="border border-border p-2">{children}</td>,
  };
}

export default createMDXComponents();
