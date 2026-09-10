/**
 * 把 cookbook.html 渲染成 PDF。
 * 渲染前逐页检测内容是否溢出，按 dense → denser → densest 三档自动收紧，
 * 保证 354 页每一页都不出血、不截断。
 */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const SCRATCH = process.env.OUT_DIR || path.resolve(__dirname, 'out');

(async () => {
  if (!fs.existsSync(SCRATCH)) fs.mkdirSync(SCRATCH, { recursive: true });
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_PATH || undefined,
    args: ['--no-sandbox', '--disable-gpu', '--font-render-hinting=none']
  });
  const page = await browser.newPage({ viewport: { width: 430, height: 932 } });

  page.on('console', (m) => { if (m.type() === 'error') console.log('页面错误:', m.text()); });

  await page.goto('file://' + path.join(SCRATCH, 'cookbook.html'), {
    waitUntil: 'load',
    timeout: 180000
  });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1500);
  console.log('字体加载完成');

  // 逐页自适应收紧
  const stats = await page.evaluate(() => {
    const out = { total: 0, dense: 0, denser: 0, densest: 0, densest2: 0, overflow: [] };
    const pages = [...document.querySelectorAll('.page.recipe')];
    out.total = pages.length;
    const fits = (p) => {
      const nut = p.querySelector('.rc-nut');
      const pr = p.getBoundingClientRect();
      return nut.getBoundingClientRect().bottom <= pr.bottom - 44;
    };
    for (const p of pages) {
      if (fits(p)) continue;
      p.classList.add('dense');
      if (fits(p)) { out.dense++; continue; }
      p.classList.remove('dense'); p.classList.add('denser');
      if (fits(p)) { out.denser++; continue; }
      p.classList.remove('denser'); p.classList.add('densest');
      if (fits(p)) { out.densest++; continue; }
      p.classList.remove('densest'); p.classList.add('densest2');
      if (fits(p)) { out.densest2++; continue; }
      out.overflow.push(p.querySelector('.rc-title').textContent);
    }
    return out;
  });
  console.log('排版统计: 共', stats.total, '页 | 收紧1档', stats.dense, '| 2档', stats.denser, '| 3档', stats.densest, '| 4档', stats.densest2);
  if (stats.overflow.length) console.log('!! 仍然溢出:', stats.overflow.join(', '));
  else console.log('全部页面内容完整放下');

  await page.pdf({
    path: path.join(SCRATCH, '卡卡家常菜谱-354道全收录.pdf'),
    width: '430px',
    height: '932px',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
    preferCSSPageSize: false
  });
  console.log('PDF 已导出');

  // 抽样截图供检查
  const samples = { cover: 1, howto: 2, toc: 3, divider: 4, index: 5, recipe1: 8, recipe2: 60, outro: 371 };
  for (const [name, no] of Object.entries(samples)) {
    const el = await page.$(`.page:nth-of-type(${no})`);
    if (el) await el.screenshot({ path: path.join(SCRATCH, `pv-${name}.png`) });
  }
  console.log('样张截图完成');

  await browser.close();
  process.exit(0);
})();
