/**
 * 고품질 GIF 생성 스크립트
 * 프레임을 캡처하고 GIF로 변환합니다.
 */

import { chromium } from 'playwright';
import { existsSync, mkdirSync, readdirSync, unlinkSync, readFileSync, createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import GIFEncoder from 'gif-encoder-2';
import { PNG } from 'pngjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const screenshotsDir = join(__dirname, '..', 'screenshots');
const framesDir = join(screenshotsDir, 'frames');

if (!existsSync(screenshotsDir)) mkdirSync(screenshotsDir, { recursive: true });
if (!existsSync(framesDir)) mkdirSync(framesDir, { recursive: true });

const BASE_URL = 'http://localhost:3000';
const VIEWPORT = { width: 1280, height: 800 };

// 프레임 폴더 정리
function cleanFrames() {
  if (existsSync(framesDir)) {
    const files = readdirSync(framesDir);
    for (const file of files) {
      unlinkSync(join(framesDir, file));
    }
  }
}

// 프레임들을 GIF로 변환
async function framesToGif(frameFiles, outputPath, delay = 150) {
  if (frameFiles.length === 0) return;

  const firstFrame = PNG.sync.read(readFileSync(frameFiles[0]));
  const { width, height } = firstFrame;

  const encoder = new GIFEncoder(width, height, 'neuquant', true);
  const writeStream = createWriteStream(outputPath);

  encoder.createReadStream().pipe(writeStream);
  encoder.start();
  encoder.setDelay(delay);
  encoder.setQuality(10);
  encoder.setRepeat(0);

  for (const frameFile of frameFiles) {
    const data = readFileSync(frameFile);
    const png = PNG.sync.read(data);
    encoder.addFrame(png.data);
  }

  encoder.finish();

  return new Promise((resolve) => {
    writeStream.on('finish', resolve);
  });
}

async function main() {
  console.log('🎬 고품질 GIF 생성 시작...\n');
  cleanFrames();

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 1,
    locale: 'ko-KR',
  });

  const page = await context.newPage();
  let frameCount = 0;

  async function captureFrame() {
    const framePath = join(framesDir, `frame_${String(frameCount).padStart(4, '0')}.png`);
    await page.screenshot({ path: framePath });
    frameCount++;
  }

  // 메인 페이지
  console.log('📹 메인 페이지 프레임 캡처...');
  await page.goto(BASE_URL, { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(500);
  await captureFrame();
  await captureFrame();

  // 스크롤
  await page.evaluate(() => window.scrollTo({ top: 300, behavior: 'instant' }));
  await page.waitForTimeout(200);
  await captureFrame();
  await captureFrame();

  // 채팅 페이지
  console.log('📹 채팅 페이지 프레임 캡처...');
  await page.goto(`${BASE_URL}/chat`, { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(500);
  await captureFrame();
  await captureFrame();

  // 타이핑 효과
  const textarea = page.locator('textarea').first();
  if (await textarea.isVisible()) {
    const message = '3박 4일 도쿄 여행';
    await textarea.focus();
    await captureFrame();

    for (let i = 0; i < message.length; i += 2) {
      await textarea.fill(message.substring(0, i + 2));
      await captureFrame();
    }
    await captureFrame();
  }

  // 도시 탐색
  console.log('📹 도시 탐색 프레임 캡처...');
  await page.goto(`${BASE_URL}/explore`, { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(500);
  await captureFrame();
  await captureFrame();
  await captureFrame();

  // 도쿄 상세
  console.log('📹 도쿄 상세 프레임 캡처...');
  await page.goto(`${BASE_URL}/explore/tokyo`, { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(500);
  await captureFrame();
  await captureFrame();
  await captureFrame();

  // 데모 결과
  console.log('📹 데모 결과 프레임 캡처...');
  await page.goto(`${BASE_URL}/demo/tokyo`, { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(1500);
  await captureFrame();
  await captureFrame();
  await captureFrame();
  await captureFrame();

  // 예산 페이지
  console.log('📹 예산 계산기 프레임 캡처...');
  await page.goto(`${BASE_URL}/budget`, { waitUntil: 'load', timeout: 15000 });
  await page.waitForTimeout(500);
  await captureFrame();
  await captureFrame();
  await captureFrame();

  await context.close();
  await browser.close();

  // GIF 생성
  console.log('\n📹 프레임을 GIF로 변환 중...');
  const frameFiles = readdirSync(framesDir)
    .filter(f => f.endsWith('.png'))
    .sort()
    .map(f => join(framesDir, f));

  console.log(`   총 ${frameFiles.length}개 프레임`);

  if (frameFiles.length > 0) {
    await framesToGif(frameFiles, join(screenshotsDir, 'demo.gif'), 200);
    console.log('   ✅ demo.gif 저장됨');
  }

  console.log('\n✨ GIF 생성 완료!');
}

main().catch(console.error);
