import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const session = await getServerSession(authOptions);
    const user = session?.user;
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

    if (!title || !destination || !start_date || !end_date || !itinerary) {
      return NextResponse.json(
        { error: "필수 필드가 누락되었습니다" },
        { status: 400 }
      );
    }

    let userId = user?.id;

    if (user?.email) {
      const { data: dbUser } = await supabase
        .from("users")
        .select("id")
        .eq("email", user.email)
        .single();

      if (dbUser) {
        userId = dbUser.id;
      } else {
        const { data: newUser, error: createError } = await supabase
          .from("users")
          .insert({
            email: user.email,
            name: user.name || user.email.split("@")[0],
            provider: "nextauth",
            avatar_url: user.image,
          })
          .select()
          .single();

        if (!createError) {
          userId = newUser.id;
        }
      }
    }

    if (!userId) {
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
          return NextResponse.json(
            { error: "사용자 생성에 실패했습니다" },
            { status: 500 }
          );
        }
        userId = newGuestUser.id;
      }
    }

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
      return NextResponse.json(
        { error: "여행 계획 생성에 실패했습니다" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: travelPlan,
    });
  } catch {
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
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
