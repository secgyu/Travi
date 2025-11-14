import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Thermometer, DollarSign, Clock } from "lucide-react";

interface CityQuickInfoProps {
  bestSeason: string;
  avgTemp: string;
  avgBudget: string;
  recommendedDays: string;
}

export function CityQuickInfo({ bestSeason, avgTemp, avgBudget, recommendedDays }: CityQuickInfoProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="flex items-start gap-3 p-6">
          <Calendar className="h-5 w-5 text-primary mt-1" />
          <div>
            <p className="text-sm text-muted-foreground mb-1">최적 시즌</p>
            <p className="font-medium">{bestSeason}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-start gap-3 p-6">
          <Thermometer className="h-5 w-5 text-primary mt-1" />
          <div>
            <p className="text-sm text-muted-foreground mb-1">평균 기온</p>
            <p className="font-medium text-sm">{avgTemp}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-start gap-3 p-6">
          <DollarSign className="h-5 w-5 text-primary mt-1" />
          <div>
            <p className="text-sm text-muted-foreground mb-1">예상 예산</p>
            <p className="font-medium">{avgBudget}</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-start gap-3 p-6">
          <Clock className="h-5 w-5 text-primary mt-1" />
          <div>
            <p className="text-sm text-muted-foreground mb-1">권장 일정</p>
            <p className="font-medium">{recommendedDays}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
