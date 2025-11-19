import { NextResponse } from 'next/server';

interface ExchangeRateItem {
  result: number;
  cur_unit: string;
  ttb: string;
  tts: string;
  deal_bas_r: string;
  bkpr: string;
  yy_efee_r: string;
  ten_dd_efee_r: string;
  kftc_bkpr: string;
  kftc_deal_bas_r: string;
  cur_nm: string;
}

interface ExchangeRates {
  USD: number | null;
  EUR: number | null;
  JPY: number | null;
  CNY: number | null;
}

export async function GET() {
  try {
    const apiKey = process.env.KOREAEXIM_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API 키가 설정되지 않았습니다' },
        { status: 500 }
      );
    }

    const koreaEximbankUrl = `https://www.koreaexim.go.kr/site/program/financial/exchangeJSON?authkey=${apiKey}&data=AP01`;

    const response = await fetch(koreaEximbankUrl, {
      next: { revalidate: 1800 },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('환율 정보를 가져오는데 실패했습니다');
    }

    const data = await response.json() as ExchangeRateItem[];

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('환율 데이터를 사용할 수 없습니다');
    }

    const findRate = (currencyCode: string): number | null => {
      const currency = data.find((item) => item.cur_unit === currencyCode);
      if (!currency || !currency.deal_bas_r) return null;

      const rate = parseFloat(currency.deal_bas_r.replace(/,/g, ''));
      return 1 / rate;
    };

    const jpyData = data.find((item) => item.cur_unit === 'JPY(100)');
    const jpyRate = jpyData ? parseFloat(jpyData.deal_bas_r.replace(/,/g, '')) / 100 : null;

    const rates: ExchangeRates = {
      USD: findRate('USD'),
      EUR: findRate('EUR'),
      JPY: jpyRate ? 1 / jpyRate : null,
      CNY: findRate('CNY'),
    };

    if (!rates.USD) {
      throw new Error('USD 환율 정보를 찾을 수 없습니다');
    }

    return NextResponse.json({
      success: true,
      rates: {
        USD: rates.USD,
        EUR: rates.EUR || 0.00063,
        JPY: rates.JPY || 0.0067,
        CNY: rates.CNY || 0.0053,
      },
      lastUpdate: new Date().toISOString(),
      source: 'Korea Eximbank'
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : '환율 정보를 가져오는데 실패했습니다'
      },
      { status: 500 }
    );
  }
}

