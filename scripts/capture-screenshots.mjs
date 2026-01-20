/**
 * Travi 스크린샷 및 녹화 스크립트
 * 
 * 주요 기능들의 스크린샷과 GIF/WebM을 생성합니다.
 * 
 * 사용법: node scripts/capture-screenshots.mjs
 */

import { chromium } from 'playwright';
import { existsSync, mkdirSync, readdirSync, unlinkSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import GIFEncoder from 'gif-encoder-2';
import { PNG } from 'pngjs';
import { createWriteStream } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const screenshotsDir = join(__dirname, '..', 'screenshots');
const framesDir = join(screenshotsDir, 'frames');

// 스크린샷 폴더 생성
if (!existsSync(screenshotsDir)) {
  mkdirSync(screenshotsDir, { recursive: true });
}
if (!existsSync(framesDir)) {
  mkdirSync(framesDir, { recursive: true });
}

const BASE_URL = 'http://localhost:3000';
const VIEWPORT = { width: 1280, height: 800 };

// 프레임들을 GIF로 변환
async function framesToGif(frameFiles, outputPath, delay = 100) {
  if (frameFiles.length === 0) return;

  const firstFrame = PNG.sync.read(await import('fs').then(fs => fs.readFileSync(frameFiles[0])));
  const { width, height } = firstFrame;

  const encoder = new GIFEncoder(width, height, 'neuquant', true);
  const writeStream = createWriteStream(outputPath);

  encoder.createReadStream().pipe(writeStream);
  encoder.start();
  encoder.setDelay(delay);
  encoder.setQuality(10); // 품질 (낮을수록 좋음, 1-30)
  encoder.setRepeat(0); // 무한 반복

  for (const frameFile of frameFiles) {
    const fs = await import('fs');
    const data = fs.readFileSync(frameFile);
    const png = PNG.sync.read(data);
    encoder.addFrame(png.data);
  }

  encoder.finish();

  return new Promise((resolve) => {
    writeStream.on('finish', resolve);
  });
}

// 프레임 폴더 정리
function cleanFrames() {
  if (existsSync(framesDir)) {
    const files = readdirSync(framesDir);
    for (const file of files) {
      unlinkSync(join(framesDir, file));
    }
  }
}

async function main() {
  console.log('🎬 Travi 스크린샷 및 녹화 시작...\n');

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2, // 고해상도
    locale: 'ko-KR',
  });

  const page = await context.newPage();

  // ==========================================
  // 1. 메인 페이지 스크린샷
  // ==========================================
  console.log('📸 1. 메인 페이지 캡처 중...');
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  await page.screenshot({
    path: join(screenshotsDir, '01-home.png'),
    fullPage: false,
  });
  console.log('   ✅ 01-home.png 저장됨');

  // ==========================================
  // 2. 도시 탐색 페이지
  // ==========================================
  console.log('📸 2. 도시 탐색 페이지 캡처 중...');
  await page.goto(`${BASE_URL}/explore`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  await page.screenshot({
    path: join(screenshotsDir, '02-explore.png'),
    fullPage: false,
  });
  console.log('   ✅ 02-explore.png 저장됨');

  // ==========================================
  // 3. 도쿄 상세 페이지
  // ==========================================
  console.log('📸 3. 도쿄 상세 페이지 캡처 중...');
  await page.goto(`${BASE_URL}/explore/tokyo`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  await page.screenshot({
    path: join(screenshotsDir, '03-explore-tokyo.png'),
    fullPage: false,
  });
  console.log('   ✅ 03-explore-tokyo.png 저장됨');

  // ==========================================
  // 4. 여행 가이드 목록
  // ==========================================
  console.log('📸 4. 여행 가이드 페이지 캡처 중...');
  await page.goto(`${BASE_URL}/guide`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  await page.screenshot({
    path: join(screenshotsDir, '04-guide.png'),
    fullPage: false,
  });
  console.log('   ✅ 04-guide.png 저장됨');

  // ==========================================
  // 5. AI 채팅 페이지 (빈 상태)
  // ==========================================
  console.log('📸 5. AI 채팅 페이지 캡처 중...');
  await page.goto(`${BASE_URL}/chat`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  await page.screenshot({
    path: join(screenshotsDir, '05-chat.png'),
    fullPage: false,
  });
  console.log('   ✅ 05-chat.png 저장됨');

  // ==========================================
  // 6. 예산 계산기 (값 입력됨)
  // ==========================================
  console.log('📸 6. 예산 계산기 캡처 중...');
  await page.goto(`${BASE_URL}/budget`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // 예산 값 입력
  try {
    // 예산 입력 필드 찾기 및 값 입력
    const budgetInputs = await page.locator('input[type="number"]').all();
    if (budgetInputs.length > 0) {
      await budgetInputs[0].fill('1500000');
      await page.waitForTimeout(300);
    }
  } catch (e) {
    console.log('   (예산 입력 필드 찾기 실패, 기본 상태로 캡처)');
  }

  await page.screenshot({
    path: join(screenshotsDir, '06-budget.png'),
    fullPage: false,
  });
  console.log('   ✅ 06-budget.png 저장됨');

  // ==========================================
  // 7. 데모 결과 페이지 (도쿄)
  // ==========================================
  console.log('📸 7. 데모 결과 페이지 캡처 중...');
  await page.goto(`${BASE_URL}/demo/tokyo`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000); // 지도 로딩 대기

  await page.screenshot({
    path: join(screenshotsDir, '07-demo-tokyo.png'),
    fullPage: false,
  });
  console.log('   ✅ 07-demo-tokyo.png 저장됨');

  // ==========================================
  // 8. 모바일 홈 화면
  // ==========================================
  console.log('📸 8. 모바일 화면 캡처 중...');
  await page.setViewportSize({ width: 390, height: 844 }); // iPhone 14 Pro
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  await page.screenshot({
    path: join(screenshotsDir, 'mobile-home.png'),
    fullPage: false,
  });
  console.log('   ✅ mobile-home.png 저장됨');

  // ==========================================
  // 9. 모바일 채팅 화면
  // ==========================================
  await page.goto(`${BASE_URL}/chat`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  await page.screenshot({
    path: join(screenshotsDir, 'mobile-chat.png'),
    fullPage: false,
  });
  console.log('   ✅ mobile-chat.png 저장됨');

  // 뷰포트 복원
  await page.setViewportSize(VIEWPORT);

  // ==========================================
  // 10. 데모 GIF/WebM 녹화
  // ==========================================
  console.log('\n🎬 GIF/WebM 녹화 시작...');

  // 프레임 폴더 정리
  cleanFrames();

  // 메인 → 채팅 → 결과 흐름 녹화
  console.log('📹 메인 플로우 녹화 중...');

  // WebM 녹화 시작
  await context.close();
  const recordContext = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    locale: 'ko-KR',
    recordVideo: {
      dir: screenshotsDir,
      size: { width: VIEWPORT.width, height: VIEWPORT.height },
    },
  });

  const recordPage = await recordContext.newPage();

  // 메인 페이지
  await recordPage.goto(BASE_URL, { waitUntil: 'networkidle' });
  await recordPage.waitForTimeout(1500);

  // 스크롤 다운
  await recordPage.evaluate(() => window.scrollTo({ top: 400, behavior: 'smooth' }));
  await recordPage.waitForTimeout(1000);

  // 채팅 페이지로 이동
  const chatButton = recordPage.locator('text=AI 일정 만들기').first();
  if (await chatButton.isVisible()) {
    await chatButton.click();
    await recordPage.waitForTimeout(2000);
  } else {
    await recordPage.goto(`${BASE_URL}/chat`, { waitUntil: 'networkidle' });
    await recordPage.waitForTimeout(1500);
  }

  // 채팅 입력
  const textarea = recordPage.locator('textarea').first();
  if (await textarea.isVisible()) {
    await textarea.focus();
    await recordPage.waitForTimeout(500);
    
    // 타이핑 효과
    const message = '3박 4일 도쿄 여행 일정 만들어줘';
    for (const char of message) {
      await textarea.type(char, { delay: 80 });
    }
    await recordPage.waitForTimeout(1000);
  }

  // 도시 탐색
  await recordPage.goto(`${BASE_URL}/explore`, { waitUntil: 'networkidle' });
  await recordPage.waitForTimeout(1500);

  // 도쿄 클릭
  const tokyoCard = recordPage.locator('text=도쿄').first();
  if (await tokyoCard.isVisible()) {
    await tokyoCard.click();
    await recordPage.waitForTimeout(2000);
  }

  // 스크롤 다운
  await recordPage.evaluate(() => window.scrollTo({ top: 500, behavior: 'smooth' }));
  await recordPage.waitForTimeout(1500);

  // 데모 결과 페이지
  await recordPage.goto(`${BASE_URL}/demo/tokyo`, { waitUntil: 'networkidle' });
  await recordPage.waitForTimeout(3000);

  // 지도 확인을 위한 스크롤
  await recordPage.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await recordPage.waitForTimeout(1000);

  // 예산 계산기
  await recordPage.goto(`${BASE_URL}/budget`, { waitUntil: 'networkidle' });
  await recordPage.waitForTimeout(1500);

  // 값 입력
  const budgetInput = recordPage.locator('input[type="number"]').first();
  if (await budgetInput.isVisible()) {
    await budgetInput.fill('');
    await recordPage.waitForTimeout(300);
    for (const char of '1500000') {
      await budgetInput.type(char, { delay: 100 });
    }
    await recordPage.waitForTimeout(1500);
  }

  // 녹화 종료
  await recordPage.close();
  await recordContext.close();

  console.log('   ✅ WebM 녹화 완료');

  // WebM 파일 이름 변경
  const files = readdirSync(screenshotsDir);
  const webmFile = files.find(f => f.endsWith('.webm'));
  if (webmFile) {
    const fs = await import('fs');
    fs.renameSync(
      join(screenshotsDir, webmFile),
      join(screenshotsDir, 'demo.webm')
    );
    console.log('   ✅ demo.webm 저장됨');
  }

  // ==========================================
  // GIF 생성 (프레임 캡처 방식)
  // ==========================================
  console.log('📹 고품질 GIF 생성을 위한 프레임 캡처 중...');

  const gifContext = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1, // GIF는 1x로
    locale: 'ko-KR',
  });

  const gifPage = await gifContext.newPage();
  let frameCount = 0;

  async function captureFrame() {
    const framePath = join(framesDir, `frame_${String(frameCount).padStart(4, '0')}.png`);
    await gifPage.screenshot({ path: framePath });
    frameCount++;
  }

  // 메인 페이지
  await gifPage.goto(BASE_URL, { waitUntil: 'networkidle' });
  await captureFrame();
  await gifPage.waitForTimeout(500);
  await captureFrame();

  // 스크롤
  await gifPage.evaluate(() => window.scrollTo({ top: 300, behavior: 'instant' }));
  await captureFrame();
  await gifPage.waitForTimeout(300);
  await captureFrame();

  // 채팅 페이지
  await gifPage.goto(`${BASE_URL}/chat`, { waitUntil: 'networkidle' });
  for (let i = 0; i < 3; i++) {
    await captureFrame();
    await gifPage.waitForTimeout(300);
  }

  // 타이핑 효과
  const gifTextarea = gifPage.locator('textarea').first();
  if (await gifTextarea.isVisible()) {
    const message = '3박 4일 도쿄 여행';
    await gifTextarea.focus();
    await captureFrame();

    for (let i = 0; i < message.length; i += 2) {
      await gifTextarea.fill(message.substring(0, i + 2));
      await captureFrame();
    }
    await captureFrame();
  }

  // 탐색 페이지
  await gifPage.goto(`${BASE_URL}/explore`, { waitUntil: 'networkidle' });
  for (let i = 0; i < 3; i++) {
    await captureFrame();
    await gifPage.waitForTimeout(300);
  }

  // 도쿄 상세
  await gifPage.goto(`${BASE_URL}/explore/tokyo`, { waitUntil: 'networkidle' });
  for (let i = 0; i < 4; i++) {
    await captureFrame();
    await gifPage.waitForTimeout(300);
  }

  // 데모 결과
  await gifPage.goto(`${BASE_URL}/demo/tokyo`, { waitUntil: 'networkidle' });
  await gifPage.waitForTimeout(1500);
  for (let i = 0; i < 5; i++) {
    await captureFrame();
    await gifPage.waitForTimeout(400);
  }

  // 예산 페이지
  await gifPage.goto(`${BASE_URL}/budget`, { waitUntil: 'networkidle' });
  for (let i = 0; i < 3; i++) {
    await captureFrame();
    await gifPage.waitForTimeout(300);
  }

  await gifContext.close();

  // 프레임들을 GIF로 변환
  console.log('📹 프레임을 GIF로 변환 중...');
  const frameFiles = readdirSync(framesDir)
    .filter(f => f.endsWith('.png'))
    .sort()
    .map(f => join(framesDir, f));

  if (frameFiles.length > 0) {
    await framesToGif(frameFiles, join(screenshotsDir, 'demo.gif'), 150);
    console.log('   ✅ demo.gif 저장됨 (고품질)');
  }

  await browser.close();

  console.log('\n✨ 캡처 완료!');
  console.log(`📁 저장 위치: ${screenshotsDir}`);
  console.log('\n생성된 파일:');
  const finalFiles = readdirSync(screenshotsDir).filter(f => !f.startsWith('frame'));
  finalFiles.forEach(f => console.log(`   - ${f}`));
}

main().catch(console.error);
