export interface Transportation {
  name: string;
  description: string;
}

export interface MustVisit {
  name: string;
  description: string;
  category: string;
  image: string;
}

export interface Food {
  name: string;
  nameLocal: string;
  description: string;
  price: string;
}

export interface CityData {
  name: string;
  country: string;
  region: string;
  emoji: string;
  description: string;
  heroImage: string;
  images: string[];
  bestSeason: string;
  avgTemp: string;
  avgBudget: string;
  recommendedDays: string;
  timezone: string;
  language: string;
  currency: string;
  transportation: Transportation[];
  mustVisit: MustVisit[];
  foods: Food[];
  tips: string[];
  highlights: string[];
}

export interface CitySlug {
  slug: string;
  koreanName: string;
}

