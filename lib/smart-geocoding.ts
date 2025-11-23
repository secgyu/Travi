/**
 * 스마트 Geocoding 시스템
 * AI가 제공한 장소명(한글 + 영어)을 실제 GPS 좌표로 변환
 */

interface GeocodingResult {
  lat: number;
  lng: number;
  address?: string;
  confidence: 'high' | 'medium' | 'low';
  source: 'google' | 'ai' | 'fallback';
}

// 도시별 중심 좌표 (폴백용)
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

// 간단한 메모리 캐시 (비용 절감)
const geocodeCache = new Map<string, GeocodingResult>();

/**
 * 스마트 Geocoding - 여러 전략을 시도하여 가장 정확한 좌표를 찾음
 */
export async function smartGeocode(
  title: string,           // 한글명: "시부야 스크램블 교차로"
  subtitle: string,        // 영어명: "Shibuya Scramble Crossing"
  destination: string      // 도시: "도쿄"
): Promise<GeocodingResult> {

  // 캐시 확인
  const cacheKey = `${title}|${subtitle}|${destination}`;
  if (geocodeCache.has(cacheKey)) {
    console.log(`✅ [Cache Hit] ${title}`);
    return geocodeCache.get(cacheKey)!;
  }

  console.log(`🔍 [Geocoding] ${title} (${subtitle}) in ${destination}`);

  // 전략 1: 영어명 + 도시 검색 (가장 정확)
  if (subtitle && subtitle.trim()) {
    const result1 = await tryGoogleGeocode(`${subtitle}, ${destination}`);
    if (result1 && result1.confidence === 'high') {
      console.log(`✅ [Strategy 1] High confidence: ${subtitle}, ${destination}`);
      geocodeCache.set(cacheKey, result1);
      return result1;
    }
  }

  // 전략 2: 영어명만 (도시 정보는 암묵적)
  if (subtitle && subtitle.trim()) {
    const result2 = await tryGoogleGeocode(subtitle);
    if (result2 && result2.confidence === 'high') {
      console.log(`✅ [Strategy 2] High confidence: ${subtitle}`);
      geocodeCache.set(cacheKey, result2);
      return result2;
    }
  }

  // 전략 3: 한글명 + 도시 검색
  const result3 = await tryGoogleGeocode(`${title}, ${destination}`);
  if (result3 && result3.confidence !== 'low') {
    console.log(`✅ [Strategy 3] Medium confidence: ${title}, ${destination}`);
    geocodeCache.set(cacheKey, result3);
    return result3;
  }

  // 전략 4: AI에게 좌표 물어보기 (마지막 수단)
  if (process.env.OPENAI_API_KEY) {
    const aiResult = await askAIForCoordinates(title, subtitle, destination);
    if (aiResult) {
      console.log(`✅ [Strategy 4] AI fallback: ${title}`);
      geocodeCache.set(cacheKey, aiResult);
      return aiResult;
    }
  }

  // 전략 5: 도시 중심 좌표 반환
  console.log(`⚠️ [Strategy 5] City center fallback: ${destination}`);
  const fallback = getCityCenterCoordinates(destination);
  geocodeCache.set(cacheKey, fallback);
  return fallback;
}

/**
 * Google Geocoding API로 좌표 조회
 */
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

      // 결과 신뢰도 판단
      let confidence: 'high' | 'medium' | 'low' = 'low';

      // 1. 정확한 장소 (point of interest, establishment) → high
      if (result.types.includes('point_of_interest') ||
        result.types.includes('establishment') ||
        result.types.includes('tourist_attraction') ||
        result.types.includes('restaurant') ||
        result.types.includes('store')) {
        confidence = 'high';
      }
      // 2. 거리/구역 수준 → medium
      else if (result.types.includes('route') ||
        result.types.includes('sublocality') ||
        result.types.includes('neighborhood')) {
        confidence = 'medium';
      }
      // 3. 도시/국가 수준 → low
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

    if (data.status === 'ZERO_RESULTS') {
      console.log(`ℹ️ No results for: ${query}`);
    } else if (data.status !== 'OK') {
      console.error(`❌ Geocoding API error: ${data.status}`, data.error_message);
    }

    return null;
  } catch (error) {
    console.error('❌ Geocoding request failed:', error);
    return null;
  }
}

/**
 * AI에게 좌표 물어보기 (Google API 실패 시 백업)
 */
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
      // JSON 파싱 시도
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

/**
 * 도시 중심 좌표 반환 (최종 폴백)
 */
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

/**
 * 여러 장소를 배치로 geocode
 */
export async function batchGeocode(
  places: Array<{ title: string; subtitle: string }>,
  destination: string
): Promise<Array<GeocodingResult>> {
  console.log(`🔄 Batch geocoding ${places.length} places in ${destination}`);

  // 순차 처리 (API rate limit 방지)
  const results: GeocodingResult[] = [];

  for (const place of places) {
    const result = await smartGeocode(place.title, place.subtitle, destination);
    results.push(result);

    // API rate limit 방지를 위한 짧은 딜레이
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return results;
}

/**
 * 캐시 정리
 */
export function clearGeocodeCache() {
  geocodeCache.clear();
  console.log('🗑️ Geocode cache cleared');
}


