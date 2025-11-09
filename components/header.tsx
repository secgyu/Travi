"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, LogOut } from "lucide-react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export function Header() {
  const [open, setOpen] = useState(false);
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  const mainNavLinks = [
    { href: "/explore", label: "여행지 둘러보기" },
    { href: "/budget", label: "예산 계산기" },
    { href: "/guide", label: "여행 가이드" },
  ];

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-6">
        <div className="flex h-16 items-center justify-between max-w-full">
          {/* Left: Logo */}
          <Link href="/" className="transition-opacity hover:opacity-80 flex-shrink-0">
            <Logo variant="full" size="md" />
          </Link>

          {/* Right: Desktop Navigation + Buttons */}
          <div className="hidden lg:flex items-center gap-6">
            <nav className="flex items-center gap-6">
              {mainNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-foreground transition-colors hover:text-primary whitespace-nowrap"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              {loading ? (
                <div className="h-8 w-32 animate-pulse bg-accent rounded" />
              ) : user ? (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/my">마이페이지</Link>
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-1" />
                    로그아웃
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/login">로그인</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/signup">회원가입</Link>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Right: Mobile Hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">메뉴 열기</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 mt-8 px-4">
                <div className="flex flex-col gap-4">
                  {mainNavLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-lg font-medium text-foreground transition-colors hover:text-primary px-2 py-2 rounded-md hover:bg-accent"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col gap-3 pt-6 border-t">
                  {loading ? (
                    <div className="h-11 animate-pulse bg-accent rounded" />
                  ) : user ? (
                    <>
                      <Button variant="outline" size="lg" asChild>
                        <Link href="/my" onClick={() => setOpen(false)}>
                          마이페이지
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => {
                          handleSignOut();
                          setOpen(false);
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        로그아웃
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" size="lg" asChild>
                        <Link href="/login" onClick={() => setOpen(false)}>
                          로그인
                        </Link>
                      </Button>
                      <Button size="lg" asChild>
                        <Link href="/signup" onClick={() => setOpen(false)}>
                          회원가입
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
