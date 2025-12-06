import { Footer } from "@/components/footer";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Cookie, Settings, Shield } from "lucide-react";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <PageHeader title="쿠키 정책" />

      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12">
        {/* Introduction */}
        <Card className="border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <Cookie className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="mb-2 text-xl font-bold text-foreground">쿠키란?</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  쿠키는 웹사이트를 방문할 때 브라우저에 저장되는 작은 텍스트 파일입니다. 트래비는 쿠키를 사용하여
                  사용자 경험을 개선하고, 웹사이트 기능을 원활하게 제공하며, 서비스 품질을 향상시킵니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cookie Types */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-foreground">쿠키의 종류</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-lg font-semibold text-foreground">1. 필수 쿠키</h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  웹사이트의 기본 기능을 제공하기 위해 반드시 필요한 쿠키입니다. 이 쿠키 없이는 서비스를 이용할 수
                  없습니다.
                </p>
                <div className="rounded-lg bg-muted/50 p-4">
                  <h4 className="mb-2 font-medium text-foreground">사용 목적</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 로그인 상태 유지</li>
                    <li>• 보안 및 인증</li>
                    <li>• 세션 관리</li>
                    <li>• 사용자 설정 저장</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-lg font-semibold text-foreground">2. 기능 쿠키</h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  사용자가 선택한 옵션을 기억하여 더 나은 사용자 경험을 제공합니다.
                </p>
                <div className="rounded-lg bg-muted/50 p-4">
                  <h4 className="mb-2 font-medium text-foreground">사용 목적</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 언어 설정 저장</li>
                    <li>• 지역 설정 기억</li>
                    <li>• 사용자 인터페이스 커스터마이징</li>
                    <li>• 검색 필터 설정 유지</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-lg font-semibold text-foreground">3. 분석 쿠키</h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  웹사이트 사용 패턴을 분석하여 서비스를 개선하는 데 사용됩니다.
                </p>
                <div className="rounded-lg bg-muted/50 p-4">
                  <h4 className="mb-2 font-medium text-foreground">사용 목적</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 방문자 수 및 트래픽 분석</li>
                    <li>• 페이지 조회 수 측정</li>
                    <li>• 사용자 행동 패턴 파악</li>
                    <li>• 인기 콘텐츠 파악</li>
                  </ul>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">사용 서비스: Google Analytics, Vercel Analytics</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-3 text-lg font-semibold text-foreground">4. 마케팅 쿠키</h3>
                <p className="mb-3 text-sm text-muted-foreground">
                  사용자의 관심사에 맞는 맞춤형 광고를 제공하기 위해 사용됩니다.
                </p>
                <div className="rounded-lg bg-muted/50 p-4">
                  <h4 className="mb-2 font-medium text-foreground">사용 목적</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• 맞춤형 광고 제공</li>
                    <li>• 광고 효과 측정</li>
                    <li>• 리타겟팅 광고</li>
                    <li>• SNS 공유 기능</li>
                  </ul>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">제3자 서비스: 카카오, 네이버, Google, Facebook</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Cookie Management */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-foreground">쿠키 관리</h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">브라우저 설정</h3>
                    <p className="mb-3 text-sm text-muted-foreground">
                      대부분의 웹 브라우저는 쿠키를 관리할 수 있는 기능을 제공합니다. 브라우저 설정에서 쿠키를
                      차단하거나 삭제할 수 있습니다.
                    </p>
                  </div>

                  <div className="rounded-lg bg-muted/50 p-4">
                    <h4 className="mb-3 font-medium text-foreground">브라우저별 쿠키 설정 방법</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>
                        <strong>Chrome:</strong> 설정 → 개인정보 및 보안 → 쿠키 및 기타 사이트 데이터
                      </li>
                      <li>
                        <strong>Safari:</strong> 환경설정 → 개인정보 보호 → 쿠키 및 웹사이트 데이터
                      </li>
                      <li>
                        <strong>Firefox:</strong> 옵션 → 개인정보 및 보안 → 쿠키 및 사이트 데이터
                      </li>
                      <li>
                        <strong>Edge:</strong> 설정 → 쿠키 및 사이트 권한 → 쿠키 및 사이트 데이터 관리
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-4">
                    <p className="text-sm text-muted-foreground">
                      <strong className="text-foreground">주의:</strong> 필수 쿠키를 차단하면 로그인, 여행 계획 저장 등
                      일부 기능을 사용할 수 없습니다.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Cookie List */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-foreground">사용하는 쿠키 목록</h2>
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="pb-3 text-left font-semibold text-foreground">쿠키 이름</th>
                      <th className="pb-3 text-left font-semibold text-foreground">유형</th>
                      <th className="pb-3 text-left font-semibold text-foreground">목적</th>
                      <th className="pb-3 text-left font-semibold text-foreground">보유 기간</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="py-3 font-mono text-xs">session_id</td>
                      <td className="py-3 text-muted-foreground">필수</td>
                      <td className="py-3 text-muted-foreground">로그인 세션 유지</td>
                      <td className="py-3 text-muted-foreground">세션 종료 시</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-mono text-xs">auth_token</td>
                      <td className="py-3 text-muted-foreground">필수</td>
                      <td className="py-3 text-muted-foreground">인증 토큰 저장</td>
                      <td className="py-3 text-muted-foreground">30일</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-mono text-xs">user_prefs</td>
                      <td className="py-3 text-muted-foreground">기능</td>
                      <td className="py-3 text-muted-foreground">사용자 설정 저장</td>
                      <td className="py-3 text-muted-foreground">1년</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-mono text-xs">_ga</td>
                      <td className="py-3 text-muted-foreground">분석</td>
                      <td className="py-3 text-muted-foreground">Google Analytics</td>
                      <td className="py-3 text-muted-foreground">2년</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-mono text-xs">_fbp</td>
                      <td className="py-3 text-muted-foreground">마케팅</td>
                      <td className="py-3 text-muted-foreground">Facebook Pixel</td>
                      <td className="py-3 text-muted-foreground">90일</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Updates */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-foreground">정책 변경</h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="mb-3 text-sm text-muted-foreground">
                    트래비는 법률 변경이나 서비스 개선을 위해 쿠키 정책을 업데이트할 수 있습니다. 정책이 변경될 경우
                    웹사이트를 통해 공지하며, 중요한 변경사항은 이메일로 안내드립니다.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">최종 수정일:</strong> 2025년 1월 1일
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-foreground">문의</h2>
          <Card>
            <CardContent className="p-6">
              <p className="mb-4 text-sm text-muted-foreground">
                쿠키 정책에 대해 궁금한 점이 있으시면 아래 연락처로 문의해주세요.
              </p>
              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">
                  <strong className="text-foreground">이메일:</strong> privacy@travee.kr
                </p>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">고객센터:</strong> 1234-5678
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
      <Footer />
    </div>
  );
}
