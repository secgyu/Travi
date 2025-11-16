import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient as createBrowserClient } from "@/utils/supabase/client";
import { createClient } from '@supabase/supabase-js';
import bcrypt from "bcryptjs";

// 서버용 Supabase 클라이언트 생성
function createServerSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const supabase = createBrowserClient();

        // Supabase DB에서 사용자 조회
        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .single();

        if (error || !user) {
          return null;
        }

        // 비밀번호가 없으면 (OAuth 사용자) 로그인 불가
        if (!user.password) {
          return null;
        }

        // 비밀번호 확인
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        // 사용자 정보 반환
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.avatar_url,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      // OAuth 로그인 시 Supabase DB에 사용자 저장
      if (account?.provider !== "credentials") {
        try {
          const supabase = createServerSupabaseClient();

          console.log("🔐 OAuth signIn callback triggered:", {
            provider: account?.provider,
            email: user.email,
            name: user.name,
            id: user.id,
          });

          // 기존 사용자 확인
          const { data: existingUser, error: selectError } = await supabase
            .from("users")
            .select("*")
            .eq("email", user.email)
            .single();

          console.log("🔍 Existing user check:", {
            exists: !!existingUser,
            email: user.email,
            selectError: selectError?.message,
          });

          if (!existingUser) {
            console.log("✨ Creating new user...");

            // 새 사용자 생성
            const { data: newUser, error: insertError } = await supabase
              .from("users")
              .insert({
                id: user.id,
                email: user.email,
                name: user.name,
                avatar_url: user.image,
                provider: account?.provider || 'oauth',
              })
              .select()
              .single();

            if (insertError) {
              console.error("❌ Failed to insert user:", {
                error: insertError,
                message: insertError.message,
                details: insertError.details,
                hint: insertError.hint,
              });
            } else {
              console.log("✅ New user created successfully:", {
                id: newUser?.id,
                email: newUser?.email,
              });
            }
          } else {
            console.log("👤 Existing user found, skipping insert");
          }
        } catch (error) {
          console.error("💥 Error in signIn callback:", error);
        }
      }

      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub!;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

