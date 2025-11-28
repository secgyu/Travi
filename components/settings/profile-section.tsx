"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Camera, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAsyncAction } from "@/hooks/use-async-action";

interface ProfileSectionProps {
  initialData: {
    name: string;
    email: string;
    avatarUrl: string | null;
    userImage?: string | null;
  };
}

export function ProfileSection({ initialData }: ProfileSectionProps) {
  const [name, setName] = useState(initialData.name);
  const [email, setEmail] = useState(initialData.email);
  const [avatarUrl, setAvatarUrl] = useState(initialData.avatarUrl);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { execute: saveProfile, isLoading: isSaving } = useAsyncAction(
    async () => {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!response.ok) throw new Error("프로필 저장 실패");
      return response.json();
    },
    {
      successMessage: "저장 완료",
      successDescription: "프로필이 성공적으로 저장되었습니다.",
      errorMessage: "저장 실패",
      errorDescription: "프로필 저장에 실패했습니다.",
    }
  );

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("업로드 실패", { description: "JPG, PNG, WebP, GIF 파일만 가능합니다." });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("업로드 실패", { description: "파일 크기는 2MB 이하여야 합니다." });
      return;
    }

    setIsUploadingAvatar(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/profile/avatar", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "업로드 실패");
      }

      setAvatarUrl(data.avatarUrl);
      toast.success("업로드 완료", { description: "프로필 사진이 변경되었습니다." });
    } catch (error) {
      toast.error("업로드 실패", {
        description: error instanceof Error ? error.message : "다시 시도해주세요.",
      });
    } finally {
      setIsUploadingAvatar(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>프로필 정보</CardTitle>
        <CardDescription>공개 프로필 정보를 수정하세요</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={avatarUrl || initialData.userImage || "/user-avatar.jpg"} alt="프로필 사진" />
            <AvatarFallback>{name?.[0] || "U"}</AvatarFallback>
          </Avatar>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleAvatarUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              size="sm"
              className="gap-2 bg-transparent"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingAvatar}
            >
              {isUploadingAvatar ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
              {isUploadingAvatar ? "업로드 중..." : "사진 변경"}
            </Button>
            <p className="mt-2 text-xs text-muted-foreground">JPG, PNG, WebP, GIF (최대 2MB)</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="name">이름</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <p className="text-xs text-muted-foreground">이메일 변경 시 인증이 필요합니다</p>
        </div>

        <Button onClick={saveProfile} disabled={isSaving} className="gap-2">
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          저장
        </Button>
      </CardContent>
    </Card>
  );
}
