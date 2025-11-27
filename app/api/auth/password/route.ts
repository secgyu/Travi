import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createClient } from "@/utils/supabase/server";
import bcrypt from "bcryptjs";

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "로그인이 필요합니다" }, { status: 401 });
    }

    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "모든 필드를 입력해주세요" }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: "비밀번호는 최소 6자 이상이어야 합니다" }, { status: 400 });
    }

    const supabase = await createClient();

    const { data: user, error: fetchError } = await supabase
      .from("users")
      .select("password, provider")
      .eq("id", session.user.id)
      .single();

    if (fetchError || !user) {
      return NextResponse.json({ error: "사용자를 찾을 수 없습니다" }, { status: 404 });
    }

    if (user.provider !== "credentials") {
      return NextResponse.json(
        { error: "소셜 로그인 계정은 비밀번호를 변경할 수 없습니다" },
        { status: 400 }
      );
    }

    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "현재 비밀번호가 일치하지 않습니다" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const { error: updateError } = await supabase
      .from("users")
      .update({
        password: hashedPassword,
        updated_at: new Date().toISOString(),
      })
      .eq("id", session.user.id);

    if (updateError) {
      throw updateError;
    }
    return NextResponse.json({ success: true, message: "비밀번호가 변경되었습니다" });
  } catch {
    return NextResponse.json({ error: "서버 오류가 발생했습니다" }, { status: 500 });
  }
}

