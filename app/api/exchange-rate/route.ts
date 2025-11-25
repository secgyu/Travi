import { NextResponse } from 'next/server';

interface ExchangeRateResponse {
  result: string;
  base_code: string;
  rates: {
    USD: number;
    EUR: number;
    JPY: number;
    CNY: number;
    KRW: number;
    [key: string]: number;
  };
}

export async function GET() {
  const response = await fetch(
    'https://open.er-api.com/v6/latest/KRW',
    { next: { revalidate: 3600 } }
  );

  if (!response.ok) {
    return NextResponse.json(
      { success: false, error: `API 오류: ${response.status}` },
      { status: 500 }
    );
  }

  const data: ExchangeRateResponse = await response.json();

  if (data.result !== 'success') {
    return NextResponse.json(
      { success: false, error: '환율 데이터 조회 실패' },
      { status: 500 }
    );
  }

  const rates = data.rates;

  return NextResponse.json({
    success: true,
    rates: {
      USD: rates.USD,
      EUR: rates.EUR,
      JPY: rates.JPY,
      CNY: rates.CNY,
    },
    lastUpdate: new Date().toISOString(),
    source: 'ExchangeRate-API',
  });
}
