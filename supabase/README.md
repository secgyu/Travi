# Travi Supabase 스키마

이 디렉토리는 Travi 프로젝트의 Supabase 데이터베이스 스키마와 관련 스크립트를 포함합니다.

## 📁 파일 구조

```
supabase/
├── schema.sql                    # 전체 데이터베이스 스키마
├── migrations/                   # 마이그레이션 파일
│   └── 20250116000000_initial_schema.sql
└── README.md                     # 이 파일
```

## 🗄️ 데이터베이스 테이블

### 1. **users** - 사용자 정보
- 이메일/비밀번호 인증 및 소셜 로그인 지원
- 프로필 정보 (이름, 아바타, 소개)
- 사용자 설정 (JSONB)

### 2. **travel_plans** - 여행 계획
- 여행지, 기간, 예산 정보
- 여행 스타일 및 동행인
- 상세 일정 (JSONB)
- 공개/비공개 설정
- 좋아요 및 조회수

### 3. **budget_items** - 예산 항목
- 카테고리별 예산 관리
- 항공, 숙박, 식비, 교통, 쇼핑 등
- 다중 통화 지원

### 4. **chat_messages** - AI 챗봇 대화 기록
- 세션 기반 대화 저장
- 사용자/어시스턴트 메시지 구분

### 5. **saved_guides** - 저장된 가이드
- 사용자가 북마크한 가이드 콘텐츠

### 6. **saved_cities** - 찜한 도시
- 관심 도시 저장 및 메모

### 7. **travel_plan_likes** - 여행 계획 좋아요
- 공개된 여행 계획에 대한 좋아요

### 8. **faqs** - FAQ
- 카테고리별 FAQ 관리
- 순서 및 활성화 상태

### 9. **support_tickets** - 고객 문의
- 문의 유형, 상태, 우선순위 관리
- 관리자 답변

## 🚀 스키마 적용 방법

### 방법 1: Supabase CLI 사용 (권장)

1. **Supabase CLI 설치**
```bash
npm install -g supabase
```

2. **프로젝트 초기화 및 링크**
```bash
# 새 프로젝트 초기화
supabase init

# 기존 Supabase 프로젝트에 링크
supabase link --project-ref your-project-ref
```

3. **스키마 적용**
```bash
# 로컬 개발 환경
supabase db reset

# 프로덕션 환경
supabase db push
```

### 방법 2: Supabase Dashboard 사용

1. [Supabase Dashboard](https://app.supabase.com) 접속
2. 프로젝트 선택
3. **SQL Editor** 메뉴 클릭
4. `supabase/schema.sql` 파일 내용 복사
5. SQL Editor에 붙여넣기
6. **Run** 버튼 클릭

### 방법 3: 스크립트 사용

```bash
# 환경 변수 설정 (.env 파일)
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# 스키마 초기화 (안내 메시지 출력)
node scripts/init-supabase.js
```

## 🌱 샘플 데이터 시드

개발 환경에서 테스트용 샘플 데이터를 생성할 수 있습니다:

```bash
node scripts/seed-supabase.js
```

이 스크립트는 다음을 생성합니다:
- 테스트 사용자 2명
- 샘플 여행 계획 2개
- 예산 항목 5개
- 저장된 가이드 2개
- 찜한 도시 3개

**샘플 계정:**
- Email: `test@example.com`
- Password: `password123`

## 🔐 보안 정책 (RLS)

모든 테이블에 Row Level Security (RLS)가 적용되어 있습니다:

- **users**: 본인의 데이터만 조회/수정 가능
- **travel_plans**: 본인의 계획 또는 공개된 계획만 조회 가능
- **budget_items**: 본인의 여행 계획에 속한 항목만 접근 가능
- **chat_messages**: 본인의 메시지만 조회/생성 가능
- **saved_guides/cities**: 본인의 저장 항목만 관리 가능
- **faqs**: 모두에게 공개 (RLS 비활성화)

## 📊 유용한 뷰 (Views)

### popular_travel_plans
공개된 인기 여행 계획 목록 (좋아요 및 조회수 기준)

```sql
SELECT * FROM popular_travel_plans LIMIT 10;
```

### user_travel_stats
사용자별 여행 통계 (총 계획 수, 완료 수, 예산 등)

```sql
SELECT * FROM user_travel_stats WHERE user_id = 'user-uuid';
```

## 🔧 유지보수

### 마이그레이션 생성

스키마 변경이 필요한 경우:

```bash
# 새 마이그레이션 파일 생성
supabase migration new add_new_feature

# 변경사항 작성 후 적용
supabase db push
```

### 백업

```bash
# 데이터베이스 백업
supabase db dump -f backup.sql
```

### 롤백

```bash
# 마지막 마이그레이션 롤백
supabase migration repair --status reverted
```

## 📝 환경 변수

`.env.local` 파일에 다음 변수들을 설정하세요:

```env
# Supabase 설정
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# 서버사이드 및 관리자 작업용 (절대 클라이언트에 노출 금지)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

## 🔗 추가 리소스

- [Supabase 문서](https://supabase.com/docs)
- [Supabase CLI 문서](https://supabase.com/docs/guides/cli)
- [PostgreSQL 문서](https://www.postgresql.org/docs/)

## 🆘 문제 해결

### 권한 오류
```sql
-- 권한 확인
SELECT * FROM information_schema.table_privileges 
WHERE grantee = 'authenticated';

-- 권한 부여
GRANT ALL ON public.table_name TO authenticated;
```

### RLS 정책 확인
```sql
-- 정책 목록 조회
SELECT * FROM pg_policies WHERE schemaname = 'public';
```

### 연결 테스트
```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(url, key)
const { data, error } = await supabase.from('users').select('count')
console.log(data, error)
```

## 📞 지원

문제가 발생하면 다음을 확인하세요:
1. Supabase 프로젝트 상태
2. 환경 변수 설정
3. RLS 정책
4. PostgreSQL 로그 (Supabase Dashboard > Database > Logs)

