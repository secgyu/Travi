import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const id = (await params).id;

    const { data: travelPlan, error } = await supabase
      .from("travel_plans")
      .select(`
        *,
            users (
      id,
      name,
      avatar_url,
      email
    )

      `)
      .eq("id", id)
      .single();
    if (error) {
      console.error("여행 계획 조회 실패:", error);
      return NextResponse.json(
        { error: "여행 계획을 찾을 수 없습니다" },
        { status: 404 }
      );
    }

    await supabase
      .from("travel_plans")
      .update({ views_count: (travelPlan.views_count || 0) + 1 })
      .eq("id", id);

    return NextResponse.json({
      success: true,
      data: travelPlan,
    });
  } catch (error) {
    console.error("여행 계획 조회 중 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;

    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "로그인이 필요합니다" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const body = await request.json();
    const { title, destination, start_date, end_date, budget, currency, travel_style, companions, status, itinerary, notes, is_public } = body;

    const { data: existingPlan, error: fetchError } = await supabase
      .from("travel_plans")
      .select("user_id")
      .eq("id", id)
      .single();

    if (fetchError || !existingPlan) {
      return NextResponse.json(
        { error: "여행 계획을 찾을 수 없습니다" },
        { status: 404 }
      );
    }

    if (existingPlan.user_id && existingPlan.user_id !== userId) {
      return NextResponse.json(
        { error: "수정 권한이 없습니다" },
        { status: 403 }
      );
    }

    const updateUserId = existingPlan.user_id ? undefined : userId;

    const { data: updatedPlan, error: updateError } = await supabase
      .from("travel_plans")
      .update({
        title,
        destination,
        start_date,
        end_date,
        budget,
        currency,
        travel_style,
        companions,
        status,
        itinerary,
        notes,
        is_public,
        updated_at: new Date().toISOString(),
        ...(updateUserId && { user_id: updateUserId }),
      })
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      console.error("여행 계획 업데이트 실패:", updateError);
      return NextResponse.json(
        { error: "여행 계획 업데이트에 실패했습니다" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedPlan,
    });
  } catch (error) {
    console.error("여행 계획 업데이트 중 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;

    // NextAuth 세션 확인
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "로그인이 필요합니다" },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const { data: existingPlan, error: fetchError } = await supabase
      .from("travel_plans")
      .select("user_id")
      .eq("id", id)
      .single();

    if (fetchError || !existingPlan) {
      return NextResponse.json(
        { error: "여행 계획을 찾을 수 없습니다" },
        { status: 404 }
      );
    }

    if (existingPlan.user_id !== userId) {
      return NextResponse.json(
        { error: "삭제 권한이 없습니다" },
        { status: 403 }
      );
    }

    const { error: deleteError } = await supabase
      .from("travel_plans")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("여행 계획 삭제 실패:", deleteError);
      return NextResponse.json(
        { error: "여행 계획 삭제에 실패했습니다" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "여행 계획이 삭제되었습니다",
    });
  } catch (error) {
    console.error("여행 계획 삭제 중 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}

