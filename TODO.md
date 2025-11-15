# 트래비(Travee) 개발 TODO 리스트

현재 프로젝트는 UI/UX 프로토타입이 완성되어 있으며, 백엔드 및 API 연동이 필요합니다.

---

## 🔴 필수 구현 사항 (Core Features)

### 1. AI 챗봇 API 연동

- [ ] **AI SDK 패키지 설치**
  ```bash
  npm install ai @ai-sdk/openai
  ```
- [ ] **OpenAI API 키 설정**
  - `.env.local`에 `OPENAI_API_KEY` 추가
  - 현재 `/api/chat/route.ts`에서 사용 중
  - 모델: `gpt-4o-mini` (현재 하드코딩)
- [ ] **AI 채팅 히스토리 저장** (Supabase DB)
  - 채팅 메시지 저장/불러오기
  - 사용자별 대화 기록 관리

### 2. Supabase 데이터베이스 스키마 설계 및 구현

- [ ] **Users 테이블** (profiles)
  ```sql
  - id (uuid, FK to auth.users)
  - name (text)
  - email (text)
  - profile_image (text)
  - travel_style (text)
  - created_at (timestamp)
  - updated_at (timestamp)
  ```
- [ ] **Trips 테이블** (여행 계획)
  ```sql
  - id (uuid, PK)
  - user_id (uuid, FK to auth.users)
  - title (text)
  - destination (text)
  - start_date (date)
  - end_date (date)
  - budget (integer)
  - status (text: 'upcoming', 'planning', 'completed')
  - created_at (timestamp)
  - updated_at (timestamp)
  ```
- [ ] **Itineraries 테이블** (일정 상세)
  ```sql
  - id (uuid, PK)
  - trip_id (uuid, FK to trips)
  - day (integer)
  - date (date)
  - activities (jsonb)
  - created_at (timestamp)
  ```
- [ ] **Favorites 테이블** (즐겨찾기)
  ```sql
  - id (uuid, PK)
  - user_id (uuid, FK to auth.users)
  - place_name (text)
  - location (text)
  - category (text)
  - created_at (timestamp)
  ```
- [ ] **Chat_History 테이블**
  ```sql
  - id (uuid, PK)
  - user_id (uuid, FK to auth.users)
  - messages (jsonb)
  - created_at (timestamp)
  ```

### 3. 사용자 데이터 연동

- [ ] **마이페이지 데이터 불러오기**
  - 현재: 하드코딩된 목업 데이터 (`app/my/page.tsx`)
  - 구현: Supabase에서 사용자 데이터 fetch
- [ ] **여행 계획 저장 기능**
  - AI가 생성한 여행 일정을 DB에 저장
  - `/results` 페이지에서 "저장하기" 버튼 연동
- [ ] **여행 계획 불러오기**
  - 마이페이지에서 저장된 여행 목록 표시
  - 상세 페이지로 이동
- [ ] **여행 계획 수정/삭제**
  - CRUD 기능 완성
- [ ] **프로필 이미지 업로드**
  - Supabase Storage 연동
  - 이미지 업로드 및 URL 저장

### 4. OAuth 소셜 로그인 완성

- [ ] **Google OAuth 설정**
  - Google Cloud Console에서 OAuth 클라이언트 ID 생성
  - Supabase Dashboard → Authentication → Providers → Google 설정
  - Redirect URL 설정: `{YOUR_SUPABASE_URL}/auth/v1/callback`
- [ ] **카카오 로그인 추가** (선택사항)
  - 카카오 개발자 센터에서 앱 등록
  - Supabase에 커스텀 OAuth 설정
- [ ] **네이버 로그인 추가** (선택사항)

---

## 🟡 주요 기능 구현 (Important Features)

### 5. 예산 계산기 데이터 저장

- [ ] **예산 데이터 DB 연동**
  - 현재: 프론트엔드에서만 작동 (`app/budget/page.tsx`)
  - 구현: 사용자별 예산 항목 저장/불러오기
- [ ] **여행 계획과 연동**
  - 특정 여행에 예산 계산 결과 연결

### 6. 지도 API 연동

- [ ] **네이버 지도 API 키 발급**
  - 네이버 클라우드 플랫폼 가입
  - Maps API 신청
- [ ] **지도 컴포넌트 구현**
  - 현재: 목업 UI (`app/results/page.tsx`)
  - 구현: 실제 지도에 여행지 마커 표시
  - 경로 표시 (Day별 이동 경로)
- [ ] **장소 검색 기능**
  - 네이버 지도 Places API 활용

### 7. 날씨 API 연동

- [ ] **날씨 API 키 발급**
  - OpenWeatherMap 또는 기상청 API
- [ ] **여행지 날씨 정보 표시**
  - 현재: 하드코딩 "맑음 18°C"
  - 구현: 실시간 날씨 데이터

### 8. PDF 다운로드 기능

- [ ] **PDF 생성 라이브러리 설치**
  ```bash
  npm install jspdf html2canvas
  ```
