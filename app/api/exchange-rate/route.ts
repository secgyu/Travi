import { NextResponse } from 'next/server';

interface ExchangeRateAPIResponse {
  result: string;
  base_code: string;
  conversion_rates: {
    KRW: number;
    USD: number;
    EUR: number;
    JPY: number;
    CNY: number;
  };
}

export async function GET() {
  try {
    // ExchangeRate-API 사용 (무료, API 키 불필요, 매일 업데이트)
    const response = await fetch('https://open.exchangerate-api.com/v6/latest', {
      next: { revalidate: 3600 }, // 1시간 캐시
    });

    if (!response.ok) {
      throw new Error('환율 정보를 가져오는데 실패했습니다');
    }

    const data = await response.json() as ExchangeRateAPIResponse;

    if (data.result !== 'success' || !data.conversion_rates) {
      throw new Error('환율 데이터를 사용할 수 없습니다');
    }

    // USD 기준 환율이므로 KRW로 변환
    const krwRate = data.conversion_rates.KRW;
    const usdRate = data.conversion_rates.USD;
    const eurRate = data.conversion_rates.EUR;
    const jpyRate = data.conversion_rates.JPY;
    const cnyRate = data.conversion_rates.CNY;

    // 1 KRW = ? 외화 로 계산
    const rates = {
      USD: usdRate / krwRate,
      EUR: eurRate / krwRate,
      JPY: jpyRate / krwRate,
      CNY: cnyRate / krwRate,
    };

    return NextResponse.json({
      success: true,
      rates,
      lastUpdate: new Date().toISOString(),
      source: 'ExchangeRate-API'
    });
  } catch (error) {
    // 에러 발생시 대체 환율 사용
    return NextResponse.json({
      success: true,
      rates: {
        USD: 0.00074,  // 약 1,350원
        EUR: 0.00068,  // 약 1,470원
        JPY: 0.1087,   // 약 9.2원 (100엔당 920원)
        CNY: 0.00104,  // 약 960원
      },
      lastUpdate: new Date().toISOString(),
      source: 'Fallback rates',
      error: error instanceof Error ? error.message : '환율 정보를 가져오는데 실패했습니다'
    });
  }
}

