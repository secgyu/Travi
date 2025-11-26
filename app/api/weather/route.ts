import { NextRequest, NextResponse } from "next/server";

interface WeatherResponse {
  location: {
    name: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    humidity: number;
    feelslike_c: number;
    wind_kph: number;
  };
  forecast?: {
    forecastday: Array<{
      date: string;
      day: {
        maxtemp_c: number;
        mintemp_c: number;
        condition: {
          text: string;
          icon: string;
        };
      };
    }>;
  };
}

interface WeatherAPIError {
  error: {
    code: number;
    message: string;
  };
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const city = searchParams.get("city");
  const days = searchParams.get("days") || "3";

  if (!city || city === "여행지") {
    return NextResponse.json(
      { success: false, error: "유효한 도시명이 필요합니다" },
      { status: 400 }
    );
  }

  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API;

  if (!apiKey) {
    return NextResponse.json(
      { success: false, error: "날씨 API 키가 설정되지 않았습니다" },
      { status: 500 }
    );
  }

  try {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=${days}&lang=ko`;

    const response = await fetch(url, {
      next: { revalidate: 1800 }
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      const errorData = data as WeatherAPIError;
      return NextResponse.json(
        { success: false, error: errorData.error?.message || "날씨 정보를 가져올 수 없습니다" },
        { status: response.status }
      );
    }

    const weatherData = data as WeatherResponse;

    return NextResponse.json({
      success: true,
      data: {
        location: weatherData.location.name,
        country: weatherData.location.country,
        current: {
          temp: Math.round(weatherData.current.temp_c),
          condition: weatherData.current.condition.text,
          icon: weatherData.current.condition.icon,
          humidity: weatherData.current.humidity,
          feelslike: Math.round(weatherData.current.feelslike_c),
          wind: Math.round(weatherData.current.wind_kph),
        },
        forecast: weatherData.forecast?.forecastday.map((day) => ({
          date: day.date,
          maxTemp: Math.round(day.day.maxtemp_c),
          minTemp: Math.round(day.day.mintemp_c),
          condition: day.day.condition.text,
          icon: day.day.condition.icon,
        })),
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "날씨 정보를 가져오는데 실패했습니다" },
      { status: 500 }
    );
  }
}
