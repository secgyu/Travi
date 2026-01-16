import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("env utilities", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = {
      ...originalEnv,
      NEXT_PUBLIC_SUPABASE_URL: "https://test.supabase.co",
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: "test-key",
      NEXTAUTH_URL: "http://localhost:3000",
      NEXTAUTH_SECRET: "test-secret",
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe("getEnv", () => {
    it("환경 변수 객체를 반환해야 함", async () => {
      const { getEnv } = await import("@/lib/env");
      const env = getEnv();
      expect(env.NEXTAUTH_URL).toBe("http://localhost:3000");
      expect(env.NEXT_PUBLIC_SUPABASE_URL).toBe("https://test.supabase.co");
    });

    it("필수 환경 변수가 포함되어야 함", async () => {
      const { getEnv } = await import("@/lib/env");
      const env = getEnv();
      expect(env).toHaveProperty("NEXT_PUBLIC_SUPABASE_URL");
      expect(env).toHaveProperty("NEXTAUTH_SECRET");
    });
  });

  describe("hasEnv", () => {
    it("환경 변수가 존재하면 true를 반환해야 함", async () => {
      process.env.GOOGLE_CLIENT_ID = "google-id";
      const { hasEnv } = await import("@/lib/env");
      expect(hasEnv("GOOGLE_CLIENT_ID")).toBe(true);
    });

    it("환경 변수가 없으면 false를 반환해야 함", async () => {
      delete process.env.GOOGLE_CLIENT_ID;
      const { hasEnv } = await import("@/lib/env");
      expect(hasEnv("GOOGLE_CLIENT_ID")).toBe(false);
    });

    it("빈 문자열도 false를 반환해야 함", async () => {
      process.env.GOOGLE_CLIENT_ID = "";
      const { hasEnv } = await import("@/lib/env");
      expect(hasEnv("GOOGLE_CLIENT_ID")).toBe(false);
    });
  });

  describe("isOAuthEnabled", () => {
    it("Google OAuth 설정이 있으면 true를 반환해야 함", async () => {
      process.env.GOOGLE_CLIENT_ID = "google-id";
      process.env.GOOGLE_CLIENT_SECRET = "google-secret";
      const { isOAuthEnabled } = await import("@/lib/env");
      expect(isOAuthEnabled("google")).toBe(true);
    });

    it("Google OAuth 설정이 없으면 false를 반환해야 함", async () => {
      delete process.env.GOOGLE_CLIENT_ID;
      delete process.env.GOOGLE_CLIENT_SECRET;
      const { isOAuthEnabled } = await import("@/lib/env");
      expect(isOAuthEnabled("google")).toBe(false);
    });

    it("Kakao OAuth 설정 확인", async () => {
      process.env.KAKAO_CLIENT_ID = "kakao-id";
      process.env.KAKAO_CLIENT_SECRET = "kakao-secret";
      const { isOAuthEnabled } = await import("@/lib/env");
      expect(isOAuthEnabled("kakao")).toBe(true);
    });
  });
});
