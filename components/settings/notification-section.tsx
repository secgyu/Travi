"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Save, Loader2 } from "lucide-react";
import { useAsyncAction } from "@/hooks/use-async-action";

interface NotificationSectionProps {
  initialData: {
    emailMarketing: boolean;
    emailUpdates: boolean;
    pushNotifications: boolean;
  };
}

export function NotificationSection({ initialData }: NotificationSectionProps) {
  const [notifications, setNotifications] = useState(initialData);

  const { execute: saveNotifications, isLoading: isSaving } = useAsyncAction(
    async () => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preferences: { notifications } }),
      });
      if (!response.ok) throw new Error("알림 설정 저장 실패");
      return response.json();
    },
    {
      successMessage: "저장 완료",
      successDescription: "알림 설정이 저장되었습니다.",
      errorMessage: "저장 실패",
      errorDescription: "알림 설정 저장에 실패했습니다.",
    }
  );

  return (
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

        <Button onClick={saveNotifications} disabled={isSaving} className="gap-2">
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          알림 설정 저장
        </Button>
      </CardContent>
    </Card>
  );
}
