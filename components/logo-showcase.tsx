import { Logo, ResponsiveLogo } from "./logo";
import { Card } from "./ui/card";

export function LogoShowcase() {
  return (
    <div className="container mx-auto p-8 space-y-12">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">트래비 로고 시스템</h1>
        <p className="text-muted-foreground">다양한 버전과 사이즈로 사용 가능한 로고</p>
      </div>

      {/* Full Version */}
      <Card className="p-8">
        <h2 className="text-xl font-semibold mb-6">Full Logo (아이콘 + 텍스트)</h2>
        <div className="flex flex-wrap items-center gap-8">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Small</p>
            <Logo variant="full" size="sm" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Medium</p>
            <Logo variant="full" size="md" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Large</p>
            <Logo variant="full" size="lg" />
          </div>
        </div>
      </Card>

      {/* Icon Only */}
      <Card className="p-8">
        <h2 className="text-xl font-semibold mb-6">Icon Only (아이콘만)</h2>
        <div className="flex flex-wrap items-center gap-8">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Small</p>
            <Logo variant="icon" size="sm" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Medium</p>
            <Logo variant="icon" size="md" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Large</p>
            <Logo variant="icon" size="lg" />
          </div>
        </div>
      </Card>

      {/* Text Only */}
      <Card className="p-8">
        <h2 className="text-xl font-semibold mb-6">Text Only (텍스트만)</h2>
        <div className="flex flex-wrap items-center gap-8">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Small</p>
            <Logo variant="text" size="sm" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Medium</p>
            <Logo variant="text" size="md" />
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Large</p>
            <Logo variant="text" size="lg" />
          </div>
        </div>
      </Card>

      {/* Responsive */}
      <Card className="p-8">
        <h2 className="text-xl font-semibold mb-6">Responsive (반응형)</h2>
        <p className="text-sm text-muted-foreground mb-4">
          화면 크기를 조절해보세요. 모바일에서는 아이콘만, 데스크톱에서는 전체 로고가 표시됩니다.
        </p>
        <div className="border-2 border-dashed border-border p-8 rounded-lg">
          <ResponsiveLogo />
        </div>
      </Card>

      {/* Dark Background */}
      <Card className="p-8 bg-slate-900">
        <h2 className="text-xl font-semibold mb-6 text-white">Dark Background</h2>
        <div className="flex flex-wrap items-center gap-8">
          <Logo variant="full" size="md" />
          <Logo variant="icon" size="md" />
          <Logo variant="text" size="md" />
        </div>
      </Card>

      {/* Usage Guide */}
      <Card className="p-8 bg-blue-50">
        <h2 className="text-xl font-semibold mb-4">사용 방법</h2>
        <div className="space-y-4 text-sm">
          <div>
            <code className="bg-white px-2 py-1 rounded">{`<Logo variant="full" size="md" />`}</code>
            <p className="text-muted-foreground mt-1">기본 전체 로고</p>
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded">{`<Logo variant="icon" size="sm" />`}</code>
            <p className="text-muted-foreground mt-1">아이콘만 (모바일 헤더용)</p>
          </div>
          <div>
            <code className="bg-white px-2 py-1 rounded">{`<ResponsiveLogo />`}</code>
            <p className="text-muted-foreground mt-1">자동 반응형 (헤더에 추천)</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
