"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { ProfileSection } from "@/components/settings/profile-section";
import { AccountSection } from "@/components/settings/account-section";
import { NotificationSection } from "@/components/settings/notification-section";

export default function SettingsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    avatarUrl: null as string | null,
  });

  const [notifications, setNotifications] = useState({
    emailMarketing: true,
    emailUpdates: true,
    pushNotifications: false,
  });

  const [isDataLoaded, setIsDataLoaded] = useState(false);

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
          setProfileData({
            name: data.user.name || user?.email?.split("@")[0] || "",
            email: data.user.email || user?.email || "",
            avatarUrl: data.user.avatar_url || null,
          });
          if (data.user.preferences?.notifications) {
            setNotifications(data.user.preferences.notifications);
          }
        }
      }
    } catch {
      setProfileData({
        name: user?.name || user?.email?.split("@")[0] || "",
        email: user?.email || "",
        avatarUrl: null,
      });
    } finally {
      setIsDataLoaded(true);
    }
  };

  if (loading || !isDataLoaded) {
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
              <ProfileSection
                initialData={{
                  name: profileData.name,
                  email: profileData.email,
                  avatarUrl: profileData.avatarUrl,
                  userImage: user?.image,
                }}
              />
            </TabsContent>

            <TabsContent value="account">
              <AccountSection />
            </TabsContent>

            <TabsContent value="notifications">
              <NotificationSection initialData={notifications} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
