import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Eye, Clock, Share2, Bookmark, ChevronRight } from "lucide-react";

const guideData: Record<
  string,
  {
    title: string;
    description: string;
    category: string;
    image: string;
    readTime: string;
    views: string;
    tags: string[];
    date: string;
    author: string;
    content: { type: "heading" | "paragraph" | "list"; text: string; items?: string[] }[];
    relatedGuides: { id: string; title: string; image: string }[];
  }
> = {
  "japan-visa": {
    title: "일본 비자 신청 완벽 가이드",
    description: "일본 여행을 위한 비자 신청 절차와 필요 서류를 상세히 안내합니다",
    category: "비자",
    image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&q=80",
    readTime: "5분",
    views: "12,500",
    tags: ["일본", "비자", "필수"],
    date: "2025년 1월 15일",
    author: "트래비 편집팀",
    content: [
      { type: "heading", text: "일본 비자가 필요한 경우" },
      {
        type: "paragraph",
        text: "대한민국 국민은 90일 이내 단기 관광 목적으로 일본을 방문하는 경우 비자가 면제됩니다. 하지만 다음의 경우에는 비자 신청이 필요합니다:",
      },
      {
        type: "list",
        text: "",
        items: [
          "90일 이상 체류하는 경우",
          "취업이나 유학 목적으로 방문하는 경우",
          "과거 일본 입국 거부 또는 강제 퇴거 경력이 있는 경우",
          "범죄 경력이 있는 경우",
        ],
      },
      { type: "heading", text: "필요 서류" },
      { type: "paragraph", text: "일본 단기 관광 비자 신청을 위해 다음 서류를 준비해야 합니다:" },
      {
        type: "list",
        text: "",
        items: [
          "비자 신청서 (사진 부착)",
          "여권 원본 및 사본",
          "재직증명서 또는 재학증명서",
          "최근 3개월 이내 은행 잔고증명서",
          "여행 일정표",
          "왕복 항공권 예약 확인서",
          "숙박 예약 확인서",
        ],
      },
      { type: "heading", text: "신청 절차" },
      {
        type: "paragraph",
        text: "비자 신청은 주한 일본대사관 또는 영사관에서 직접 또는 지정된 여행사를 통해 진행할 수 있습니다. 일반적으로 신청 후 5-7영업일 정도 소요됩니다.",
      },
      {
        type: "list",
        text: "",
        items: [
          "온라인으로 비자 신청서 다운로드 및 작성",
          "필요 서류 준비",
          "대사관 방문 또는 여행사를 통해 신청",
          "비자 수령 (신청 후 5-7영업일)",
        ],
      },
      { type: "heading", text: "주의사항" },
      { type: "paragraph", text: "비자 신청 시 반드시 확인해야 할 사항들입니다:" },
      {
        type: "list",
        text: "",
        items: [
          "여권 유효기간이 최소 6개월 이상 남아있어야 합니다",
          "모든 서류는 원본을 제시해야 하며 사본도 함께 제출해야 합니다",
          "비자 발급이 거부될 경우 수수료는 환불되지 않습니다",
          "비자가 있어도 입국이 거부될 수 있으니 입국 심사 시 협조해야 합니다",
        ],
      },
    ],
    relatedGuides: [
      {
        id: "tokyo-subway",
        title: "도쿄 지하철 이용법 A to Z",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80",
      },
      {
        id: "packing-checklist",
        title: "해외여행 필수품 체크리스트",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&q=80",
      },
    ],
  },
  "tokyo-subway": {
    title: "도쿄 지하철 이용법 A to Z",
    description: "복잡한 도쿄 지하철, 이 가이드 하나면 충분합니다",
    category: "교통",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    readTime: "8분",
    views: "18,200",
    tags: ["도쿄", "지하철", "교통패스"],
    date: "2025년 1월 10일",
    author: "트래비 편집팀",
    content: [
      { type: "heading", text: "도쿄 지하철 시스템 이해하기" },
      {
        type: "paragraph",
        text: "도쿄의 지하철은 크게 두 개의 회사로 운영됩니다: 도쿄 메트로(Tokyo Metro)와 도에이 지하철(Toei Subway). 총 13개의 노선이 도쿄 전역을 촘촘하게 연결하고 있습니다.",
      },
      { type: "heading", text: "교통카드 선택하기" },
      { type: "paragraph", text: "도쿄에서 사용할 수 있는 주요 교통카드는 다음과 같습니다:" },
      {
        type: "list",
        text: "",
        items: [
          "Suica (스이카): JR동일본에서 발행, 가장 범용적",
          "PASMO (파스모): 사철 및 버스 회사에서 발행",
          "Welcome Suica: 외국인 관광객 전용, 28일 유효",
        ],
      },
      { type: "heading", text: "1일 승차권 종류" },
      { type: "paragraph", text: "하루에 여러 곳을 이동한다면 1일 승차권이 경제적입니다:" },
      {
        type: "list",
        text: "",
        items: [
          "도쿄 메트로 24시간권: ¥600 (메트로 노선만)",
          "도에이 1일권: ¥700 (도에이 노선만)",
          "도쿄 메트로·도에이 공통권: ¥900 (모든 지하철 이용 가능)",
        ],
      },
      { type: "heading", text: "이용 팁" },
      {
        type: "list",
        text: "",
        items: [
          "러시아워(오전 7-9시, 오후 6-8시)는 피하세요",
          "역 번호를 외우면 편리합니다 (예: G-03 = Ginza Line 3번 역)",
          "마지막 전철은 보통 자정 전후입니다",
          "Google Maps를 활용하면 경로 찾기가 쉽습니다",
        ],
      },
    ],
    relatedGuides: [
      {
        id: "japan-visa",
        title: "일본 비자 신청 완벽 가이드",
        image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=300&q=80",
      },
      {
        id: "currency-exchange",
        title: "환전은 어디서? 최저 수수료 찾기",
        image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=300&q=80",
      },
    ],
  },
  "currency-exchange": {
    title: "환전은 어디서? 최저 수수료 찾기",
    description: "은행, 공항, 환전소, 카드... 가장 유리한 환전 방법을 알려드립니다",
    category: "환전",
    image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=800&q=80",
    readTime: "6분",
    views: "25,300",
    tags: ["환전", "수수료", "절약"],
    date: "2025년 1월 5일",
    author: "트래비 편집팀",
    content: [
      { type: "heading", text: "환전 방법 비교" },
      { type: "paragraph", text: "여행 전 환전을 어디서 할지 고민이신가요? 각 방법의 장단점을 비교해드립니다." },
      { type: "heading", text: "1. 은행 환전" },
      {
        type: "paragraph",
        text: "가장 안전하고 신뢰할 수 있는 방법입니다. 환율 우대를 받으면 수수료를 절약할 수 있습니다.",
      },
      {
        type: "list",
        text: "",
        items: [
          "장점: 안전하고 신뢰성 높음, 환율 우대 가능",
          "단점: 영업시간 제한, 미리 예약 필요한 경우 있음",
          "추천: 대량 환전 시",
        ],
      },
      { type: "heading", text: "2. 공항 환전소" },
      { type: "paragraph", text: "24시간 운영되어 편리하지만 환율이 가장 불리합니다." },
      {
        type: "list",
        text: "",
        items: [
          "장점: 24시간 이용 가능, 즉시 환전",
          "단점: 환율이 가장 불리함, 수수료 높음",
          "추천: 긴급 상황, 소액 환전",
        ],
      },
      { type: "heading", text: "3. 현지 환전소" },
      { type: "paragraph", text: "도쿄의 경우 긴자, 신주쿠 등에 환율이 좋은 환전소가 많습니다." },
      {
        type: "list",
        text: "",
        items: ["장점: 환율이 유리함, 수수료 저렴", "단점: 찾기 어려울 수 있음", "추천: 현지 도착 후 환전"],
      },
      { type: "heading", text: "4. 해외 ATM 인출" },
      { type: "paragraph", text: "신용카드나 체크카드로 현지 ATM에서 바로 인출하는 방법입니다." },
      {
        type: "list",
        text: "",
        items: ["장점: 편리함, 필요한 만큼만 인출", "단점: ATM 수수료 발생, 카드사 환전 수수료", "추천: 소액 필요 시"],
      },
      { type: "heading", text: "전문가 팁" },
      {
        type: "list",
        text: "",
        items: [
          "여행 2주 전부터 환율을 체크하세요",
          "은행 앱에서 환율 우대 쿠폰을 받으세요",
          "현금 + 카드를 적절히 조합하세요",
          "미화는 어느 나라든 환전 가능하니 비상금으로 준비하세요",
        ],
      },
    ],
    relatedGuides: [
      {
        id: "packing-checklist",
        title: "해외여행 필수품 체크리스트",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&q=80",
      },
      {
        id: "sim-card-guide",
        title: "해외 데이터 로밍 vs 유심 비교",
        image: "https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?w=300&q=80",
      },
    ],
  },
  "packing-checklist": {
    title: "해외여행 필수품 체크리스트",
    description: "빠뜨리면 안 되는 여행 필수품 총정리",
    category: "여행 준비",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
    readTime: "4분",
    views: "32,100",
    tags: ["짐싸기", "체크리스트", "필수템"],
    date: "2025년 1월 1일",
    author: "트래비 편집팀",
    content: [
      { type: "heading", text: "여행 전 필수 체크사항" },
      { type: "paragraph", text: "짐을 싸기 전에 반드시 확인해야 할 사항들입니다." },
      {
        type: "list",
        text: "",
        items: [
          "여권 유효기간 (6개월 이상)",
          "비자 필요 여부",
          "항공권 및 숙박 예약 확인",
          "여행자 보험 가입",
          "환전 또는 카드 준비",
        ],
      },
      { type: "heading", text: "절대 빠뜨리면 안 되는 필수품" },
      {
        type: "list",
        text: "",
        items: [
          "여권 및 사본",
          "항공권 및 예약 확인서",
          "신용카드/체크카드",
          "현금 (현지 화폐 + 미화)",
          "휴대폰 및 충전기",
          "여행자 보험증서",
          "처방약 (필요 시)",
          "세면도구 (100ml 이하 용기)",
        ],
      },
      { type: "heading", text: "편의용품" },
      {
        type: "list",
        text: "",
        items: [
          "보조배터리",
          "멀티어댑터",
          "슬리퍼",
          "선글라스",
          "모자",
          "에코백",
          "우산 또는 우비",
          "간단한 구급약품",
        ],
      },
      { type: "heading", text: "계절별 준비물" },
      { type: "paragraph", text: "여름: 자외선 차단제, 모자, 선글라스, 가벼운 옷" },
      { type: "paragraph", text: "겨울: 패딩, 목도리, 장갑, 핫팩, 보습제" },
      { type: "heading", text: "짐 싸기 팁" },
      {
        type: "list",
        text: "",
        items: [
          "무게 제한 확인 (기내수하물 보통 7kg)",
          "액체류는 100ml 이하 용기에 담아 지퍼백에",
          "귀중품은 기내수하물에",
          "옷은 돌돌 말아서 공간 절약",
          "여유 공간을 남겨두세요 (쇼핑 여유분)",
        ],
      },
    ],
    relatedGuides: [
      {
        id: "sim-card-guide",
        title: "해외 데이터 로밍 vs 유심 비교",
        image: "https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?w=300&q=80",
      },
      {
        id: "japan-visa",
        title: "일본 비자 신청 완벽 가이드",
        image: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=300&q=80",
      },
    ],
  },
  "tipping-culture": {
    title: "나라별 팁 문화 완벽 정리",
    description: "팁을 줘야 할까? 얼마나 줘야 할까? 나라별 팁 문화를 알아봅니다",
    category: "문화",
    image: "https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?w=800&q=80",
    readTime: "7분",
    views: "15,700",
    tags: ["팁", "문화", "에티켓"],
    date: "2024년 12월 28일",
    author: "트래비 편집팀",
    content: [
      { type: "heading", text: "팁 문화란?" },
      {
        type: "paragraph",
        text: "팁(Tip)은 서비스에 대한 감사의 표시로 추가로 지불하는 금액입니다. 나라마다 팁 문화가 다르므로 여행 전 확인이 필요합니다.",
      },
      { type: "heading", text: "미국 - 팁이 필수인 나라" },
      {
        type: "list",
        text: "",
        items: [
          "레스토랑: 15-20% (필수)",
          "택시: 15% 정도",
          "호텔 벨보이: 짐 하나당 $1-2",
          "호텔 청소: 하루 $2-5",
          "바: 음료당 $1-2",
        ],
      },
      { type: "heading", text: "유럽 - 나라마다 다름" },
      { type: "paragraph", text: "프랑스, 이탈리아: 계산서에 서비스료 포함, 추가 팁은 선택 (5-10%)" },
      { type: "paragraph", text: "영국: 10-15% 정도 (서비스료 미포함 시)" },
      { type: "paragraph", text: "독일: 5-10% 또는 반올림" },
      { type: "heading", text: "아시아 - 대부분 팁 문화 없음" },
      {
        type: "list",
        text: "",
        items: [
          "일본: 팁 문화 없음 (오히려 실례가 될 수 있음)",
          "한국: 팁 문화 없음",
          "중국: 대도시 고급 레스토랑에서만 선택적",
          "태국: 고급 레스토랑/호텔에서 10% 정도",
        ],
      },
      { type: "heading", text: "팁 주는 방법" },
      {
        type: "list",
        text: "",
        items: [
          "현금으로 직접 전달하는 것이 가장 일반적",
          "계산서에 팁 금액을 적고 카드 결제",
          "트레이에 놓고 나오기",
          '팁을 주면서 "Thank you" 인사',
        ],
      },
    ],
    relatedGuides: [
      {
        id: "currency-exchange",
        title: "환전은 어디서? 최저 수수료 찾기",
        image: "https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=300&q=80",
      },
      {
        id: "packing-checklist",
        title: "해외여행 필수품 체크리스트",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&q=80",
      },
    ],
  },
  "sim-card-guide": {
    title: "해외 데이터 로밍 vs 유심 비교",
    description: "로밍? 유심? eSIM? 해외에서 인터넷 사용하는 가장 좋은 방법",
    category: "여행 준비",
    image: "https://images.unsplash.com/photo-1471897488648-5eae4ac6686b?w=800&q=80",
    readTime: "6분",
    views: "22,800",
    tags: ["인터넷", "로밍", "유심"],
    date: "2024년 12월 25일",
    author: "트래비 편집팀",
    content: [
      { type: "heading", text: "해외 인터넷 사용 방법 비교" },
      { type: "paragraph", text: "해외 여행 시 인터넷을 사용하는 주요 방법은 3가지입니다: 로밍, 유심, eSIM" },
      { type: "heading", text: "1. 데이터 로밍" },
      { type: "paragraph", text: "국내 통신사의 로밍 서비스를 이용하는 방법입니다." },
      {
        type: "list",
        text: "",
        items: [
          "장점: 별도 설정 불필요, 한국 번호 유지",
          "단점: 비용이 비쌈 (하루 8,900원-13,200원)",
          "추천: 단기 출장, 급한 경우",
        ],
      },
      { type: "heading", text: "2. 유심 (USIM) 구매" },
      { type: "paragraph", text: "현지 유심이나 여행자 유심을 구매하는 방법입니다." },
      {
        type: "list",
        text: "",
        items: [
          "장점: 저렴함, 데이터 무제한 옵션",
          "단점: 유심 교체 번거로움, 한국 번호 수신 불가",
          "추천: 장기 여행, 데이터 사용량 많을 때",
          "가격: 3일 ₩15,000 / 7일 ₩25,000 정도",
        ],
      },
      { type: "heading", text: "3. eSIM" },
      { type: "paragraph", text: "물리적 유심 없이 앱으로 활성화하는 최신 방법입니다." },
      {
        type: "list",
        text: "",
        items: [
          "장점: 즉시 활성화, 유심 교체 불필요, 듀얼 사용 가능",
          "단점: eSIM 지원 기기 필요 (아이폰 XS 이후, 최신 갤럭시)",
          "추천: 최신 스마트폰 사용자",
          "인기 앱: Airalo, Ubigi, Holafly",
        ],
      },
      { type: "heading", text: "상황별 추천" },
      { type: "paragraph", text: "2-3일 단기: 로밍 (편리함 우선)" },
      { type: "paragraph", text: "5-7일 일반 여행: 유심 또는 eSIM" },
      { type: "paragraph", text: "2주 이상 장기: 유심 (가성비 최고)" },
      { type: "paragraph", text: "최신 스마트폰: eSIM (가장 편리)" },
      { type: "heading", text: "팁" },
      {
        type: "list",
        text: "",
        items: [
          "출국 전에 미리 준비하세요",
          "데이터 무제한이 아니면 와이파이 적극 활용",
          "카카오톡은 와이파이로도 사용 가능",
          "구글 맵 오프라인 지도 다운로드 추천",
        ],
      },
    ],
    relatedGuides: [
      {
        id: "packing-checklist",
        title: "해외여행 필수품 체크리스트",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=300&q=80",
      },
      {
        id: "tokyo-subway",
        title: "도쿄 지하철 이용법 A to Z",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80",
      },
    ],
  },
};

