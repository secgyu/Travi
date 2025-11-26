export interface Activity {
  time: string;
  title: string;
  subtitle: string;
  type: string;
  transport: string;
  duration: string;
  price: string;
  photo: boolean;
  category?: string;
  lat?: number;
  lng?: number;
  address?: string;
  gps_confidence?: "high" | "medium" | "low";
}

export interface DayItinerary {
  day: number;
  title: string;
  date: string;
  activities: Activity[];
}

export interface TravelPlan {
  id: string;
  title: string;
  destination: string;
  start_date: string;
  end_date: string;
  budget: number;
  currency: string;
  itinerary: DayItinerary[];
  travel_style?: string[];
  status: string;
}

export interface WeatherData {
  location: string;
  country: string;
  current: {
    temp: number;
    condition: string;
    icon: string;
    humidity: number;
    feelslike: number;
    wind: number;
  };
  forecast?: Array<{
    date: string;
    maxTemp: number;
    minTemp: number;
    condition: string;
    icon: string;
  }>;
}

