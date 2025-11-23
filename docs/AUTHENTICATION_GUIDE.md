# 인증 & 프로필 관리 가이드

## 아키텍처 개요

### 2-Layer 구조
```
┌─────────────────────────────────────┐
│         NextAuth (인증)             │
│  - 로그인/로그아웃                  │
│  - 세션 관리 (JWT)                  │
│  - OAuth 연동                       │
└─────────────────────────────────────┘
              ↓ user.id (UUID)
┌─────────────────────────────────────┐
│    Supabase DB (프로필 데이터)      │
│  - 이름, 이메일                     │
│  - 취미, 선호도 (preferences)       │
│  - 바이오, 프로필 사진              │
│  - 여행 계획, 즐겨찾기 등           │
└─────────────────────────────────────┘
```

## 데이터 흐름

### 1. 로그인 시
```typescript
// OAuth 로그인 (Google/Naver/Kakao)
1. 사용자가 OAuth 로그인
2. NextAuth signIn callback 실행
3. Supabase DB에서 이메일로 사용자 조회
4. 없으면 새로 생성, 있으면 기존 UUID 가져오기
5. UUID를 JWT 토큰에 저장
6. 세션에 user.id로 포함
```

### 2. 프로필 조회 시
```typescript
// 서버 컴포넌트
const session = await getServerSession(authOptions);
const userId = session.user.id; // Supabase DB의 UUID

const supabase = await createClient();
const { data: user } = await supabase
  .from("users")
  .select("*")
  .eq("id", userId)
  .single();

// user.preferences.travelStyle 등 추가 정보 사용
```

### 3. 프로필 업데이트 시
```typescript
// 클라이언트
const response = await fetch("/api/profile", {
  method: "PUT",
  body: JSON.stringify({
    name: "홍길동",
    bio: "여행을 좋아하는 개발자",
    preferences: {
      travelStyle: "미식 & 문화 탐방",
      favoriteCountries: ["일본", "태국"],
      budget: "중간",
    },
  }),
});
```

## 코드 예제

### 서버 컴포넌트에서 사용
```typescript
// app/my/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createClient } from "@/utils/supabase/server";

export default async function MyPage() {
  // 1. 인증 확인
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  // 2. DB에서 프로필 조회
  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", session.user.id)
    .single();

  // 3. 추가 정보 사용
  return (
    <div>
      <h1>{profile.name}</h1>
      <p>취미: {profile.preferences?.travelStyle}</p>
      <p>자기소개: {profile.bio}</p>
    </div>
  );
}
```

### 클라이언트 컴포넌트에서 사용
```typescript
"use client";
import { useAuth } from "@/lib/auth-context";

export default function MyComponent() {
  const { user, loading } = useAuth();

  if (loading) return <div>로딩 중...</div>;
  if (!user) return <div>로그인이 필요합니다</div>;

  return <div>안녕하세요, {user.name}님</div>;
}
```

## DB 스키마 (users 테이블)

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    password TEXT,                    -- credentials 로그인용
    provider TEXT NOT NULL,            -- 'google', 'naver', 'kakao', 'credentials'
    avatar_url TEXT,
    bio TEXT,
    preferences JSONB DEFAULT '{}'::jsonb,  -- 추가 정보 저장
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_login_at TIMESTAMPTZ
);
```

### preferences 필드 예제
```json
{
  "travelStyle": "미식 & 문화 탐방",
  "favoriteCountries": ["일본", "태국", "유럽"],
  "budget": "중간",
  "interests": ["맛집 탐방", "사진", "역사"],
  "travelFrequency": "분기별 1회",
  "accommodation": "호텔 선호"
}
```

## API 엔드포인트

### GET /api/profile
사용자 프로필 조회
```typescript
const response = await fetch("/api/profile");
const { user } = await response.json();
```

### PUT /api/profile
프로필 업데이트
```typescript
const response = await fetch("/api/profile", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "홍길동",
    bio: "여행 블로거",
    preferences: {
      travelStyle: "액티비티 & 모험",
    },
  }),
});
```

## 주의사항

1. **인증은 NextAuth**: 로그인/로그아웃, 세션 관리
2. **데이터는 Supabase DB**: 프로필, 취미, 여행 계획 등
3. **ID 매칭**: `session.user.id` = Supabase `users.id` (UUID)
4. **preferences는 JSONB**: 자유롭게 구조 정의 가능

## 확장 예제

### 여행 스타일 선호도 저장
```typescript
await fetch("/api/profile", {
  method: "PUT",
  body: JSON.stringify({
    preferences: {
      travelStyle: "미식 & 문화 탐방",
      budget: "럭셔리",
      pace: "여유로운",
      accommodation: "5성급 호텔",
      activities: ["미술관", "박물관", "로컬 맛집"],
    },
  }),
});
```

### 프로필에서 조회
```typescript
const { preferences } = dbUser;
console.log(preferences.travelStyle); // "미식 & 문화 탐방"
console.log(preferences.budget); // "럭셔리"
```

