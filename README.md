# 🌍 Travi - AI 기반 여행 플래너

**Travi**는 AI와 대화하며 맞춤형 여행 계획을 만들 수 있는 차세대 여행 플래너입니다.

## ✨ 주요 기능

### 🤖 AI 여행 채팅
- OpenAI GPT-4o-mini 기반 자연스러운 대화
- 여행지, 기간, 예산, 스타일에 맞춘 일정 자동 생성
- 실시간 스트리밍 응답

### 📍 스마트 GPS Geocoding (NEW!)
- **자동 위치 조회**: AI가 생성한 장소의 GPS 좌표를 자동으로 획득
- **5단계 폴백 전략**: Google Maps API → AI 추정 → 도시 중심
- **신뢰도 표시**: high/medium/low 3단계 정확도 배지
- **캐싱 시스템**: 동일 장소는 자동 캐싱하여 API 비용 절감

### 🗺️ 인터랙티브 여행 계획
- 일차별 상세 일정 표시
- 장소별 GPS 좌표, 주소, 교통편, 소요시간, 비용 정보
- 일정 수정/추가/삭제 기능
- 지도 연동 준비 완료

### 🎨 아름다운 UI/UX
- 모던하고 직관적인 인터페이스
- 반응형 디자인 (모바일/태블릿/데스크톱)
- 다크 모드 지원 준비

---

## 🚀 빠른 시작

### 1. 저장소 클론
```bash
git clone https://github.com/your-username/travi.git
cd travi
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 환경 변수 설정
프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가:

```bash
# 필수 환경 변수
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXTAUTH_SECRET=your_nextauth_secret
OPENAI_API_KEY=your_openai_api_key

# 선택 (GPS 정확도 향상)
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

👉 **자세한 설정**: [`docs/ENV_SETUP.md`](docs/ENV_SETUP.md) 참고

### 4. 개발 서버 실행
```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

## 📖 문서

- **[환경 변수 설정 가이드](docs/ENV_SETUP.md)**: API 키 발급 및 설정 방법
- **[GPS Geocoding 가이드](docs/GEOCODING_GUIDE.md)**: GPS 시스템 상세 설명
- **[구현 요약](docs/IMPLEMENTATION_SUMMARY.md)**: 최근 기능 업데이트 내역
- **[인증 가이드](docs/AUTHENTICATION_GUIDE.md)**: NextAuth 설정 방법

---

## 🛠️ 기술 스택

### Frontend
- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** 컴포넌트

### Backend
- **Supabase** (PostgreSQL)
- **NextAuth.js** (인증)
- **AI SDK** (Vercel)

### AI & APIs
- **OpenAI GPT-4o-mini** (채팅)
- **Google Maps Geocoding API** (GPS 좌표)

---

## 📁 프로젝트 구조

```
travi/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   │   ├── auth/         # 인증 API
│   │   ├── chat/         # AI 채팅 API
│   │   ├── geocode/      # GPS Geocoding API (NEW!)
│   │   └── travel-plans/ # 여행 계획 CRUD
│   ├── chat/             # AI 채팅 페이지
│   ├── results/          # 여행 계획 결과 페이지
│   └── ...
├── components/            # React 컴포넌트
│   ├── ui/               # shadcn/ui 기본 컴포넌트
│   └── ...
├── lib/                   # 유틸리티 함수
│   ├── smart-geocoding.ts # GPS Geocoding 로직 (NEW!)
│   ├── cities/           # 도시 정보 데이터
│   └── ...
├── docs/                  # 문서
│   ├── ENV_SETUP.md      # 환경 설정 가이드
│   ├── GEOCODING_GUIDE.md # GPS 가이드
│   └── ...
└── types/                 # TypeScript 타입 정의
```

---

## 🎯 주요 사용 흐름

1. **홈페이지**: 여행지 탐색 및 테마별 추천
2. **AI 채팅**: "도쿄 3일 여행 계획 짜줘" 입력
3. **자동 생성**: AI가 일정, 장소, 교통편 등 상세 계획 제공
4. **GPS 조회**: 각 장소의 정확한 GPS 좌표 자동 획득 (NEW!)
5. **일정 저장**: 여행 계획을 데이터베이스에 저장
6. **결과 확인**: 지도 프리뷰와 함께 상세 일정 확인
7. **수정/공유**: 일정 수정 후 친구들과 공유

---

## 🆕 최신 업데이트 (GPS Geocoding)

### 자동 GPS 좌표 조회 시스템
AI가 생성한 여행 장소의 GPS 좌표를 자동으로 획득합니다:

```typescript
// 예시: AI 응답
"오전 9:00 - 시부야 스크램블 교차로 (Shibuya Scramble Crossing)"

// 자동으로 변환됨
{
  title: "시부야 스크램블 교차로",
  subtitle: "Shibuya Scramble Crossing",
  lat: 35.659500,
  lng: 139.700400,
  gps_confidence: "high"
}
```

### 5단계 폴백 전략
1. **Google API (영어명 + 도시)**: 가장 정확
2. **Google API (영어명만)**: 유명 장소
3. **Google API (한글명 + 도시)**: 한국어 처리
4. **OpenAI 백업**: AI가 알고 있는 좌표
5. **도시 중심**: 최종 폴백

→ 정확도 **90% 이상** 달성!

---

## 💰 비용 예상

| 서비스 | 무료 범위 | 예상 비용 |
|--------|-----------|-----------|
| Supabase | 500MB DB | 무료 |
| OpenAI | - | 월 $5 이하 |
| Google Maps | 월 $200 크레딧 | 무료 |
| **합계** | - | **월 $5 이하** |

---

## 🧪 테스트

### AI 채팅 테스트
```bash
# 개발 서버 실행
npm run dev

# 브라우저에서 /chat 접속
# "도쿄 3일 여행 계획 짜줘" 입력
# 콘솔에서 GPS 조회 로그 확인
```

### GPS Geocoding 테스트
```
🔍 [Geocoding] 시부야 스크램블 교차로 (Shibuya Scramble Crossing) in 도쿄
✅ [Strategy 1] High confidence: Shibuya Scramble Crossing, 도쿄
✅ GPS: 35.659500, 139.700400 (high)
```

---

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

---

## 📞 문의

- **GitHub Issues**: [프로젝트 이슈](https://github.com/your-username/travi/issues)
- **Email**: your-email@example.com

---

## 🎉 감사의 말

- [Next.js](https://nextjs.org/)
- [OpenAI](https://openai.com/)
- [Supabase](https://supabase.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vercel AI SDK](https://sdk.vercel.ai/)

---

**Happy Traveling with Travi! ✈️🌏**
