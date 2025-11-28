"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LinkIcon, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  planId?: string;
}

export function ShareModal({ open, onOpenChange, planId }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/results?id=${planId}` : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("링크가 복사되었습니다", { description: "클립보드에 링크가 복사되었습니다." });
    } catch {
      toast.error("복사 실패", { description: "링크 복사에 실패했습니다. 다시 시도해주세요." });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">여행 계획 공유하기</DialogTitle>
          <DialogDescription>친구들과 여행 계획을 공유하고 함께 준비하세요</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <Label className="mb-2 block text-sm font-medium">링크 복사</Label>
            <div className="flex gap-2">
              <Input value={shareUrl} readOnly className="flex-1" />
              <Button onClick={handleCopyLink} className="gap-2" disabled={copied}>
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    복사됨
                  </>
                ) : (
                  <>
                    <LinkIcon className="h-4 w-4" />
                    복사
                  </>
                )}
              </Button>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">링크를 복사하여 메신저나 이메일로 공유하세요</p>
          </div>

          <Card className="border-primary/20 bg-primary/5 p-4">
            <div className="flex gap-3">
              <div className="text-2xl">💡</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">공유 팁</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  복사한 링크를 카카오톡, 문자, 이메일 등 원하는 곳에 붙여넣기 하세요!
                </p>
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
