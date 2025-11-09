import { PageHeader } from "@/components/page-header";
import { Footer } from "@/components/footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/20 via-background to-background">
      <PageHeader title="이용약관" />

      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="rounded-xl bg-card p-8 shadow-sm">
          <div className="mb-8 text-sm text-muted-foreground">시행일: 2025년 1월 1일</div>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-foreground">제1조 (목적)</h2>
            <p className="leading-relaxed text-foreground/90">
              본 약관은 AI 여행 플래너(이하 "회사")가 제공하는 AI 기반 여행 계획 서비스(이하 "서비스")의 이용과 관련하여
              회사와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-foreground">제2조 (정의)</h2>
            <div className="space-y-3 leading-relaxed text-foreground/90">
              <p>본 약관에서 사용하는 용어의 정의는 다음과 같습니다:</p>
              <ol className="ml-6 list-decimal space-y-2">
                <li>"서비스"란 회사가 제공하는 AI 기반 여행 계획 및 추천 서비스를 말합니다.</li>
                <li>"회원"이란 본 약관에 동의하고 회사와 이용계약을 체결하여 서비스를 이용하는 자를 말합니다.</li>
                <li>
                  "아이디(ID)"란 회원의 식별과 서비스 이용을 위하여 회원이 설정하고 회사가 승인한 문자와 숫자의 조합을
                  말합니다.
                </li>
                <li>
                  "비밀번호"란 회원의 개인정보 보호를 위해 회원이 설정한 문자, 숫자 또는 특수문자의 조합을 말합니다.
                </li>
              </ol>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-foreground">제3조 (약관의 효력 및 변경)</h2>
            <div className="space-y-3 leading-relaxed text-foreground/90">
              <ol className="ml-6 list-decimal space-y-2">
                <li>본 약관은 서비스를 이용하고자 하는 모든 회원에게 그 효력이 발생합니다.</li>
                <li>회사는 필요한 경우 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있습니다.</li>
                <li>
                  약관이 변경되는 경우 회사는 변경사항을 시행일자 7일 전부터 서비스 내 공지사항을 통해 공지합니다.
                </li>
                <li>회원이 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다.</li>
              </ol>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-foreground">제4조 (서비스의 제공 및 변경)</h2>
            <div className="space-y-3 leading-relaxed text-foreground/90">
              <ol className="ml-6 list-decimal space-y-2">
                <li>
                  회사는 다음과 같은 서비스를 제공합니다:
                  <ul className="ml-6 mt-2 list-disc space-y-1">
                    <li>AI 기반 여행 일정 자동 생성</li>
                    <li>맞춤형 여행지 추천</li>
                    <li>여행 일정 관리 및 공유</li>
                    <li>여행 정보 제공</li>
                  </ul>
                </li>
                <li>
                  회사는 운영상 또는 기술상의 필요에 따라 제공하고 있는 서비스의 전부 또는 일부를 변경할 수 있습니다.
                </li>
                <li>
                  서비스의 내용, 이용방법, 이용시간에 대하여 변경이 있는 경우 회사는 변경사유, 변경될 서비스의 내용 및
                  제공일자 등을 그 변경 전 7일 이상 해당 서비스 초기화면에 게시합니다.
                </li>
              </ol>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-foreground">제5조 (회원가입)</h2>
            <div className="space-y-3 leading-relaxed text-foreground/90">
              <ol className="ml-6 list-decimal space-y-2">
                <li>
                  회원가입은 이용자가 약관의 내용에 대하여 동의를 한 다음 회원가입 신청을 하고 회사가 이러한 신청에
                  대하여 승낙함으로써 체결됩니다.
                </li>
                <li>회원가입 신청자가 만 14세 미만인 경우 법정대리인의 동의를 받아야 합니다.</li>
                <li>
                  회사는 다음 각 호에 해당하는 신청에 대하여는 승낙을 하지 않을 수 있습니다:
                  <ul className="ml-6 mt-2 list-disc space-y-1">
                    <li>실명이 아니거나 타인의 명의를 이용한 경우</li>
                    <li>허위의 정보를 기재하거나, 회사가 제시하는 내용을 기재하지 않은 경우</li>
                    <li>관련 법령에 위배되거나 사회의 안녕과 질서, 미풍양속을 저해할 목적으로 신청한 경우</li>
                  </ul>
                </li>
              </ol>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-foreground">제6조 (개인정보보호)</h2>
            <p className="leading-relaxed text-foreground/90">
              회사는 관련 법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 이용에
              대해서는 관련 법령 및 회사의 개인정보처리방침이 적용됩니다. 다만, 회사의 공식 사이트 이외의 링크된
              사이트에서는 회사의 개인정보처리방침이 적용되지 않습니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-foreground">제7조 (서비스 이용제한)</h2>
            <div className="space-y-3 leading-relaxed text-foreground/90">
              <p>
                회사는 회원이 다음 각 호에 해당하는 행위를 하는 경우 사전 통지 없이 서비스 이용을 제한하거나 중지할 수
                있습니다:
              </p>
              <ol className="ml-6 list-decimal space-y-2">
                <li>타인의 정보 도용</li>
                <li>회사가 게시한 정보의 변경</li>
                <li>회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시</li>
                <li>회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
                <li>회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
                <li>
                  외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위
                </li>
              </ol>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-foreground">제8조 (저작권의 귀속)</h2>
            <div className="space-y-3 leading-relaxed text-foreground/90">
              <ol className="ml-6 list-decimal space-y-2">
                <li>회사가 작성한 저작물에 대한 저작권 기타 지적재산권은 회사에 귀속합니다.</li>
                <li>
                  회원은 서비스를 이용함으로써 얻은 정보 중 회사에게 지적재산권이 귀속된 정보를 회사의 사전 승낙 없이
                  복제, 송신, 출판, 배포, 방송 기타 방법에 의하여 영리목적으로 이용하거나 제3자에게 이용하게 하여서는
                  안됩니다.
                </li>
                <li>회원이 서비스 내에 게시한 게시물의 저작권은 해당 게시물의 저작자에게 귀속됩니다.</li>
              </ol>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-foreground">제9조 (면책조항)</h2>
            <div className="space-y-3 leading-relaxed text-foreground/90">
              <ol className="ml-6 list-decimal space-y-2">
                <li>
                  회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에
                  관한 책임이 면제됩니다.
                </li>
                <li>회사는 회원의 귀책사유로 인한 서비스 이용의 장애에 대하여는 책임을 지지 않습니다.</li>
                <li>
                  회사는 회원이 서비스를 이용하여 기대하는 수익을 상실한 것에 대하여 책임을 지지 않으며, 그 밖의
                  서비스를 통하여 얻은 자료로 인한 손해에 관하여 책임을 지지 않습니다.
                </li>
                <li>
                  회사는 회원이 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여는 책임을 지지 않습니다.
                </li>
              </ol>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="mb-4 text-xl font-bold text-foreground">제10조 (분쟁해결)</h2>
            <div className="space-y-3 leading-relaxed text-foreground/90">
              <ol className="ml-6 list-decimal space-y-2">
                <li>
                  회사는 회원으로부터 제출되는 불만사항 및 의견을 우선적으로 처리합니다. 다만, 신속한 처리가 곤란한
                  경우에는 회원에게 그 사유와 처리일정을 즉시 통보합니다.
                </li>
                <li>
                  회사와 회원 간에 발생한 분쟁은 전자거래기본법 제28조 및 동 시행령 제15조에 의하여 설치된
                  전자거래분쟁조정위원회의 조정에 따를 수 있습니다.
                </li>
                <li>
                  서비스 이용으로 발생한 분쟁에 대해 소송이 제기될 경우 회사의 본사 소재지를 관할하는 법원을 관할
                  법원으로 합니다.
                </li>
              </ol>
            </div>
          </section>

          <div className="mt-12 rounded-lg bg-muted p-6 text-center">
            <p className="text-sm text-muted-foreground">본 약관은 2025년 1월 1일부터 시행됩니다.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
