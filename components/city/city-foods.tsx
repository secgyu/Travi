import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Utensils } from "lucide-react";

interface Food {
  name: string;
  nameLocal: string;
  description: string;
  price: string;
}

interface CityFoodsProps {
  foods: Food[];
}

export function CityFoods({ foods }: CityFoodsProps) {
  return (
    <section className="mb-16">
      <div className="mb-8 flex items-center gap-2">
        <Utensils className="h-6 w-6 text-primary" />
        <h2 className="text-3xl font-bold">현지 음식</h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {foods.map((food, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold">{food.name}</h3>
                  <p className="text-sm text-muted-foreground">{food.nameLocal}</p>
                </div>
                <Badge variant="secondary">{food.price}</Badge>
              </div>
              <p className="text-sm text-foreground/80">{food.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
