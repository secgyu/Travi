import { Card, CardContent } from "@/components/ui/card";

interface CityBasicInfoProps {
  timezone: string;
  language: string;
  currency: string;
}

export function CityBasicInfo({ timezone, language, currency }: CityBasicInfoProps) {
  return (
    <section className="mb-16">
      <h2 className="mb-6 text-3xl font-bold">기본 정보</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <p className="mb-1 text-sm text-muted-foreground">시차</p>
            <p className="font-medium">{timezone}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="mb-1 text-sm text-muted-foreground">언어</p>
            <p className="font-medium">{language}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="mb-1 text-sm text-muted-foreground">통화</p>
            <p className="font-medium">{currency}</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
