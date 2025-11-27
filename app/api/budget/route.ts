import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "로그인이 필요합니다" }, { status: 401 });
    }

    const supabase = await createClient();

    const { data: user, error } = await supabase
      .from("users")
      .select("preferences")
      .eq("id", session.user.id)
      .single();

    if (error) {
      throw error;
    }

    const budgetData = user?.preferences?.budget || {
      totalBudget: 0,
      currency: "KRW",
      items: [],
    };

    return NextResponse.json({ success: true, data: budgetData });
  } catch {
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "로그인이 필요합니다" }, { status: 401 });
    }

    const body = await request.json();
    const { totalBudget, currency, items } = body;

    const supabase = await createClient();

    const { data: user } = await supabase
      .from("users")
      .select("preferences")
      .eq("id", session.user.id)
      .single();

    const currentPreferences = user?.preferences || {};

    const { error } = await supabase
      .from("users")
      .update({
        preferences: {
          ...currentPreferences,
          budget: {
            totalBudget,
            currency,
            items: items.map((item: { id: string; category: string; amount: number; color: string }) => ({
              id: item.id,
              category: item.category,
              amount: item.amount,
              color: item.color,
            })),
            updatedAt: new Date().toISOString(),
          },
        },
        updated_at: new Date().toISOString(),
      })
      .eq("id", session.user.id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}

