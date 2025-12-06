import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import { createClient as createBrowserClient } from "@/utils/supabase/client";
import { createClient } from '@supabase/supabase-js';
import bcrypt from "bcryptjs";

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

        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials.email)
          .single();

        if (error || !user) {
          return null;
        }

        if (!user.password) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

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
      if (account?.provider !== "credentials") {
        try {
          const supabase = createServerSupabaseClient();

          const { data: existingUser } = await supabase
            .from("users")
            .select("*")
            .eq("email", user.email)
            .maybeSingle();

          if (!existingUser) {
            const { data: newUser, error: insertError } = await supabase
              .from("users")
              .insert({
                email: user.email,
                name: user.name,
                avatar_url: user.image,
                provider: account?.provider || 'oauth',
              })
              .select()
              .single();

            if (insertError) {
              return false;
            }
            user.id = newUser!.id;
          } else {
            user.id = existingUser.id;
          }
        } catch {
          return false;
        }
      }

      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.userId = user.id;
        token.email = user.email as string;
        token.name = user.name as string;
        token.picture = user.image as string;
      }
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

