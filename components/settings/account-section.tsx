"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function AccountSection() {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const handlePasswordChange = async () => {
    if (!passwords.current || !passwords.new) {
      toast.error("입력 오류", { description: "모든 비밀번호 필드를 입력해주세요." });
      return;
    }

    if (passwords.new !== passwords.confirm) {
      toast.error("입력 오류", { description: "새 비밀번호가 일치하지 않습니다." });
      return;
    }

    if (passwords.new.length < 6) {
      toast.error("입력 오류", { description: "비밀번호는 최소 6자 이상이어야 합니다." });
      return;
    }

    setIsChangingPassword(true);
    try {
      const response = await fetch("/api/auth/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: passwords.current,
          newPassword: passwords.new,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "비밀번호 변경 실패");
      }

      toast.success("변경 완료", { description: "비밀번호가 성공적으로 변경되었습니다." });
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (error) {
      toast.error("변경 실패", {
        description: error instanceof Error ? error.message : "비밀번호 변경에 실패했습니다.",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleAccountDelete = async () => {
    const confirmed = window.confirm(
      "정말로 계정을 삭제하시겠습니까?\n\n모든 여행 계획, 즐겨찾기 등 데이터가 영구적으로 삭제됩니다.\n이 작업은 되돌릴 수 없습니다."
    );

    if (!confirmed) return;

    const doubleConfirmed = window.confirm("마지막 확인입니다. 정말 삭제하시겠습니까?");

    if (!doubleConfirmed) return;

    setIsDeletingAccount(true);
    try {
      const response = await fetch("/api/auth/account", {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "계정 삭제 실패");
      }

      toast.success("계정 삭제 완료", { description: "그동안 이용해주셔서 감사합니다." });

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (error) {
      toast.error("삭제 실패", {
        description: error instanceof Error ? error.message : "계정 삭제에 실패했습니다.",
      });
      setIsDeletingAccount(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>비밀번호 변경</CardTitle>
          <CardDescription>계정 보안을 위해 주기적으로 비밀번호를 변경하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">현재 비밀번호</Label>
            <Input
              id="currentPassword"
              type="password"
              value={passwords.current}
              onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">새 비밀번호</Label>
            <Input
              id="newPassword"
              type="password"
              value={passwords.new}
              onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={passwords.confirm}
              onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
            />
          </div>

          <Button onClick={handlePasswordChange} disabled={isChangingPassword} className="gap-2">
            {isChangingPassword && <Loader2 className="h-4 w-4 animate-spin" />}
            비밀번호 변경
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>소셜 계정 연동</CardTitle>
          <CardDescription>간편 로그인을 위해 소셜 계정을 연동하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FEE500]">
                <span className="font-bold text-[#000000]">K</span>
              </div>
              <div>
                <p className="font-medium text-foreground">카카오</p>
                <p className="text-sm text-muted-foreground">준비 중</p>
              </div>
            </div>
            <Button variant="outline" size="sm" disabled>
              연결
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#03C75A]">
                <span className="font-bold text-white">N</span>
              </div>
              <div>
                <p className="font-medium text-foreground">네이버</p>
                <p className="text-sm text-muted-foreground">준비 중</p>
              </div>
            </div>
            <Button variant="outline" size="sm" disabled>
              연결
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border">
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
              </div>
              <div>
                <p className="font-medium text-foreground">구글</p>
                <p className="text-sm text-muted-foreground">준비 중</p>
              </div>
            </div>
            <Button variant="outline" size="sm" disabled>
              연결
            </Button>
          </div>

          <p className="text-xs text-muted-foreground">소셜 계정 연동 기능은 곧 제공될 예정입니다.</p>
        </CardContent>
      </Card>

      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">계정 삭제</CardTitle>
          <CardDescription>
            계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={handleAccountDelete} disabled={isDeletingAccount} className="gap-2">
            {isDeletingAccount ? <Loader2 className="h-4 w-4 animate-spin" /> : <AlertTriangle className="h-4 w-4" />}
            계정 삭제
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
