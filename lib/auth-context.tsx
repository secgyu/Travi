"use client";

import { createContext, useContext, useEffect } from "react";
import { SessionProvider, useSession, signOut as nextAuthSignOut } from "next-auth/react";
import type { Session } from "next-auth";
import * as Sentry from "@sentry/nextjs";

type AuthContextType = {
  user: Session["user"] | null;
  session: Session | null;
  loading: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  signOut: async () => {},
});

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  // Sentry 사용자 컨텍스트 설정
  useEffect(() => {
    if (session?.user) {
      Sentry.setUser({
        id: session.user.id,
        email: session.user.email ?? undefined,
        username: session.user.name ?? undefined,
      });
    } else if (status === "unauthenticated") {
      Sentry.setUser(null);
    }
  }, [session, status]);

  const signOut = async () => {
    Sentry.setUser(null);
    await nextAuthSignOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <AuthContext.Provider
      value={{
        user: session?.user ?? null,
        session,
        loading,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthContextProvider>{children}</AuthContextProvider>
    </SessionProvider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth는 AuthProvider 내부에서 사용해야 합니다");
  }
  return context;
};
