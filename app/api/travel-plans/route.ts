import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    
    // 인증 확인 (선택사항 - 비로그인 사용자도 생성 가능하게)
    const { data: { user } } = await supabase.auth.getUser();
    
    const body = await request.json();
    const {
      title,
      destination,
      start_date,
      end_date,
      budget,
      currency = "KRW",
      travel_style,
      companions,
      itinerary,
      notes,
      is_public = true,
    } = body;

    // 필수 필드 검증
    if (!title || !destination || !start_date || !end_date || !itinerary) {
      return NextResponse.json(
        { error: "필수 필드가 누락되었습니다" },
        { status: 400 }
      );
    }

    // 비로그인 사용자를 위한 guest 사용자 처리
    let userId = user?.id;
    
    if (!userId) {
      // Guest 사용자 생성 또는 조회
      const { data: guestUser } = await supabase
        .from("users")
        .select()
        .eq("email", "guest@travi.kr")
        .single();

      if (guestUser) {
        userId = guestUser.id;
      } else {
        const { data: newGuestUser, error: guestError } = await supabase
          .from("users")
          .insert({
            email: "guest@travi.kr",
            name: "게스트 사용자",
            provider: "guest",
            bio: "AI 채팅으로 생성된 여행 계획",
          })
          .select()
          .single();

        if (guestError) {
          console.error("게스트 사용자 생성 실패:", guestError);
          return NextResponse.json(
            { error: "사용자 생성에 실패했습니다" },
            { status: 500 }
          );
        }
        userId = newGuestUser.id;
      }
    }

    // 여행 계획 생성
    const { data: travelPlan, error: insertError } = await supabase
      .from("travel_plans")
      .insert({
        user_id: userId,
        title,
        destination,
        start_date,
        end_date,
        budget,
        currency,
        travel_style,
        companions,
        status: "planning",
        itinerary,
        notes,
        is_public,
        likes_count: 0,
        views_count: 0,
      })
      .select()
      .single();

    if (insertError) {
      console.error("여행 계획 생성 실패:", insertError);
      return NextResponse.json(
        { error: "여행 계획 생성에 실패했습니다" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: travelPlan,
    });
  } catch (error) {
    console.error("여행 계획 생성 중 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");
    const userId = searchParams.get("user_id");
    const isPublic = searchParams.get("is_public");

    let query = supabase
      .from("travel_plans")
      .select(`
        *,
        users (
          id,
          name,
          avatar_url
        )
      `, { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (userId) {
      query = query.eq("user_id", userId);
    }

    if (isPublic !== null) {
      query = query.eq("is_public", isPublic === "true");
    }

    const { data: travelPlans, error, count } = await query;

    if (error) {
      console.error("여행 계획 목록 조회 실패:", error);
      return NextResponse.json(
        { error: "여행 계획 목록을 불러올 수 없습니다" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: travelPlans,
      total: count,
      limit,
      offset,
    });
  } catch (error) {
    console.error("여행 계획 목록 조회 중 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}

