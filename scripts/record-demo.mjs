/**
 * WebM 녹화 스크립트
 */

import { chromium } from 'playwright';
import { readdirSync, renameSync, existsSync, mkdirSync, unlinkSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const screenshotsDir = join(__dirname, '..', 'screenshots');

if (!existsSync(screenshotsDir)) {
  mkdirSync(screenshotsDir, { recursive: true });
}

const BASE_URL = 'http://localhost:3000';
const VIEWPORT = { width: 1280, height: 800 };

async function main() {
  console.log('🎬 WebM 녹화 시작...\n');

  const browser = await chromium.launch({ headless: true });

  // WebM 녹화 컨텍스트
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    locale: 'ko-KR',
    recordVideo: {
      dir: screenshotsDir,
      size: { width: VIEWPORT.width, height: VIEWPORT.height },
    },
  });

  const page = await context.newPage();

  // 메인 페이지
  console.log('📹 메인 페이지...');
  await page.goto(BASE_URL, { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(1500);
  
  // 스크롤
  await page.evaluate(() => window.scrollTo({ top: 400, behavior: 'smooth' }));
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await page.waitForTimeout(800);

  // 채팅 페이지
  console.log('📹 채팅 페이지...');
  await page.goto(`${BASE_URL}/chat`, { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(1000);

  // 타이핑
  const textarea = page.locator('textarea').first();
  if (await textarea.isVisible()) {
    await textarea.focus();
    await page.waitForTimeout(300);
    const message = '3박 4일 도쿄 여행 일정 만들어줘';
    for (const char of message) {
      await textarea.type(char, { delay: 60 });
    }
    await page.waitForTimeout(1000);
  }

  // 도시 탐색
  console.log('📹 도시 탐색...');
  await page.goto(`${BASE_URL}/explore`, { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(1200);

  // 도쿄 상세
  console.log('📹 도쿄 상세...');
  await page.goto(`${BASE_URL}/explore/tokyo`, { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo({ top: 400, behavior: 'smooth' }));
  await page.waitForTimeout(1000);

  // 데모 결과
  console.log('📹 데모 결과...');
  await page.goto(`${BASE_URL}/demo/tokyo`, { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(2000);

  // 예산 계산기
  console.log('📹 예산 계산기...');
  await page.goto(`${BASE_URL}/budget`, { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(800);

  const budgetInput = page.locator('input[type="number"]').first();
  if (await budgetInput.isVisible()) {
    await budgetInput.fill('');
    for (const char of '1500000') {
      await budgetInput.type(char, { delay: 80 });
    }
    await page.waitForTimeout(1200);
  }

  // 녹화 종료
  await page.close();
  await context.close();
  await browser.close();

  // WebM 파일 이름 변경
  console.log('📁 파일 정리 중...');
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const files = readdirSync(screenshotsDir);
  const webmFile = files.find(f => f.endsWith('.webm') && f !== 'demo.webm');
  if (webmFile) {
    const oldPath = join(screenshotsDir, webmFile);
    const newPath = join(screenshotsDir, 'demo.webm');
    try {
      if (existsSync(newPath)) {
        unlinkSync(newPath);
      }
      renameSync(oldPath, newPath);
      console.log('   ✅ demo.webm 저장됨');
    } catch (e) {
      console.log('   ⚠️ WebM 파일명 변경 실패:', e.message);
    }
  }

  console.log('\n✨ WebM 녹화 완료!');
}

main().catch(console.error);