- [ ] **여행 일정 PDF 변환**
  - `/results` 페이지의 "PDF 다운로드" 버튼 구현
  - 일정을 예쁜 PDF로 변환

### 9. 여행 계획 공유 기능

- [ ] **공유 링크 생성**
  - 고유 URL로 여행 계획 공유
  - 예: `/shared/{trip_id}`
- [ ] **공유 모달 완성**
  - 현재: UI만 존재 (`components/share-modal.tsx`)
  - 구현: 카카오톡, 링크 복사, SNS 공유

---

## 🟢 추가 개선 사항 (Nice to Have)

### 10. 이미지 및 파일 관리

- [ ] **Supabase Storage 설정**
  - `avatars` 버킷 생성 (프로필 이미지)
  - `trip-photos` 버킷 생성 (여행 사진)
- [ ] **여행 사진 업로드**
  - 여행 완료 후 사진 업로드 기능

### 11. 여행지 상세 페이지 데이터 연동

- [ ] **Explore 페이지 DB 연동**
  - 현재: 하드코딩된 여행지 목록 (`app/explore/page.tsx`)
  - 구현: Supabase에서 여행지 데이터 관리
- [ ] **도시별 상세 페이지**
  - `/explore/[city]` 동적 라우트 데이터 연동

### 12. 가이드 콘텐츠 CMS

- [ ] **가이드 콘텐츠 DB 저장**
  - 현재: 하드코딩 (`app/guide/page.tsx`)
  - 구현: Supabase에서 가이드 관리
- [ ] **가이드 상세 페이지**
  - `/guide/[slug]` 실제 콘텐츠 연동
- [ ] **검색 기능**
  - 가이드 검색 기능 구현

### 13. FAQ 및 고객센터

- [ ] **FAQ 데이터 DB 관리**
  - 현재: 하드코딩 (`app/faq/page.tsx`)
- [ ] **고객센터 문의 양식**
  - 이메일 발송 또는 DB 저장
  - SendGrid 또는 Resend API 연동

### 14. 이메일 알림

- [ ] **이메일 서비스 설정**
  - Resend 또는 SendGrid
- [ ] **알림 기능**
  - 여행 D-7 알림
  - 여행 완료 후 후기 작성 요청

### 15. 성능 최적화

- [ ] **이미지 최적화**
  - Next.js Image 컴포넌트로 변환
  - WebP 형식 사용
- [ ] **코드 스플리팅**
  - Dynamic import 활용
- [ ] **캐싱 전략**
  - React Query 또는 SWR 도입

### 16. SEO 최적화

- [ ] **메타 태그 추가**
  - 각 페이지별 metadata 설정
- [ ] **sitemap.xml 생성**
- [ ] **robots.txt 설정**
- [ ] **Open Graph 이미지**

---

## 📦 패키지 설치 필요

```bash
# AI 챗봇
npm install ai @ai-sdk/openai

# PDF 생성
npm install jspdf html2canvas

# 이메일
npm install resend

# 데이터 페칭 (선택)
npm install @tanstack/react-query
```

---

## 🔧 환경 변수 설정 필요

`.env.local` 파일에 추가:

```bash
# Supabase (이미 설정됨)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=

# OpenAI
OPENAI_API_KEY=

# 네이버 지도
NEXT_PUBLIC_NAVER_MAP_CLIENT_ID=

# 날씨 API
NEXT_PUBLIC_WEATHER_API_KEY=

# 이메일 (Resend)
RESEND_API_KEY=

# OAuth (Supabase Dashboard에서 설정)
# Google, Kakao, Naver OAuth
```

---

## 🎯 개발 우선순위

### Phase 1: 핵심 기능 (1-2주)

1. ✅ Supabase 인증 (완료)
2. ✅ AI 챗봇 API 연동
3. DB 스키마 생성
4. 여행 계획 저장/불러오기

### Phase 2: 주요 기능 (2-3주)

5. ✅ 마이페이지 데이터 연동 (프로필만 수파베이스 연동)
6. ✅ 지도 API 연동 (발급 + env에 추가만)
7. 날씨 API 연동
8. ✅ OAuth 완성 + auth.js 로그인/회원가입

### Phase 3: 부가 기능 (1-2주)

9. PDF 다운로드
10. 공유 기능
11. 이미지 업로드
12. ✅ 예산 계산기 저장 (환율 api만 가져옴)
13. ✅ 여행 가이드 mdx로 변경
14. ✅ 여행지 둘러보기 (테마별 고민단계)

### Phase 4: 마무리 (1주)

15. 성능 최적화
16. SEO
17. 버그 수정
18. 테스트

---

## 📝 참고 문서

- [Supabase Documentation](https://supabase.com/docs)
- [OpenAI API](https://platform.openai.com/docs)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [네이버 지도 API](https://www.ncloud.com/product/applicationService/maps)
- [Next.js Documentation](https://nextjs.org/docs)

---

**작성일**: 2025-11-09  
**상태**: 진행 중 (Phase 1)
