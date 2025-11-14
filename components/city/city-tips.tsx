import { Card, CardContent } from "@/components/ui/card";
import { Info } from "lucide-react";

interface CityTipsProps {
  tips: string[];
}

export function CityTips({ tips }: CityTipsProps) {
  return (
    <section className="mb-16">
      <div className="mb-8 flex items-center gap-2">
        <Info className="h-6 w-6 text-primary" />
        <h2 className="text-3xl font-bold">여행 팁</h2>
      </div>
      <Card>
        <CardContent className="p-6">
          <ul className="space-y-3">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {index + 1}
                </span>
                <span className="text-foreground/80">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
