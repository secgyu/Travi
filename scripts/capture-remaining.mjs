/**
 * 나머지 스크린샷 캡처 스크립트 (모바일 화면)
 */

import { chromium } from 'playwright';
import { existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const screenshotsDir = join(__dirname, '..', 'screenshots');

if (!existsSync(screenshotsDir)) {
  mkdirSync(screenshotsDir, { recursive: true });
}

const BASE_URL = 'http://localhost:3000';

async function main() {
  console.log('🎬 모바일 스크린샷 캡처 시작...\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    locale: 'ko-KR',
  });

  const page = await context.newPage();

  // 모바일 홈
  console.log('📸 모바일 홈 캡처 중...');
  await page.goto(BASE_URL, { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: join(screenshotsDir, 'mobile-home.png'),
    fullPage: false,
  });
  console.log('   ✅ mobile-home.png 저장됨');

  // 모바일 채팅
  console.log('📸 모바일 채팅 캡처 중...');
  await page.goto(`${BASE_URL}/chat`, { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: join(screenshotsDir, 'mobile-chat.png'),
    fullPage: false,
  });
  console.log('   ✅ mobile-chat.png 저장됨');

  // 데모 도쿄 (demo 페이지 사용)
  console.log('📸 데모 결과 페이지 캡처 중...');
  await context.close();
  
  const desktopContext = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
    locale: 'ko-KR',
  });
  const desktopPage = await desktopContext.newPage();
  
  await desktopPage.goto(`${BASE_URL}/demo/tokyo`, { waitUntil: 'load', timeout: 15000 });
  await desktopPage.waitForTimeout(2000);
  await desktopPage.screenshot({
    path: join(screenshotsDir, '07-demo-tokyo.png'),
    fullPage: false,
  });
  console.log('   ✅ 07-demo-tokyo.png 저장됨');

  await desktopContext.close();
  await browser.close();
  console.log('\n✨ 스크린샷 캡처 완료!');
}

main().catch(console.error);
