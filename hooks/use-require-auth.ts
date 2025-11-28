"use client";

import { useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface RequireAuthOptions {
  callbackUrl?: string;
  message?: string;
  description?: string;
  showToast?: boolean;
}

interface UseRequireAuthReturn {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  requireAuth: (options?: RequireAuthOptions) => boolean;
  withAuth: <T>(callback: () => T, options?: RequireAuthOptions) => T | undefined;
}

export function useRequireAuth(): UseRequireAuthReturn {
  const { data: session, status } = useSession();
  const router = useRouter();

  const user = session?.user
    ? {
      id: (session.user as { id?: string }).id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    }
    : null;

  const isAuthenticated = !!session?.user;
  const isLoading = status === "loading";

  const requireAuth = useCallback(
    (options: RequireAuthOptions = {}): boolean => {
      const {
        callbackUrl,
        message = "로그인 필요",
        description = "이 기능은 로그인 후 이용 가능합니다.",
        showToast = true,
      } = options;

      if (isLoading) return false;

      if (!isAuthenticated) {
        if (showToast) {
          toast.error(message, { description });
        }

        const redirectUrl = callbackUrl ? `/login?callbackUrl=${encodeURIComponent(callbackUrl)}` : "/login";

        router.push(redirectUrl);
        return false;
      }

      return true;
    },
    [isAuthenticated, isLoading, router]
  );

  const withAuth = useCallback(
    <T>(callback: () => T, options: RequireAuthOptions = {}): T | undefined => {
      if (!requireAuth(options)) return undefined;
      return callback();
    },
    [requireAuth]
  );

  return {
    user,
    isAuthenticated,
    isLoading,
    requireAuth,
    withAuth,
  };
}