export default function GuideDetailPage({ params }: { params: { slug: string } }) {
  const guide = guideData[params.slug];

  if (!guide) {
    notFound();
  }

  const tableOfContents = guide.content
    .filter((item) => item.type === "heading")
    .map((item, idx) => ({ id: idx, text: item.text }));

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <article className="mx-auto max-w-4xl px-4 py-8">
        <Button asChild variant="ghost" className="mb-6 -ml-2">
          <Link href="/guide">
            <ArrowLeft className="mr-2 h-4 w-4" />
            목록으로
          </Link>
        </Button>

        <div className="mb-8">
          <Badge className="mb-4">{guide.category}</Badge>
          <h1 className="mb-4 text-4xl font-bold text-foreground text-balance">{guide.title}</h1>
          <p className="mb-6 text-lg text-foreground/80 text-pretty">{guide.description}</p>

          <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {guide.date}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {guide.readTime} 읽기
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              조회수 {guide.views}
            </div>
            <div className="flex items-center gap-1">작성자: {guide.author}</div>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {guide.tags.map((tag, idx) => (
              <Badge key={idx} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Share2 className="h-4 w-4" />
              공유하기
            </Button>
            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <Bookmark className="h-4 w-4" />
              저장하기
            </Button>
          </div>
        </div>

        <div className="mb-8 overflow-hidden rounded-2xl">
          <img src={guide.image || "/placeholder.svg"} alt={guide.title} className="w-full h-[400px] object-cover" />
        </div>

        <div className="mb-12 rounded-xl bg-accent/20 p-6">
          <h2 className="mb-4 text-lg font-bold text-foreground">목차</h2>
          <nav className="space-y-2">
            {tableOfContents.map((item) => (
              <a
                key={item.id}
                href={`#section-${item.id}`}
                className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
                {item.text}
              </a>
            ))}
          </nav>
        </div>

        <div className="prose prose-lg max-w-none">
          {guide.content.map((section, idx) => {
            if (section.type === "heading") {
              return (
                <h2
                  key={idx}
                  id={`section-${tableOfContents.findIndex((t) => t.text === section.text)}`}
                  className="mt-12 mb-4 text-2xl font-bold text-foreground first:mt-0"
                >
                  {section.text}
                </h2>
              );
            }
            if (section.type === "paragraph") {
              return (
                <p key={idx} className="mb-4 text-base leading-relaxed text-foreground/90">
                  {section.text}
                </p>
              );
            }
            if (section.type === "list" && section.items) {
              return (
                <ul key={idx} className="mb-6 space-y-2 ml-6">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-base text-foreground/90 list-disc">
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }
            return null;
          })}
        </div>

        <div className="mt-16 border-t pt-12">
          <h2 className="mb-6 text-2xl font-bold text-foreground">관련 가이드</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {guide.relatedGuides.map((related) => (
              <Link key={related.id} href={`/guide/${related.id}`}>
                <Card className="group overflow-hidden border-0 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={related.image || "/placeholder.svg"}
                      alt={related.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-foreground line-clamp-2">{related.title}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold text-foreground">더 궁금한 점이 있으신가요?</h2>
          <p className="mb-6 text-foreground/80">고객센터를 통해 언제든지 문의해주세요</p>
          <Button asChild size="lg" className="bg-cta text-cta-foreground hover:bg-cta/90">
            <Link href="/support">고객센터 문의하기</Link>
          </Button>
        </div>
      </article>

      <Footer />
    </div>
  );
}
