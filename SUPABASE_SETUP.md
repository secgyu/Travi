# Supabase 스키마 가이드

## 📋 개요

Travi 프로젝트를 위한 완전한 Supabase 스키마를 생성했습니다. 프로젝트의 모든 기능을 지원하는 데이터베이스 구조입니다.

## 📦 생성된 파일

```
supabase/
├── schema.sql                              # 전체 스키마 정의 (테이블, 인덱스, RLS 정책 등)
├── migrations/
│   └── 20250116000000_initial_schema.sql  # 마이그레이션 파일
├── README.md                               # 상세 문서
└── .gitignore                              # Git 제외 파일

scripts/
├── init-supabase.js                        # 스키마 초기화 스크립트
└── seed-supabase.js                        # 샘플 데이터 시드 스크립트

types/
└── supabase.ts                             # TypeScript 타입 정의
```

## 🗄️ 데이터베이스 스키마

### 주요 테이블

1. **users** - 사용자 정보
2. **travel_plans** - 여행 계획
3. **budget_items** - 예산 항목
4. **chat_messages** - AI 챗봇 대화 기록
5. **saved_guides** - 저장된 가이드
6. **saved_cities** - 찜한 도시
7. **travel_plan_likes** - 여행 계획 좋아요
8. **faqs** - FAQ
9. **support_tickets** - 고객 문의

### 주요 기능

- ✅ Row Level Security (RLS) 정책 적용
- ✅ 자동 타임스탬프 업데이트 트리거
- ✅ 외래 키 관계 설정
- ✅ 인덱스 최적화
- ✅ JSONB 컬럼으로 유연한 데이터 구조
- ✅ 뷰(Views)를 통한 편리한 데이터 조회

## 🚀 스키마 적용 방법

### 방법 1: Supabase CLI (권장) ⭐

```bash
# 1. Supabase CLI 설치
npm install -g supabase

# 2. 프로젝트 링크
supabase link --project-ref your-project-ref

# 3. 스키마 적용
supabase db push
```

### 방법 2: Supabase Dashboard

1. [Supabase Dashboard](https://app.supabase.com) 접속
2. **SQL Editor** 선택
3. `supabase/schema.sql` 파일 내용 복사 & 붙여넣기
4. **Run** 버튼 클릭

### 방법 3: 스크립트 사용

```bash
# 안내 메시지 출력
node scripts/init-supabase.js
```

## 🌱 샘플 데이터 생성

개발 환경에서 테스트용 데이터를 생성할 수 있습니다:

```bash
# 환경 변수 설정 필요 (.env.local)
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...

# 샘플 데이터 시드
npm run supabase:seed
```

**생성되는 데이터:**
- 테스트 사용자 2명
- 샘플 여행 계획 2개
- 예산 항목 5개
- 저장된 가이드 2개
- 찜한 도시 3개

**테스트 계정:**
- Email: `test@example.com`
- Password: `password123`

## 📝 NPM 스크립트

`package.json`에 다음 스크립트가 추가되었습니다:

```json
{
  "scripts": {
    "supabase:init": "node scripts/init-supabase.js",
    "supabase:seed": "node scripts/seed-supabase.js",
    "supabase:types": "supabase gen types typescript --local > types/supabase.ts",
    "supabase:reset": "supabase db reset",
    "supabase:push": "supabase db push"
  }
}
```

## 🔐 보안 (RLS)

모든 테이블에 Row Level Security가 적용되어:
- 사용자는 자신의 데이터만 접근 가능
- 공개 여행 계획은 모두가 조회 가능
- FAQ는 모두에게 공개

## 💡 프로그래밍/스크립트 기반 스키마 생성

**네, 가능합니다!** 여러 방법이 있습니다:

### 1. **Supabase CLI** (가장 권장) ✅
```bash
# 마이그레이션 파일을 통한 스키마 관리
supabase migration new add_feature
supabase db push
```

### 2. **Node.js 스크립트**
- `scripts/init-supabase.js`: 스키마 초기화 가이드 제공
- `scripts/seed-supabase.js`: 샘플 데이터 생성

### 3. **Supabase JavaScript SDK**
```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(url, serviceKey)

// 테이블 조작
await supabase.from('users').insert({...})
```

### 4. **Prisma** (선택적)
```bash
npm install prisma @prisma/client
npx prisma init
npx prisma db push
```

### 5. **TypeORM / Drizzle ORM** (선택적)
- ORM을 사용한 스키마 정의 및 마이그레이션

## 📖 상세 문서

더 자세한 정보는 `supabase/README.md`를 참고하세요:
- 테이블 상세 설명
- 인덱스 및 성능 최적화
- RLS 정책 상세
- 문제 해결 가이드
- 백업 및 복구 방법

## 🔗 다음 단계

1. ✅ Supabase 프로젝트 생성
2. ✅ 환경 변수 설정 (`.env.local`)
3. ⬜ 스키마 적용 (`supabase db push` 또는 Dashboard)
4. ⬜ 샘플 데이터 시드 (선택적)
5. ⬜ 애플리케이션 코드와 연동 테스트

## 🆘 도움이 필요하신가요?

- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- `supabase/README.md` 참고

