import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";

interface MustVisit {
  name: string;
  description: string;
  category: string;
  image: string;
}

interface CityMustVisitProps {
  places: MustVisit[];
}

export function CityMustVisit({ places }: CityMustVisitProps) {
  return (
    <section className="mb-16">
      <div className="mb-8 flex items-center gap-2">
        <MapPin className="h-6 w-6 text-primary" />
        <h2 className="text-3xl font-bold">꼭 가봐야 할 곳</h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {places.map((place, index) => (
          <Card key={index} className="overflow-hidden border-0 shadow-md transition-shadow hover:shadow-lg">
            <div className="relative h-48 overflow-hidden">
              <Image src={place.image || "/placeholder.svg"} alt={place.name} fill className="object-cover" />
              <Badge className="absolute top-4 right-4">{place.category}</Badge>
            </div>
            <CardContent className="p-6">
              <h3 className="mb-2 text-lg font-bold">{place.name}</h3>
              <p className="text-sm text-muted-foreground">{place.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
