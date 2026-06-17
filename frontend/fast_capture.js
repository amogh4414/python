const puppeteer = require('puppeteer');
const path = require('path');

async function capture() {
  const screenshotsDir = path.join(__dirname, '../docs/screenshots');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1080 });

  try {
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(screenshotsDir, 'portfolio_landing.png') });

    await page.goto('http://localhost:3000/company/spacex', { waitUntil: 'domcontentloaded' });
    await new Promise(r => setTimeout(r, 2000));
    await page.screenshot({ path: path.join(screenshotsDir, 'portfolio_report.png') });
    
    console.log('Portfolio assets saved.');
  } finally {
    await browser.close();
  }
}
capture();
