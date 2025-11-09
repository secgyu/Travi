"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LinkIcon, MessageCircle, Facebook, Twitter, Instagram, Check, FileImage, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShareModal({ open, onOpenChange }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const shareUrl = "https://travee.kr/results/tokyo-3days";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "링크가 복사되었습니다",
        description: "클립보드에 링크가 복사되었습니다.",
      });
    } catch (err) {
      console.error("복사 실패:", err);
      toast({
        title: "복사 실패",
        description: "링크 복사에 실패했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadImage = async () => {
    setLoading(true);
    setTimeout(() => {
      toast({
        title: "이미지 다운로드",
        description: "이미지 다운로드 기능은 html-to-image 라이브러리로 구현됩니다.",
      });
      setLoading(false);
    }, 1000);
  };

  const handleDownloadPDF = async () => {
    setLoading(true);
    setTimeout(() => {
      toast({
        title: "PDF 다운로드",
        description: "PDF 다운로드 기능은 jsPDF 라이브러리로 구현됩니다.",
      });
      setLoading(false);
    }, 1000);
  };

  const handleKakaoShare = () => {
    toast({
      title: "카카오톡 공유",
      description:
        "카카오톡 공유 기능은 Kakao JavaScript SDK로 구현됩니다. 실제 사용을 위해서는 카카오 개발자 앱 키가 필요합니다.",
    });
  };

  const handleSNSShare = (platform: string) => {
    const text = "트래비로 만든 도쿄 3일 여행 계획!";
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(text);

    const urls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      instagram: "",
    };

    if (platform === "instagram") {
      toast({
        title: "인스타그램 공유",
        description: "인스타그램은 이미지를 다운로드한 후 직접 업로드해주세요.",
      });
    } else {
      window.open(urls[platform], "_blank", "width=600,height=400");
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
          {/* Link Copy Section */}
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

          {/* Download Options */}
          <div>
            <Label className="mb-3 block text-sm font-medium">다운로드</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-auto flex-col gap-2 py-4 bg-transparent"
                onClick={handleDownloadImage}
                disabled={loading}
              >
                <FileImage className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">이미지로 저장</span>
                <span className="text-xs text-muted-foreground">PNG 형식</span>
              </Button>

              <Button
                variant="outline"
                className="h-auto flex-col gap-2 py-4 bg-transparent"
                onClick={handleDownloadPDF}
                disabled={loading}
              >
                <FileText className="h-6 w-6 text-primary" />
                <span className="text-sm font-medium">PDF 다운로드</span>
                <span className="text-xs text-muted-foreground">인쇄용</span>
              </Button>
            </div>
          </div>

          {/* SNS Sharing */}
          <div>
            <Label className="mb-3 block text-sm font-medium">소셜 미디어</Label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="gap-2 bg-[#FEE500] text-[#000000] hover:bg-[#FEE500]/90"
                onClick={handleKakaoShare}
              >
                <MessageCircle className="h-5 w-5" />
                카카오톡
              </Button>

              <Button
                variant="outline"
                className="gap-2 bg-[#1877F2] text-white hover:bg-[#1877F2]/90"
                onClick={() => handleSNSShare("facebook")}
              >
                <Facebook className="h-5 w-5" />
                페이스북
              </Button>

              <Button
                variant="outline"
                className="gap-2 bg-[#1DA1F2] text-white hover:bg-[#1DA1F2]/90"
                onClick={() => handleSNSShare("twitter")}
              >
                <Twitter className="h-5 w-5" />
                트위터
              </Button>

              <Button
                variant="outline"
                className="gap-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white hover:opacity-90"
                onClick={() => handleSNSShare("instagram")}
              >
                <Instagram className="h-5 w-5" />
                인스타그램
              </Button>
            </div>
          </div>

          {/* Tips Card */}
          <Card className="border-primary/20 bg-primary/5 p-4">
            <div className="flex gap-3">
              <div className="text-2xl">💡</div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">공유 팁</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  카카오톡으로 공유하면 친구들과 실시간으로 의견을 나눌 수 있어요. 이미지로 저장하면 인스타그램 스토리에
                  올리기 좋습니다!
                </p>
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
