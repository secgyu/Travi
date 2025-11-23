import { NextResponse } from 'next/server';
import { smartGeocode, batchGeocode } from '@/lib/smart-geocoding';

export const maxDuration = 30;

/**
 * 단일 장소 Geocoding
 * POST /api/geocode
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, subtitle, destination } = body;

    if (!title || !destination) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'title과 destination은 필수입니다' 
        },
        { status: 400 }
      );
    }

    const result = await smartGeocode(
      title,
      subtitle || '',
      destination
    );

    // 신뢰도에 따른 메시지
    let message = '';
    switch (result.confidence) {
      case 'high':
        message = '정확한 위치를 찾았습니다';
        break;
      case 'medium':
        message = '근처 위치입니다';
        break;
      case 'low':
        message = '대략적인 위치입니다 (수동 조정 권장)';
        break;
    }

    return NextResponse.json({
      success: true,
      data: result,
      message,
    });
  } catch (error) {
    console.error('Geocoding API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Geocoding 실패' 
      },
      { status: 500 }
    );
  }
}

/**
 * 배치 Geocoding
 * POST /api/geocode/batch
 */
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { places, destination } = body;

    if (!places || !Array.isArray(places) || !destination) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'places(배열)와 destination은 필수입니다' 
        },
        { status: 400 }
      );
    }

    const results = await batchGeocode(places, destination);

    // 통계 정보
    const stats = {
      total: results.length,
      high: results.filter(r => r.confidence === 'high').length,
      medium: results.filter(r => r.confidence === 'medium').length,
      low: results.filter(r => r.confidence === 'low').length,
    };

    return NextResponse.json({
      success: true,
      data: results,
      stats,
      message: `${stats.high}개 정확, ${stats.medium}개 근사, ${stats.low}개 추정`,
    });
  } catch (error) {
    console.error('Batch geocoding API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Batch geocoding 실패' 
      },
      { status: 500 }
    );
  }
}


