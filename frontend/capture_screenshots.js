const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function capture() {
  const screenshotsDir = path.join(__dirname, '../docs/screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  
  // Desktop Page
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1080 });

  const companies = ['spacex', 'openai', 'stripe'];

  try {
    console.log('Navigating to Landing Page...');
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await new Promise(resolve => setTimeout(resolve, 3000));
    await page.screenshot({ path: path.join(screenshotsDir, '1_landing_page.png'), fullPage: true });

    let i = 2;
    for (const c of companies) {
      console.log(`Navigating to ${c} Report Page...`);
      await page.goto(`http://localhost:3000/company/${c}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await new Promise(resolve => setTimeout(resolve, 3000));
      await page.screenshot({ path: path.join(screenshotsDir, `${i}_${c}_report.png`), fullPage: true });
      i++;
    }

    console.log('Navigating to Viva Page...');
    await page.goto('http://localhost:3000/viva', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await new Promise(resolve => setTimeout(resolve, 3000));
    await page.screenshot({ path: path.join(screenshotsDir, '5_viva_page.png'), fullPage: true });

    // Mobile View
    console.log('Navigating to Mobile View...');
    await page.setViewport({ width: 390, height: 844, isMobile: true });
    await page.goto('http://localhost:3000/company/spacex', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await new Promise(resolve => setTimeout(resolve, 3000));
    await page.screenshot({ path: path.join(screenshotsDir, '6_mobile_view.png'), fullPage: true });

  } catch (err) {
    console.error('Error capturing screenshots:', err);
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
}

capture();
