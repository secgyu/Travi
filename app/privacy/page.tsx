import { PageHeader } from "@/components/page-header";
import { Footer } from "@/components/footer";
import { Mail } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/20 via-background to-background">
      <PageHeader title="개인정보처리방침" />

      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="rounded-xl bg-card p-8 shadow-sm">
          <div className="mb-8 text-sm text-muted-foreground">시행일: 2025년 1월 1일</div>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-foreground">1. 수집하는 개인정보 항목</h2>
            <div className="space-y-4 leading-relaxed text-foreground/90">
              <div>
                <h3 className="mb-2 font-semibold text-foreground">가. 필수 항목</h3>
                <ul className="ml-6 list-disc space-y-1">
                  <li>이메일 주소</li>
                  <li>비밀번호 (암호화 저장)</li>
                  <li>닉네임</li>
                  <li>서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">나. 선택 항목</h3>
                <ul className="ml-6 list-disc space-y-1">
                  <li>프로필 사진</li>
                  <li>생년월일</li>
                  <li>성별</li>
                  <li>여행 선호도 정보</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-foreground">2. 개인정보 수집 및 이용목적</h2>
            <div className="space-y-3 leading-relaxed text-foreground/90">
              <p>회사는 수집한 개인정보를 다음의 목적을 위해 활용합니다:</p>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">
                    가. 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산
                  </h3>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>맞춤형 여행 일정 생성 및 추천</li>
                    <li>여행 정보 제공</li>
                    <li>본인인증 및 결제 서비스</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">나. 회원 관리</h3>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>회원제 서비스 이용에 따른 본인확인</li>
                    <li>개인 식별</li>
                    <li>불량회원의 부정 이용 방지와 비인가 사용 방지</li>
                    <li>가입 의사 확인</li>
                    <li>연령확인</li>
                    <li>불만처리 등 민원처리</li>
                    <li>고지사항 전달</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">다. 마케팅 및 광고에 활용</h3>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>신규 서비스 개발 및 맞춤 서비스 제공</li>
                    <li>이벤트 및 광고성 정보 제공 및 참여기회 제공</li>
                    <li>인구통계학적 특성에 따른 서비스 제공 및 광고 게재</li>
                    <li>서비스의 유효성 확인</li>
                    <li>접속빈도 파악 또는 회원의 서비스 이용에 대한 통계</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-foreground">3. 개인정보 보유 및 이용기간</h2>
            <div className="space-y-3 leading-relaxed text-foreground/90">
              <p>
                회사는 개인정보 수집 및 이용목적이 달성된 후에는 예외 없이 해당 정보를 지체 없이 파기합니다. 단, 다음의
                정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">가. 회사 내부 방침에 의한 정보보유 사유</h3>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>부정이용기록: 1년 (부정 이용 방지)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-foreground">나. 관련법령에 의한 정보보유 사유</h3>
                  <ul className="ml-6 list-disc space-y-1">
                    <li>계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래법)</li>
                    <li>대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래법)</li>
                    <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래법)</li>
                    <li>웹사이트 방문 기록: 3개월 (통신비밀보호법)</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-foreground">4. 개인정보 제3자 제공</h2>
            <div className="space-y-3 leading-relaxed text-foreground/90">
              <p>
                회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, 아래의 경우에는 예외로 합니다:
              </p>
              <ul className="ml-6 list-disc space-y-2">
                <li>이용자들이 사전에 동의한 경우</li>
                <li>
                  법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우
                </li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-foreground">5. 개인정보처리 위탁</h2>
            <div className="space-y-3 leading-relaxed text-foreground/90">
              <p>
                회사는 서비스 향상을 위해서 아래와 같이 개인정보를 위탁하고 있으며, 관계 법령에 따라 위탁계약 시
                개인정보가 안전하게 관리될 수 있도록 필요한 사항을 규정하고 있습니다.
              </p>
              <div className="mt-4 overflow-hidden rounded-lg border border-border">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="border-b border-border px-4 py-3 text-left font-semibold">수탁업체</th>
                      <th className="border-b border-border px-4 py-3 text-left font-semibold">위탁업무 내용</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border-b border-border px-4 py-3">AWS</td>
                      <td className="border-b border-border px-4 py-3">클라우드 서버 제공</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">결제 대행사</td>
                      <td className="px-4 py-3">결제 처리</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-foreground">6. 이용자의 권리와 행사 방법</h2>
            <div className="space-y-3 leading-relaxed text-foreground/90">
              <p>
                이용자 및 법정 대리인은 언제든지 등록되어 있는 자신 혹은 당해 만 14세 미만 아동의 개인정보를 조회하거나
                수정할 수 있으며, 가입해지를 요청할 수도 있습니다.
              </p>
              <p>
                개인정보 조회 및 수정을 위해서는 '개인정보변경'을, 가입해지(동의철회)를 위해서는 "회원탈퇴"를 클릭하여
                본인 확인 절차를 거치신 후 직접 열람, 정정 또는 탈퇴가 가능합니다.
              </p>
              <p>혹은 개인정보보호책임자에게 서면, 전화 또는 이메일로 연락하시면 지체 없이 조치하겠습니다.</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-foreground">7. 개인정보 보호책임자</h2>
            <div className="space-y-3 leading-relaxed text-foreground/90">
              <p>
                회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및
                피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
              </p>
              <div className="mt-4 rounded-lg border border-border bg-muted/50 p-6">
                <h3 className="mb-4 font-semibold text-foreground">개인정보 보호책임자</h3>
                <ul className="space-y-2 text-foreground/90">
                  <li>
                    <span className="font-medium">이름:</span> 홍길동
                  </li>
                  <li>
                    <span className="font-medium">직책:</span> 개인정보보호팀장
                  </li>
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span className="font-medium">이메일:</span> privacy@aitravelplanner.com
                  </li>
                  <li>
                    <span className="font-medium">전화:</span> 1588-0000
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-foreground">8. 쿠키(Cookie) 운영</h2>
            <div className="space-y-3 leading-relaxed text-foreground/90">
              <div>
                <h3 className="mb-2 font-semibold text-foreground">가. 쿠키란?</h3>
                <p>
                  회사는 개인화되고 맞춤화된 서비스를 제공하기 위해서 이용자의 정보를 저장하고 수시로 불러오는
                  '쿠키(cookie)'를 사용합니다. 쿠키는 웹사이트를 운영하는데 이용되는 서버가 이용자의 브라우저에게 보내는
                  아주 작은 텍스트 파일로 이용자 컴퓨터의 하드디스크에 저장됩니다.
                </p>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">나. 쿠키 사용 목적</h3>
                <ul className="ml-6 list-disc space-y-1">
                  <li>개인의 관심 분야에 따라 차별화된 정보 제공</li>
                  <li>회원과 비회원의 접속 빈도 또는 방문 시간 등을 분석</li>
                  <li>이용자의 취향과 관심분야를 파악 및 자취 추적</li>
                  <li>각종 이벤트 참여 정도 및 방문 횟수 파악 등을 통한 타겟 마케팅 및 개인 맞춤 서비스 제공</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-foreground">다. 쿠키 설정 거부 방법</h3>
                <p>
                  이용자는 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서 웹브라우저에서 옵션을 설정함으로써 모든
                  쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부할 수도
                  있습니다.
                </p>
              </div>
            </div>
          </section>

          <div className="mt-12 rounded-lg bg-accent/20 p-6">
            <p className="mb-2 font-semibold text-foreground">개인정보 관련 문의</p>
            <p className="flex items-center gap-2 text-foreground/90">
              <Mail className="h-4 w-4" />
              privacy@aitravelplanner.com
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
