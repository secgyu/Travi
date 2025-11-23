# GPS Geocoding 시스템 설정 가이드

이 프로젝트는 AI가 생성한 여행 장소의 GPS 좌표를 자동으로 조회하는 스마트 Geocoding 시스템을 사용합니다.

## 🎯 시스템 개요

### 작동 방식
1. **AI 채팅**에서 여행 계획 생성 시, 장소명(한글 + 영어)을 파싱
2. **여행 계획 저장** 버튼 클릭 시, 자동으로 각 장소의 GPS 좌표 조회
3. **다단계 전략**으로 최대한 정확한 좌표 획득:
   - ✅ 전략 1: Google Geocoding API (영어명 + 도시)
   - ✅ 전략 2: Google Geocoding API (영어명만)
   - ✅ 전략 3: Google Geocoding API (한글명 + 도시)
   - ✅ 전략 4: OpenAI GPT-4 (AI가 알고 있는 좌표)
   - ✅ 전략 5: 도시 중심 좌표 (최종 폴백)

### 신뢰도 등급
- **high**: 정확한 장소 (POI, 식당, 관광지 등)
- **medium**: 거리/구역 수준
- **low**: 도시 중심 또는 AI 추정

---

## 🔑 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 아래 내용을 추가하세요:

```bash
# Google Maps API Key (권장)
# https://console.cloud.google.com/apis/credentials
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

# OpenAI API Key (이미 있음 - 백업용으로도 사용)
OPENAI_API_KEY=your_openai_api_key_here
```

---

## 📦 Google Maps API 설정

### 1. Google Cloud Console 접속
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 프로젝트 생성 또는 기존 프로젝트 선택

### 2. API 활성화
1. 왼쪽 메뉴에서 **APIs & Services** > **Enable APIs and Services** 클릭
2. 다음 API들을 검색해서 활성화:
   - ✅ **Geocoding API** (필수)
   - ✅ **Places API** (선택, 더 정확한 결과)
   - ✅ **Maps JavaScript API** (선택, 지도 표시용)

### 3. API Key 생성
1. **APIs & Services** > **Credentials** 클릭
2. **+ CREATE CREDENTIALS** > **API key** 선택
3. API key가 생성되면 복사
4. (권장) **API key 제한** 설정:
   - **Application restrictions**: HTTP referrers (웹사이트) 또는 None (개발용)
   - **API restrictions**: Geocoding API만 선택

### 4. 환경 변수에 추가
```bash
GOOGLE_MAPS_API_KEY=AIzaSyC-xxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 5. 비용 관리
- **무료 크레딧**: 월 $200 (약 28,000회 Geocoding 호출)
- **Geocoding API 가격**: $5 per 1,000 requests
- **캐싱**: 같은 장소는 자동으로 캐싱되어 중복 호출 방지
- **무료 범위 내에서 사용**: 일 1,000회 이하면 무료

💡 **팁**: 개인 프로젝트라면 무료 크레딧으로 충분합니다!

---

## 🧪 테스트

### 1. 환경 변수 확인
```bash
# .env.local 파일이 있는지 확인
cat .env.local

# 개발 서버 재시작 (환경변수 적용)
npm run dev
```

### 2. 채팅으로 테스트
1. http://localhost:3000/chat 접속
2. "도쿄 3일 여행 계획 짜줘" 입력
3. AI 응답 완료 후 **"지도에서 일정 확인하기"** 버튼 클릭
4. 콘솔에서 GPS 조회 로그 확인:
   ```
   🔍 [Geocoding] 시부야 스크램블 교차로 (Shibuya Scramble Crossing) in 도쿄
   ✅ [Strategy 1] High confidence: Shibuya Scramble Crossing, 도쿄
   ✅ 시부야 스크램블 교차로: 35.659500, 139.700400 (high)
   ```

### 3. 결과 페이지에서 확인
- 각 장소 카드에 GPS 좌표와 신뢰도 표시
- 지도 영역에 GPS 좌표 프리뷰 표시

---

## 🔧 API 없이 사용하기

Google Maps API key가 없어도 작동합니다:
- OpenAI API로 백업 (정확도 낮음)
- 도시 중심 좌표로 폴백
- 모든 좌표가 `confidence: 'low'`로 표시됨

---

## 📊 캐싱 시스템

### 자동 캐싱
- 같은 장소는 메모리에 자동 캐싱
- API 호출 최소화로 비용 절감
- 서버 재시작 시 초기화

### 캐시 동작 예시
```
1차 조회: "시부야 스크램블 교차로" → Google API 호출
2차 조회: "시부야 스크램블 교차로" → 캐시에서 즉시 반환 ✅
```

---

## 🐛 문제 해결

### API Key 오류
```
❌ Geocoding API error: REQUEST_DENIED
```
**해결책**: 
1. Google Cloud Console에서 Geocoding API가 활성화되었는지 확인
2. API key가 올바르게 `.env.local`에 설정되었는지 확인
3. 개발 서버 재시작 (`npm run dev`)

### 모든 좌표가 'low' confidence
```
⚠️ [Strategy 5] City center fallback: 도쿄
```
**해결책**:
1. `GOOGLE_MAPS_API_KEY`가 설정되었는지 확인
2. API key에 Geocoding API 권한이 있는지 확인
3. API 할당량을 초과하지 않았는지 확인

### 한글 장소명이 검색 안 됨
✅ **이미 해결됨**: 
- AI가 영어명(subtitle)도 함께 제공
- 영어명 우선 검색으로 정확도 향상

---

## 📝 주요 파일

### 핵심 로직
- `lib/smart-geocoding.ts`: 스마트 Geocoding 라이브러리
- `app/api/geocode/route.ts`: Geocoding API 엔드포인트

### 통합 지점
- `app/chat/page.tsx`: 채팅에서 GPS 조회 통합
- `app/results/page.tsx`: 결과 페이지에서 GPS 표시

### 데이터 타입
```typescript
interface Activity {
  title: string;        // "시부야 스크램블 교차로"
  subtitle: string;     // "Shibuya Scramble Crossing"
  lat?: number;         // 35.659500
  lng?: number;         // 139.700400
  address?: string;     // "Tokyo, Japan"
  gps_confidence?: 'high' | 'medium' | 'low';
}
```

---

## 🎨 UI 표시

### 장소 카드
```
📍 35.659500, 139.700400 [정확]
Tokyo, Shibuya City, ...
```

### 지도 프리뷰
```
5개 장소의 GPS 좌표가 있습니다

1️⃣ 시부야 스크램블 교차로
   35.659500, 139.700400 (high)

2️⃣ 메이지 신궁
   35.676190, 139.699320 (high)
```

---

## 🚀 향후 개선 사항

1. **실제 지도 연동**: Kakao Map API 또는 Google Maps API
2. **경로 최적화**: 장소 간 최단 경로 계산
3. **수동 위치 조정**: 사용자가 직접 GPS 수정 가능
4. **POI 정보 추가**: 영업시간, 리뷰, 사진 등

---

## 💡 팁

- **개발 중**: API key 없이도 기본 동작 확인 가능
- **프로덕션**: Google Maps API 설정 권장
- **비용 절감**: 캐싱 시스템이 자동으로 중복 호출 방지
- **정확도**: 영어명을 함께 제공하면 90% 이상 정확

---

## 📞 지원

문제가 발생하면 다음을 확인하세요:
1. 콘솔 로그 (`F12` 개발자 도구)
2. 서버 로그 (터미널)
3. `.env.local` 파일 존재 여부

---

**Happy Geocoding! 🗺️✨**


