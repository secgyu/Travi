import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createClient } from "@/utils/supabase/client";
import { randomUUID } from "crypto";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "이메일과 비밀번호를 입력해주세요" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "비밀번호는 최소 6자 이상이어야 합니다" },
        { status: 400 }
      );
    }

    const supabase = createClient();

    const { data: existingUser } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: "이미 사용 중인 이메일입니다" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = randomUUID();
    const { error: insertError } = await supabase.from("users").insert({
      id: userId,
      email,
      name: name || email.split("@")[0],
      password: hashedPassword,
      provider: "credentials",
    });

    if (insertError) {
      return NextResponse.json(
        { error: "회원가입에 실패했습니다" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "회원가입이 완료되었습니다", userId },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}

