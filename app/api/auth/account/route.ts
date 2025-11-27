import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createClient } from "@/utils/supabase/server";

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "로그인이 필요합니다" }, { status: 401 });
    }

    const supabase = await createClient();

    await supabase.from("travel_plans").delete().eq("user_id", session.user.id);
    await supabase.from("saved_guides").delete().eq("user_id", session.user.id);
    await supabase.from("saved_cities").delete().eq("user_id", session.user.id);
    await supabase.from("chat_messages").delete().eq("user_id", session.user.id);

    const { error } = await supabase.from("users").delete().eq("id", session.user.id);

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true, message: "계정이 삭제되었습니다" });
  } catch {
    return NextResponse.json({ error: "계정 삭제에 실패했습니다" }, { status: 500 });
  }
}

