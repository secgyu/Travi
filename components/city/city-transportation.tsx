import { Card, CardContent } from "@/components/ui/card";
import { Train } from "lucide-react";

interface Transportation {
  name: string;
  description: string;
}

interface CityTransportationProps {
  transportation: Transportation[];
}

export function CityTransportation({ transportation }: CityTransportationProps) {
  return (
    <section className="mb-16">
      <div className="mb-8 flex items-center gap-2">
        <Train className="h-6 w-6 text-primary" />
        <h2 className="text-3xl font-bold">교통수단</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {transportation.map((transport, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <h3 className="mb-2 font-bold">{transport.name}</h3>
              <p className="text-sm text-muted-foreground">{transport.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
