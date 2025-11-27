"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Camera, Save, AlertTriangle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notifications, setNotifications] = useState({
    emailMarketing: true,
    emailUpdates: true,
    pushNotifications: false,
  });

  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    if (user) {
      fetchUserProfile();
    }
  }, [user, loading, router]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("/api/profile");
      if (response.ok) {
        const data = await response.json();
        if (data.user) {
          setProfileData((prev) => ({
            ...prev,
            name: data.user.name || user?.email?.split("@")[0] || "",
            email: data.user.email || user?.email || "",
          }));
          if (data.user.preferences?.notifications) {
            setNotifications(data.user.preferences.notifications);
          }
        }
      }
    } catch {
      setProfileData((prev) => ({
        ...prev,
        name: user?.name || user?.email?.split("@")[0] || "",
        email: user?.email || "",
      }));
    }
  };

  const handleProfileSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: profileData.name }),
      });

      if (!response.ok) throw new Error("프로필 저장 실패");

      toast({ title: "저장 완료", description: "프로필이 성공적으로 저장되었습니다." });
    } catch {
      toast({ title: "저장 실패", description: "프로필 저장에 실패했습니다." });
    } finally {
      setIsSaving(false);
    }
  };

  const handleNotificationsSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          preferences: { notifications },
        }),
      });

      if (!response.ok) throw new Error("알림 설정 저장 실패");

      toast({ title: "저장 완료", description: "알림 설정이 저장되었습니다." });
    } catch {
      toast({ title: "저장 실패", description: "알림 설정 저장에 실패했습니다." });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!profileData.currentPassword || !profileData.newPassword) {
      toast({ title: "입력 오류", description: "모든 비밀번호 필드를 입력해주세요." });
      return;
    }

    if (profileData.newPassword !== profileData.confirmPassword) {
      toast({ title: "입력 오류", description: "새 비밀번호가 일치하지 않습니다." });
      return;
    }

    if (profileData.newPassword.length < 6) {
      toast({ title: "입력 오류", description: "비밀번호는 최소 6자 이상이어야 합니다." });
      return;
    }

    setIsChangingPassword(true);
    try {
      const response = await fetch("/api/auth/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: profileData.currentPassword,
          newPassword: profileData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "비밀번호 변경 실패");
      }

      toast({ title: "변경 완료", description: "비밀번호가 성공적으로 변경되었습니다." });
      setProfileData({
        ...profileData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast({
        title: "변경 실패",
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

      toast({ title: "계정 삭제 완료", description: "그동안 이용해주셔서 감사합니다." });

      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (error) {
      toast({
        title: "삭제 실패",
        description: error instanceof Error ? error.message : "계정 삭제에 실패했습니다.",
      });
      setIsDeletingAccount(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-accent/20 via-background to-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-muted-foreground">로딩 중...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/20 via-background to-background">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <Button variant="ghost" size="sm" className="mb-6 gap-2" asChild>
            <Link href="/my">
              <ArrowLeft className="h-4 w-4" />
              마이페이지로 돌아가기
            </Link>
          </Button>

          <h1 className="mb-8 text-3xl font-bold text-foreground">설정</h1>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-6 grid w-full grid-cols-3">
              <TabsTrigger value="profile">프로필</TabsTrigger>
              <TabsTrigger value="account">계정</TabsTrigger>
              <TabsTrigger value="notifications">알림</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>프로필 정보</CardTitle>
                  <CardDescription>공개 프로필 정보를 수정하세요</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user?.image || "/user-avatar.jpg"} alt="프로필 사진" />
                      <AvatarFallback>{profileData.name?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                        <Camera className="h-4 w-4" />
                        사진 변경
                      </Button>
                      <p className="mt-2 text-xs text-muted-foreground">JPG, PNG 파일 (최대 2MB)</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="name">이름</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">이메일</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">이메일 변경 시 인증이 필요합니다</p>
                  </div>

                  <Button onClick={handleProfileSave} disabled={isSaving} className="gap-2">
                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    저장
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="space-y-6">
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
                      value={profileData.currentPassword}
                      onChange={(e) => setProfileData({ ...profileData, currentPassword: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">새 비밀번호</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={profileData.newPassword}
                      onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={profileData.confirmPassword}
                      onChange={(e) => setProfileData({ ...profileData, confirmPassword: e.target.value })}
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
                  <Button
                    variant="destructive"
                    onClick={handleAccountDelete}
                    disabled={isDeletingAccount}
                    className="gap-2"
                  >
                    {isDeletingAccount ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <AlertTriangle className="h-4 w-4" />
                    )}
                    계정 삭제
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>알림 설정</CardTitle>
                  <CardDescription>받고 싶은 알림을 선택하세요</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailMarketing">이메일 마케팅</Label>
                      <p className="text-sm text-muted-foreground">프로모션 및 새 기능 안내</p>
                    </div>
                    <Switch
                      id="emailMarketing"
                      checked={notifications.emailMarketing}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailMarketing: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailUpdates">이메일 업데이트</Label>
                      <p className="text-sm text-muted-foreground">여행 계획 변경 및 중요 공지</p>
                    </div>
                    <Switch
                      id="emailUpdates"
                      checked={notifications.emailUpdates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailUpdates: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="pushNotifications">푸시 알림</Label>
                      <p className="text-sm text-muted-foreground">실시간 알림 (브라우저 권한 필요)</p>
                    </div>
                    <Switch
                      id="pushNotifications"
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                    />
                  </div>

                  <Button onClick={handleNotificationsSave} disabled={isSaving} className="gap-2">
                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    알림 설정 저장
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
