interface GeocodingResult {
  lat: number;
  lng: number;
  address?: string;
  confidence: 'high' | 'medium' | 'low';
  source: 'google' | 'ai' | 'fallback';
}

const CITY_COORDINATES: Record<string, { lat: number; lng: number }> = {
  '도쿄': { lat: 35.6762, lng: 139.6503 },
  'Tokyo': { lat: 35.6762, lng: 139.6503 },
  '오사카': { lat: 34.6937, lng: 135.5023 },
  'Osaka': { lat: 34.6937, lng: 135.5023 },
  '방콕': { lat: 13.7563, lng: 100.5018 },
  'Bangkok': { lat: 13.7563, lng: 100.5018 },
  '파리': { lat: 48.8566, lng: 2.3522 },
  'Paris': { lat: 48.8566, lng: 2.3522 },
  '뉴욕': { lat: 40.7128, lng: -74.0060 },
  'New York': { lat: 40.7128, lng: -74.0060 },
  '런던': { lat: 51.5074, lng: -0.1278 },
  'London': { lat: 51.5074, lng: -0.1278 },
  '바르셀로나': { lat: 41.3851, lng: 2.1734 },
  'Barcelona': { lat: 41.3851, lng: 2.1734 },
  '로마': { lat: 41.9028, lng: 12.4964 },
  'Rome': { lat: 41.9028, lng: 12.4964 },
  '싱가포르': { lat: 1.3521, lng: 103.8198 },
  'Singapore': { lat: 1.3521, lng: 103.8198 },
  '홍콩': { lat: 22.3193, lng: 114.1694 },
  'Hong Kong': { lat: 22.3193, lng: 114.1694 },
  '타이베이': { lat: 25.0330, lng: 121.5654 },
  'Taipei': { lat: 25.0330, lng: 121.5654 },
  '다낭': { lat: 16.0544, lng: 108.2022 },
  'Da Nang': { lat: 16.0544, lng: 108.2022 },
  '두바이': { lat: 25.2048, lng: 55.2708 },
  'Dubai': { lat: 25.2048, lng: 55.2708 },
};

const geocodeCache = new Map<string, GeocodingResult>();

export async function smartGeocode(
  title: string,
  subtitle: string,
  destination: string
): Promise<GeocodingResult> {

  const cacheKey = `${title}|${subtitle}|${destination}`;
  if (geocodeCache.has(cacheKey)) {
    return geocodeCache.get(cacheKey)!;
  }

  if (subtitle && subtitle.trim()) {
    const result1 = await tryGoogleGeocode(`${subtitle}, ${destination}`);
    if (result1 && result1.confidence === 'high') {
      geocodeCache.set(cacheKey, result1);
      return result1;
    }
  }

  if (subtitle && subtitle.trim()) {
    const result2 = await tryGoogleGeocode(subtitle);
    if (result2 && result2.confidence === 'high') {
      geocodeCache.set(cacheKey, result2);
      return result2;
    }
  }

  const result3 = await tryGoogleGeocode(`${title}, ${destination}`);
  if (result3 && result3.confidence !== 'low') {
    geocodeCache.set(cacheKey, result3);
    return result3;
  }

  if (process.env.OPENAI_API_KEY) {
    const aiResult = await askAIForCoordinates(title, subtitle, destination);
    if (aiResult) {
      geocodeCache.set(cacheKey, aiResult);
      return aiResult;
    }
  }
  const fallback = getCityCenterCoordinates(destination);
  geocodeCache.set(cacheKey, fallback);
  return fallback;
}

async function tryGoogleGeocode(query: string): Promise<GeocodingResult | null> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.warn('⚠️ Google Maps API key not found');
    return null;
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?` +
      `address=${encodeURIComponent(query)}&` +
      `key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'OK' && data.results && data.results.length > 0) {
      const result = data.results[0];

      let confidence: 'high' | 'medium' | 'low' = 'low';

      if (result.types.includes('point_of_interest') ||
        result.types.includes('establishment') ||
        result.types.includes('tourist_attraction') ||
        result.types.includes('restaurant') ||
        result.types.includes('store')) {
        confidence = 'high';
      }

      else if (result.types.includes('route') ||
        result.types.includes('sublocality') ||
        result.types.includes('neighborhood')) {
        confidence = 'medium';
      }

      else {
        confidence = 'low';
      }

      return {
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
        address: result.formatted_address,
        confidence,
        source: 'google'
      };
    }

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      console.error(`Geocoding API error: ${data.status}`, data.error_message);
    }

    return null;
  } catch (error) {
    console.error('❌ Geocoding request failed:', error);
    return null;
  }
}

async function askAIForCoordinates(
  title: string,
  subtitle: string,
  destination: string
): Promise<GeocodingResult | null> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return null;
  }

  try {
    const prompt = subtitle
      ? `"${title}" (${subtitle})의 ${destination}에서의 정확한 GPS 좌표`
      : `"${title}"의 ${destination}에서의 정확한 GPS 좌표`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'GPS 좌표만 JSON 형식으로 반환하세요. 형식: {"lat": 숫자, "lng": 숫자}. 다른 텍스트는 포함하지 마세요.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0,
      })
    });

    const data = await response.json();
    const content = data.choices[0]?.message?.content;

    if (content) {
      const coords = JSON.parse(content.trim());

      if (coords.lat && coords.lng &&
        typeof coords.lat === 'number' &&
        typeof coords.lng === 'number') {
        return {
          lat: coords.lat,
          lng: coords.lng,
          address: `${title} (AI 추정)`,
          confidence: 'low',
          source: 'ai'
        };
      }
    }

    return null;
  } catch (error) {
    console.error('❌ AI geocoding failed:', error);
    return null;
  }
}

function getCityCenterCoordinates(destination: string): GeocodingResult {
  const coords = CITY_COORDINATES[destination] ||
    CITY_COORDINATES[destination.toLowerCase()] ||
    { lat: 0, lng: 0 };

  return {
    ...coords,
    address: `${destination} 중심`,
    confidence: 'low',
    source: 'fallback'
  };
}


export async function batchGeocode(
  places: Array<{ title: string; subtitle: string }>,
  destination: string
): Promise<Array<GeocodingResult>> {
  const results: GeocodingResult[] = [];

  for (const place of places) {
    const result = await smartGeocode(place.title, place.subtitle, destination);
    results.push(result);

    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return results;
}

export function clearGeocodeCache() {
  geocodeCache.clear();
}
