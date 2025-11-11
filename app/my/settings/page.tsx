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
import { ArrowLeft, Camera, Save, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // 사용자 데이터 로드
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
      return;
    }

    if (user) {
      setProfileData((prev) => ({
        ...prev,
        name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "",
        email: user.email || "",
      }));
    }
  }, [user, loading, router]);

  const [notifications, setNotifications] = useState({
    emailMarketing: true,
    emailUpdates: true,
    pushNotifications: false,
  });

  const handleProfileSave = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        email: profileData.email,
        data: {
          full_name: profileData.name,
        },
      });

      if (error) throw error;

      alert("프로필이 성공적으로 저장되었습니다!");
    } catch (error) {
      console.error("프로필 저장 오류:", error);
      alert("프로필 저장에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handlePasswordChange = async () => {
    if (profileData.newPassword !== profileData.confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다");
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: profileData.newPassword,
      });

      if (error) throw error;

      alert("비밀번호가 성공적으로 변경되었습니다!");
      setProfileData({
        ...profileData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("비밀번호 변경 오류:", error);
      alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleAccountDelete = async () => {
    if (confirm("정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.")) {
      try {
        alert("계정 삭제는 고객센터로 문의해주세요.");
        // TODO: 서버 API 엔드포인트를 통한 계정 삭제 구현
      } catch (error) {
        console.error("계정 삭제 오류:", error);
        alert("계정 삭제에 실패했습니다. 고객센터로 문의해주세요.");
      }
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
          {/* 뒤로가기 버튼 */}
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

            {/* 프로필 탭 */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>프로필 정보</CardTitle>
                  <CardDescription>공개 프로필 정보를 수정하세요</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 프로필 사진 */}
                  <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user?.user_metadata?.avatar_url || "/user-avatar.jpg"} alt="프로필 사진" />
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

                  {/* 이름 */}
                  <div className="space-y-2">
                    <Label htmlFor="name">이름</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                  </div>

                  {/* 이메일 */}
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

                  <Button onClick={handleProfileSave} className="gap-2">
                    <Save className="h-4 w-4" />
                    저장
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 계정 탭 */}
            <TabsContent value="account" className="space-y-6">
              {/* 비밀번호 변경 */}
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

                  <Button onClick={handlePasswordChange} className="gap-2">
                    비밀번호 변경
                  </Button>
                </CardContent>
              </Card>

              {/* 소셜 계정 연동 */}
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
                        <p className="text-sm text-muted-foreground">연동됨</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      연결 해제
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
                        <p className="text-sm text-muted-foreground">연동 안됨</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
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
                        <p className="text-sm text-muted-foreground">연동 안됨</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      연결
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* 계정 삭제 */}
              <Card className="border-destructive">
                <CardHeader>
                  <CardTitle className="text-destructive">계정 삭제</CardTitle>
                  <CardDescription>
                    계정을 삭제하면 모든 데이터가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive" onClick={handleAccountDelete} className="gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    계정 삭제
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* 알림 탭 */}
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

                  <Button className="gap-2">
                    <Save className="h-4 w-4" />
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
