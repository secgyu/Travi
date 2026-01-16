import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createServiceClient } from "@/utils/supabase/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다" },
        { status: 401 }
      );
    }

    const supabase = createServiceClient();

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", session.user.id)
      .single();

    if (error) {
      return NextResponse.json(
        { error: "프로필을 찾을 수 없습니다" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "인증되지 않은 사용자입니다" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, bio, preferences } = body;

    const supabase = createServiceClient();

    interface UserUpdateData {
      updated_at: string;
      name?: string;
      bio?: string;
      preferences?: Record<string, unknown>;
    }

    const updateData: UserUpdateData = {
      updated_at: new Date().toISOString(),
    };

    if (name !== undefined) updateData.name = name;
    if (bio !== undefined) updateData.bio = bio;
    if (preferences !== undefined) updateData.preferences = preferences;

    const { data: updatedUser, error } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", session.user.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: "프로필 업데이트에 실패했습니다" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      user: updatedUser
    });
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}

