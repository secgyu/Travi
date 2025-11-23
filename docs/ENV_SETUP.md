# Travi 프로젝트 환경 변수 설정

## 📋 필수 환경 변수

프로젝트 루트에 `.env.local` 파일을 생성하고 아래 내용을 추가하세요:

```bash
# ========================================
# 1. 데이터베이스 (Supabase)
# ========================================
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# ========================================
# 2. 인증 (NextAuth)
# ========================================
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key

# ========================================
# 3. AI 채팅 (OpenAI)
# ========================================
OPENAI_API_KEY=your_openai_api_key

# ========================================
# 4. GPS Geocoding (선택사항, 권장)
# ========================================
GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# ========================================
# 5. 소셜 로그인 (선택사항)
# ========================================
# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Kakao OAuth (한국 사용자용)
KAKAO_CLIENT_ID=your_kakao_rest_api_key
KAKAO_CLIENT_SECRET=your_kakao_client_secret
```

---

## 🔑 API Key 발급 방법

### 1. Supabase (필수)
1. https://supabase.com 접속 및 회원가입
2. **New Project** 생성
3. **Settings** > **API**에서 확인:
   - `NEXT_PUBLIC_SUPABASE_URL`: Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: anon/public key

### 2. OpenAI (필수)
1. https://platform.openai.com 접속
2. **API keys** 메뉴에서 **Create new secret key**
3. 생성된 키 복사 (한 번만 표시됨)
4. 비용: GPT-4o-mini 사용 시 매우 저렴 (대화 100회 약 $0.10)

### 3. Google Maps API (선택, 권장)
**GPS 좌표 조회에 사용 - 설정 안 해도 작동하지만 정확도 낮음**

1. https://console.cloud.google.com 접속
2. 프로젝트 생성
3. **APIs & Services** > **Enable APIs and Services**
4. **Geocoding API** 활성화
5. **Credentials** > **Create Credentials** > **API key**
6. 무료 크레딧: 월 $200 (약 28,000회 호출)

👉 **자세한 설정**: `docs/GEOCODING_GUIDE.md` 참고

### 4. NextAuth Secret
임의의 긴 문자열 생성:
```bash
# 터미널에서 실행
openssl rand -base64 32
```

---

## 🧪 설정 확인

### 1. 파일 생성 확인
```bash
# .env.local 파일이 있는지 확인
ls -la .env.local
```

### 2. 개발 서버 시작
```bash
npm run dev
```

### 3. 각 기능 테스트
- ✅ **홈페이지**: http://localhost:3000 접속
- ✅ **AI 채팅**: `/chat` 페이지에서 여행 계획 생성
- ✅ **GPS 조회**: 여행 계획 저장 시 콘솔에서 로그 확인
- ✅ **인증**: `/login` 페이지에서 로그인 테스트

---

## 📁 파일 구조

```
travi/
├── .env.local          ← 여기에 환경 변수 설정
├── .gitignore          ← .env.local이 포함되어 있는지 확인
└── docs/
    └── GEOCODING_GUIDE.md  ← GPS 설정 상세 가이드
```

---

## ⚠️ 주의사항

1. **절대 GitHub에 올리지 마세요**: `.env.local`은 `.gitignore`에 포함
2. **키 노출 시**: 즉시 해당 서비스에서 키 재발급
3. **프로덕션 배포**: Vercel/Netlify 환경 변수에 동일하게 설정

---

## 🚀 빠른 시작 (최소 설정)

**GPS 없이 기본 기능만 사용하려면:**

```bash
# 필수 4개만 설정
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXTAUTH_SECRET=...
OPENAI_API_KEY=...
```

이것만으로도:
- ✅ AI 채팅
- ✅ 여행 계획 생성
- ✅ 데이터 저장
- ⚠️ GPS는 도시 중심으로만 표시

---

## 💡 비용 예상

| 서비스 | 무료 범위 | 예상 비용 (개인) |
|--------|-----------|------------------|
| Supabase | 500MB DB, 2GB 대역폭 | 무료 |
| OpenAI | - | 월 $5 이하 |
| Google Maps | 월 $200 크레딧 | 무료 |
| **합계** | - | **월 $5 이하** |

---

**더 자세한 설정은 `docs/GEOCODING_GUIDE.md`를 참고하세요! 🚀**


