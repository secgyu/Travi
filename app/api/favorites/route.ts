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

    const { data: guides } = await supabase
      .from("saved_guides")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    const { data: cities } = await supabase
      .from("saved_cities")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    return NextResponse.json({
      guides: guides || [],
      cities: cities || [],
    });
  } catch {
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "로그인이 필요합니다" }, { status: 401 });
    }

    const body = await request.json();
    const { type, slug, title, category } = body;

    if (!type || !slug || !title) {
      return NextResponse.json({ error: "필수 항목이 누락되었습니다" }, { status: 400 });
    }

    const supabase = await createClient();

    if (type === "guide") {
      const { data, error } = await supabase
        .from("saved_guides")
        .insert({
          user_id: session.user.id,
          guide_slug: slug,
          title,
          category: category || null,
        })
        .select()
        .single();

      if (error) {
        if (error.code === "23505") {
          return NextResponse.json({ error: "이미 즐겨찾기에 추가되어 있습니다" }, { status: 409 });
        }
        throw error;
      }
      return NextResponse.json({ success: true, data });
    } else if (type === "city") {
      const { data, error } = await supabase
        .from("saved_cities")
        .insert({
          user_id: session.user.id,
          city_slug: slug,
          city_name: title,
        })
        .select()
        .single();

      if (error) {
        if (error.code === "23505") {
          return NextResponse.json({ error: "이미 즐겨찾기에 추가되어 있습니다" }, { status: 409 });
        }
        throw error;
      }
      return NextResponse.json({ success: true, data });
    }
    return NextResponse.json({ error: "잘못된 타입입니다" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "로그인이 필요합니다" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const slug = searchParams.get("slug");

    if (!type || !slug) {
      return NextResponse.json({ error: "필수 항목이 누락되었습니다" }, { status: 400 });
    }

    const supabase = await createClient();

    if (type === "guide") {
      const { error } = await supabase
        .from("saved_guides")
        .delete()
        .eq("user_id", session.user.id)
        .eq("guide_slug", slug);

      if (error) throw error;
    } else if (type === "city") {
      const { error } = await supabase
        .from("saved_cities")
        .delete()
        .eq("user_id", session.user.id)
        .eq("city_slug", slug);

      if (error) throw error;
    } else {
      return NextResponse.json({ error: "잘못된 타입입니다" }, { status: 400 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}

