"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Mail, Lock, LogIn } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast.error("로그인 실패", {
          description:
            error.message === "Invalid login credentials" ? "이메일 또는 비밀번호가 올바르지 않습니다" : error.message,
        });
        return;
      }

      toast.success("로그인 성공", {
        description: "트래비에 오신 것을 환영합니다!",
      });

      // 로그인 성공 후 마이페이지로 이동
      router.push("/my");
      router.refresh();
    } catch (error) {
      toast.error("오류 발생", {
        description: "로그인 중 오류가 발생했습니다. 다시 시도해주세요.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "kakao") => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast.error(`${provider} 로그인 실패`, {
          description: error.message,
        });
      }
    } catch {
      toast.error("오류 발생", {
        description: "소셜 로그인 중 오류가 발생했습니다.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/20 via-background to-background">
      <Header />

      <main className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">로그인</CardTitle>
            <CardDescription>트래비 계정으로 로그인하세요</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* 소셜 로그인 */}
            <div className="space-y-3">
              {/* <Button
                type="button"
                variant="outline"
                className="w-full h-11 bg-transparent"
                onClick={() => handleSocialLogin("kakao")}
              >
                <div className="flex items-center justify-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded bg-[#FEE500]">
                    <span className="text-xs font-bold text-[#000000]">K</span>
                  </div>
                  <span>카카오로 시작하기</span>
                </div>
              </Button> */}

              <Button
                type="button"
                variant="outline"
                className="w-full h-11 bg-transparent"
                onClick={() => handleSocialLogin("google")}
              >
                <div className="flex items-center justify-center gap-3">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>구글로 시작하기</span>
                </div>
              </Button>
            </div>

            {/* 구분선 */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">또는</span>
              </div>
            </div>

            {/* 이메일 로그인 폼 */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">비밀번호</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                  />
                  <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                    로그인 유지
                  </Label>
                </div>
                <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                  비밀번호 찾기
                </Link>
              </div>

              <Button type="submit" className="w-full h-11 gap-2" disabled={isLoading}>
                {isLoading ? (
                  "로그인 중..."
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />
                    로그인
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex-col gap-4">
            <div className="text-center text-sm text-muted-foreground">
              아직 계정이 없으신가요?{" "}
              <Link href="/signup" className="font-medium text-primary hover:underline">
                회원가입
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>

      <Footer />
    </div>
  );
}
