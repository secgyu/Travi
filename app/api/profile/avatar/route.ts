import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createClient } from "@supabase/supabase-js";

function createStorageClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "로그인이 필요합니다" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "파일이 필요합니다" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "JPG, PNG, WebP, GIF 파일만 업로드 가능합니다" },
        { status: 400 }
      );
    }

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "파일 크기는 2MB 이하여야 합니다" },
        { status: 400 }
      );
    }

    const supabase = createStorageClient();
    const fileExt = file.name.split(".").pop();
    const fileName = `${session.user.id}_${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from("profiles")
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("업로드 오류:", uploadError);
      return NextResponse.json(
        { error: "파일 업로드에 실패했습니다" },
        { status: 500 }
      );
    }

    const { data: urlData } = supabase.storage
      .from("profiles")
      .getPublicUrl(filePath);

    const avatarUrl = urlData.publicUrl;

    const { error: updateError } = await supabase
      .from("users")
      .update({
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      })
      .eq("id", session.user.id);

    if (updateError) {
      console.error("DB 업데이트 오류:", updateError);
      return NextResponse.json(
        { error: "프로필 업데이트에 실패했습니다" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      avatarUrl,
    });
  } catch (error) {
    console.error("아바타 업로드 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}

